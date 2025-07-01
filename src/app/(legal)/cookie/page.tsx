import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';

export default function CookiePolicy() {
  return (
    <>
      <Header />
      <main className="max-w-3xl mx-auto py-16 px-4 prose dark:prose-invert my-16">
        <h1 className="font-semibold text-xl">Cookie Policy</h1>
        <p>Effective Date: June 26, 2025</p>

        <p className="pt-6">
          Envolt uses cookies to enhance your experience and analyze usage of our platform.
        </p>

        <h2 className="font-semibold pt-6">1. What Are Cookies?</h2>
        <p className="pt-2">Cookies are small text files stored on your device that help us recognize repeat visitors and gather analytics.</p>

        <h2 className="font-semibold pt-6">2. How We Use Cookies</h2>
        <ul>
          <li><strong>Analytics:</strong> Google Analytics helps us understand user behavior and improve performance.</li>
          <li><strong>Authentication:</strong> Firebase uses cookies to manage login sessions.</li>
          <li><strong>Payments:</strong> Stripe uses cookies to handle secure payment processes and prevent fraud.</li>
        </ul>

        <h2 className="font-semibold pt-6">3. Managing Cookies</h2>
        <p className="pt-2">
          You can manage or disable cookies in your browser settings. Note that some features may not function properly if cookies are disabled.
        </p>

        <h2 className="font-semibold pt-6">4. Contact</h2>
        <p className="pt-2">Questions? Email us at <a href="mailto:privacy@envolt.app">privacy@envolt.app</a>.</p>
      </main>
      <Footer />
    </>
  );
}
