import { Secret } from '../types/types';

export function downloadEnvFile(secrets: Secret[]) {
  const content = secrets
    .filter((secret) => secret.key && secret.value)
    .map((secret) => `${secret.key}=${secret.value}`)
    .join('\n');

  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const now = new Date();
  const timestamp = now
    .toISOString()
    .slice(0, 16)
    .replace('T', '-')
    .replace(':', '-'); // e.g. "2025-06-29-13-40"

  const a = document.createElement('a');
  a.href = url;
  a.download = `${timestamp}.env`; // 👈 this gives "2025-06-29-13-40.env"
  a.style.display = 'none';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
