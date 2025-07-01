import Footer from '../../../components/landing/Footer';
import Header from '../../../components/landing/Header';

// src/app/terms-of-service/page.tsx
export default function TermsOfService() {
  return (
    <>
    <Header />
    <main className="max-w-3xl mx-auto py-16 px-4 prose dark:prose-invert my-16">
      <h1 className='font-semibold text-xl'>Terms of Service</h1>
      <p className="pt-">Effective Date: June 26, 2025</p>

      <p className="pt-6">
        Welcome to Envolt. By accessing or using our website and services
        (“Services”), you agree to be bound by these Terms of Service (“Terms”).
        If you do not agree to these Terms, do not use our Services.
      </p>

      <h2 className="font-semibold  pt-6">1. Overview</h2>
      <p className="pt-2">
        Envolt (“we,” “our,” or “us”) provides tools for developers to securely
        store and share environment variables and secrets. These Services are
        intended for professional and business use.
      </p>

      <h2 className="font-semibold  pt-6">2. Eligibility</h2>
      <p className="pt-2">
        You must be at least 18 years old and legally capable of entering into
        contracts to use the Services.
      </p>

      <h2 className="font-semibold  pt-6">3. User Accounts</h2>
      <p className="pt-2">
        You are responsible for maintaining the confidentiality of your login
        credentials and are fully responsible for all activities that occur
        under your account.
      </p>

      <h2 className="font-semibold  pt-6">4. Acceptable Use</h2>
      <p className="pt-2">You agree not to use the Services to:</p>
      <ul>
        <li>Break any applicable laws or regulations.</li>
        <li>Store or transmit unlawful or harmful content.</li>
        <li>Reverse engineer or attempt to gain unauthorized access to our systems.</li>
      </ul>

      <h2 className="font-semibold  pt-6">5. Data and Security</h2>
      <p className="pt-2">
        We take data security seriously. However, no system is completely secure,
        and you use the Services at your own risk. You are responsible for the
        integrity and legality of the data you upload.
      </p>

      <h2 className="font-semibold  pt-6">6. Subscriptions and Billing</h2>
      <p className="pt-2">
        If you purchase a subscription, fees will be billed in advance and are
        non-refundable except as required by law. You may cancel your
        subscription at any time, but your access will continue until the end
        of the billing cycle.
      </p>

      <h2 className="font-semibold  pt-6">7. Termination</h2>
      <p className="pt-2">
        We reserve the right to suspend or terminate your access to the Services
        at our discretion, with or without notice, including for violations of
        these Terms.
      </p>

      <h2 className="font-semibold  pt-6">8. Intellectual Property</h2>
      <p className="pt-2">
        Envolt and its content are protected by intellectual property laws. You
        may not copy, modify, or distribute our materials without our permission.
      </p>

      <h2 className="font-semibold  pt-6">9. Disclaimers</h2>
      <p className="pt-2">
        The Services are provided “as is” and “as available.” We disclaim all
        warranties, express or implied, including merchantability, fitness for a
        particular purpose, and non-infringement.
      </p>

      <h2 className="font-semibold  pt-6">10. Limitation of Liability</h2>
      <p className="pt-2">
        To the maximum extent permitted by law, Envolt shall not be liable for
        any indirect, incidental, special, or consequential damages arising out
        of or in connection with your use of the Services.
      </p>

      <h2 className="font-semibold  pt-6">11. Modifications</h2>
      <p className="pt-2">
        We may update these Terms from time to time. If we do, we'll post the
        updated version on our site and update the “Effective Date” above. Your
        continued use of the Services means you accept the updated Terms.
      </p>

      <h2 className="font-semibold  pt-6">12. Governing Law</h2>
      <p className="pt-2">
        These Terms shall be governed by and construed in accordance with the
        laws of Spain. Any disputes shall be resolved in the courts of
        Barcelona, Spain.
      </p>

      <h2 className="font-semibold  pt-6">13. Contact</h2>
      <p className="pt-2">
        If you have any questions about these Terms, contact us at{" "}
          <a href="mailto:legal@envolt.org">legal@envolt.org</a>.
      </p>
    </main>
    <Footer />
    </>

  );
}
