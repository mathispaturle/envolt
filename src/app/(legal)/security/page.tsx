import Footer from '../../../components/landing/Footer';
import Header from '../../../components/landing/Header';

export default function SecurityOverview() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto py-16 px-4 prose dark:prose-invert my-16">
        <h1 className="font-semibold text-xl">Security Overview</h1>
        <p className="pt-6">
          At Envolt, security is a core pillar of our platform. We take multiple technical and organizational measures to protect your data and secrets.
        </p>

        <h2 className="font-semibold pt-6">1. Data Encryption</h2>
        <ul>
          <li><strong>At Rest:</strong> All secrets and environment variables are encrypted using AES-GCM before storage.</li>
          <li><strong>In Transit:</strong> All communications are encrypted via HTTPS/TLS 1.2+.</li>
        </ul>

        <h2 className="font-semibold pt-6">2. Authentication</h2>
        <p className="pt-2">
          Envolt uses Firebase Authentication to ensure secure, token-based user access. We never store plain-text passwords.
        </p>

        <h2 className="font-semibold pt-6">3. Access Control</h2>
        <p className="pt-2">
          Secrets are only accessible to authorized users within a vault. Each vault is isolated by user permission and ID.
        </p>

        <h2 className="font-semibold pt-6">4. Third-Party Security</h2>
        <ul>
          <li><strong>Google Cloud / Firebase:</strong> SOC 2, ISO/IEC 27001 certified infrastructure.</li>
          <li><strong>Stripe:</strong> PCI-DSS Level 1 compliant for secure payment processing.</li>
        </ul>

        <h2 className="font-semibold pt-6">5. Incident Response</h2>
        <p className="pt-2">
          We monitor platform activity and have procedures to respond to potential incidents, including notification, containment, and recovery.
        </p>

        <h2 className="font-semibold pt-6">6. Reporting Vulnerabilities</h2>
        <p className="pt-2">
          Found a bug or security issue? Please contact <a href="mailto:security@envolt.app">security@envolt.app</a>. We reward responsible disclosures.
        </p>
      </main>
      <Footer />
    </>
  );
}
