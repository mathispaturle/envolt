import Footer from '../../../components/landing/Footer';
import Header from '../../../components/landing/Header';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto py-16 px-4 prose dark:prose-invert my-16">
        <h1 className="font-semibold text-xl">Privacy Policy</h1>
        <p>Effective Date: June 26, 2025</p>

        <p className="pt-6">
          At Envolt, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your information when you use our services.
        </p>

        <h2 className="font-semibold pt-6">1. Information We Collect</h2>
        <ul>
          <li><strong>Usage Data:</strong> Page visits, interactions, and general usage patterns via Google Analytics.</li>
          <li><strong>Billing Information:</strong> Handled securely via Stripe, including payment method and billing address.</li>
          <li><strong>Authentication & Storage:</strong> Managed through Firebase (auth and Firestore).</li>
        </ul>

        <h2 className="font-semibold pt-6">2. How We Use Information</h2>
        <p className="pt-2">We use your information to:</p>
        <ul>
          <li>Provide and maintain the Envolt service.</li>
          <li>Analyze usage and improve the product experience.</li>
          <li>Communicate essential updates or support issues.</li>
          <li>Process payments and manage subscriptions.</li>
        </ul>

        <h2 className="font-semibold pt-6">3. Data Sharing</h2>
        <p className="pt-2">We never sell your data. We may share your information with third-party services we use to operate Envolt (e.g., Firebase, Stripe, Google Analytics).</p>

        <h2 className="font-semibold pt-6">4. Data Retention</h2>
        <p className="pt-2">We retain your data only as long as necessary to provide the service or comply with legal obligations.</p>

        <h2 className="font-semibold pt-6">5. Your Rights</h2>
        <p className="pt-2">You may request access, correction, or deletion of your data at any time by contacting us.</p>

        <h2 className="font-semibold pt-6">6. Changes</h2>
        <p className="pt-2">We may update this policy. We’ll notify you of material changes via email or on our site.</p>

        <h2 className="font-semibold pt-6">7. Contact</h2>
        <p className="pt-2">Questions? Email us at <a href="mailto:privacy@envolt.org">privacy@envolt.org</a>.</p>
      </main>
      <Footer />
    </>
  );
}
