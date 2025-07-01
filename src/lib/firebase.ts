// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  Timestamp,
  deleteDoc,
  getDoc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FullVaultData, Secret, Vault } from '@/types/types';

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth(app);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// --- Encryption helpers ---
async function getKey(): Promise<CryptoKey> {
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode('super-secret-password'),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('envolt-app-salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encrypt(text: string): Promise<string> {
  const key = await getKey();
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    encoder.encode(text)
  );

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv, 0);
  combined.set(new Uint8Array(encrypted), iv.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decrypt(data: string): Promise<string> {
  const key = await getKey();
  const combined = Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  const iv = combined.slice(0, 12);
  const ciphertext = combined.slice(12);

  const decrypted = await window.crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  );

  return decoder.decode(decrypted);
}

// --- Vaults ---
export async function getUserVaults(teamId: string): Promise<Vault[]> {
  if (!teamId) throw new Error('getUserVaults: teamId is required');
  const vaultsCol = collection(db, 'vaults');
  const q = query(vaultsCol, where('teamId', '==', teamId));
  const snapshot = await getDocs(q);

  const vaults = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      const secretsCol = collection(db, 'vaults', doc.id, 'secrets');
      const secretsSnap = await getDocs(secretsCol);

      return {
        id: doc.id,
        ...(data as { name: string }),
        secretsCount: secretsSnap.size,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt || Date.now()),
        updatedAt:
          data.updatedAt instanceof Timestamp
            ? data.updatedAt.toDate()
            : new Date(data.updatedAt || Date.now()),
        isFavorite: data.isFavorite || false,
        ownerId: data.ownerId,
        members: data.members || [],
        teamId: data.teamId,
      };
    })
  );

  return vaults;
}

export async function createVault(teamId: string, name: string) {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const vaultsRef = collection(db, 'vaults');
  const docRef = await addDoc(vaultsRef, {
    name,
    teamId,
    ownerId: user.uid,
    members: [user.uid],
    createdAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    name,
    ownerId: user.uid,
    members: [user.uid],
    teamId,
  };
}

export async function getVaultSecrets(vaultId: string): Promise<Secret[]> {
  const secretsCol = collection(db, 'vaults', vaultId, 'secrets');
  const snapshot = await getDocs(secretsCol);

  const secrets: Secret[] = [];
  for (const doc of snapshot.docs) {
    const data = doc.data() as Secret;
    try {
      const decryptedValue = await decrypt(data.value);
      secrets.push({
        id: doc.id,
        key: data.key,
        value: decryptedValue,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy || '',
      });
    } catch (err) {
      console.error('Failed to decrypt secret', err);
    }
  }
  return secrets;
}

export async function getFullVaultData(
  vaultId: string
): Promise<FullVaultData | null> {
  const vaultRef = doc(db, 'vaults', vaultId);
  const vaultSnap = await getDoc(vaultRef);

  if (!vaultSnap.exists()) return null;
  const vaultData = vaultSnap.data();

  const secretsSnap = await getDocs(
    collection(db, 'vaults', vaultId, 'secrets')
  );
  const secrets: Secret[] = [];

  for (const doc of secretsSnap.docs) {
    const data = doc.data() as Secret;
    try {
      const decryptedValue = await decrypt(data.value);
      secrets.push({
        id: doc.id,
        key: data.key,
        value: decryptedValue,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy || '',
      });
    } catch (err) {
      console.error(`Failed to decrypt secret ${data.key}`, err);
    }
  }

  const viewsSnap = await getDocs(collection(db, 'vaults', vaultId, 'views'));
  const views = viewsSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return {
    vaultId,
    vaultData,
    secrets,
    views,
  };
}

export async function getVaultSecretsPublic(
  vaultId: string
): Promise<Secret[]> {
  const secretsCol = collection(db, 'vaults', vaultId, 'secrets');
  const snapshot = await getDocs(secretsCol);

  const secrets: Secret[] = [];

  for (const doc of snapshot.docs) {
    const data = doc.data() as Secret;
    try {
      const decryptedValue = await decrypt(data.value);
      secrets.push({
        id: doc.id,
        key: data.key,
        value: decryptedValue,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        createdBy: data.createdBy || '',
      });
    } catch (err) {
      console.error('Failed to decrypt secret (public)', err);
    }
  }

  return secrets;
}

export async function addSecret(vaultId: string, key: string, value: string) {
  const secretsRef = collection(db, 'vaults', vaultId, 'secrets');
  const encryptedValue = await encrypt(value);

  const docRef = await addDoc(secretsRef, {
    key,
    value: encryptedValue,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: auth.currentUser?.uid || '',
  });

  await updateDoc(doc(db, 'vaults', vaultId), {
    updatedAt: serverTimestamp(),
  });

  return { id: docRef.id, key, value };
}

export async function updateSecret(
  vaultId: string,
  secretId: string,
  updates: { key?: string; value?: string }
) {
  const secretRef = doc(db, 'vaults', vaultId, 'secrets', secretId);
  const vaultRef = doc(db, 'vaults', vaultId);

  const updateData: any = {
    updatedAt: serverTimestamp(),
  };

  if (updates.key !== undefined) updateData.key = updates.key;
  if (updates.value !== undefined)
    updateData.value = await encrypt(updates.value);

  await updateDoc(secretRef, updateData);
  await updateDoc(vaultRef, { updatedAt: serverTimestamp() });

  return { id: secretId, ...updates };
}

export async function deleteSecret(vaultId: string, secretId: string) {
  const secretRef = doc(db, 'vaults', vaultId, 'secrets', secretId);
  await deleteDoc(secretRef);
  await updateDoc(doc(db, 'vaults', vaultId), { updatedAt: serverTimestamp() });
}

// --- Auth ---
export function onAuthStateChangedListener(callback: (user: any) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function login(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  return signOut(auth);
}

export async function register(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// --- Teams ---
export async function updateTeam(
  teamId: string,
  updates: Partial<{ name: string; members: string[] }>
) {
  const teamRef = doc(db, 'teams', teamId);
  await updateDoc(teamRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteTeam(teamId: string) {
  const teamRef = doc(db, 'teams', teamId);
  await deleteDoc(teamRef);
}

export async function getUserTeams(): Promise<{ id: string; name: string }[]> {
  const user = auth.currentUser;
  if (!user) throw new Error('Not authenticated');

  const teamsRef = collection(db, 'teams');
  const teamSnaps = await getDocs(teamsRef);

  const userTeams: { id: string; name: string }[] = [];

  for (const teamDoc of teamSnaps.docs) {
    const memberDocRef = doc(db, 'teams', teamDoc.id, 'members', user.uid);
    const memberDocSnap = await getDoc(memberDocRef);

    if (memberDocSnap.exists()) {
      const data = teamDoc.data();
      userTeams.push({
        id: teamDoc.id,
        name: data.name,
      });
    }
  }

  return userTeams;
}

export async function addUserToTeam(
  teamId: string,
  userId: string,
  role: string = 'member'
) {
  const memberRef = doc(db, 'teams', teamId, 'members', userId);

  await setDoc(memberRef, {
    role,
    joinedAt: serverTimestamp(),
  });

  return true;
}