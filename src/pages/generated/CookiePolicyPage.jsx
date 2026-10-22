import { usePageRuntime } from '../pageRuntime.js';
import LegalPageLayout from '../../components/LegalPageLayout.jsx';

export default function CookiePolicyPage() {
  const rootRef = usePageRuntime('cookies');

  return (
    <div ref={rootRef}>
      <LegalPageLayout
        category="Cookies"
        title="Cookie Policy"
        updated="22 October 2026"
      >
        <p className="lead">
          This Cookie Policy explains how Dot To Design uses cookies and similar technologies on
          our website, what they do and how you can control them. It should be read alongside our{" "}
          <a href="/privacy-policy">Privacy Policy</a>.
        </p>

        <h2 className="t-h3">1. What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help
          websites remember information between visits, such as your preferences or whether you
          have already seen an introduction screen. Similar technologies include local storage and
          session storage, which work in a comparable way.
        </p>

        <h2 className="t-h3">2. How we use cookies</h2>
        <p>
          We keep our use of cookies and browser storage deliberately limited. We use them to make
          the website work properly, to remember your display preferences and to avoid replaying
          the same page introduction on every visit.
        </p>

        <h2 className="t-h3">3. Categories we use</h2>
        <ul>
          <li>
            <strong>Strictly necessary.</strong> Storage required for the website to function
            securely and as expected. These cannot normally be switched off through our site.
          </li>
          <li>
            <strong>Preferences.</strong> Storage that remembers choices you make, such as whether
            you prefer the dark or light theme.
          </li>
          <li>
            <strong>Analytics and performance.</strong> We do not currently run advertising or
            third-party analytics tracking on this website. If this changes, we will update this
            policy and, where required, ask for your consent first.
          </li>
          <li>
            <strong>Marketing.</strong> We do not use cookies to build advertising profiles or to
            target you across other websites.
          </li>
        </ul>

        <h2 className="t-h3">4. Storage used by this website</h2>
        <p>
          The list below describes the browser storage we set directly. It does not include
          storage that may be set by third-party services you reach through links on our site.
        </p>
        <ul>
          <li>
            <strong>dtd-theme</strong> (local storage) — remembers whether you selected the dark
            or light theme. It remains on your device until you clear it or change your choice.
          </li>
          <li>
            <strong>dtd-visited</strong> (session storage) — remembers that the page introduction
            has already played during your current browsing session. It is cleared when you close
            the browser tab.
          </li>
        </ul>

        <h2 className="t-h3">5. Third-party services</h2>
        <p>
          Some parts of our website rely on third-party providers. These providers may process
          technical information such as your IP address or browser details when their services are
          used:
        </p>
        <ul>
          <li>
            <strong>Hosting.</strong> Our website is hosted by Vercel, which may keep standard
            server logs for security and reliability.
          </li>
          <li>
            <strong>Contact form delivery.</strong> Messages sent through our contact form are
            delivered using Resend.
          </li>
          <li>
            <strong>Social links.</strong> Links to Instagram or other external platforms are
            governed by those platforms&apos; own cookie and privacy policies once you leave our
            site.
          </li>
        </ul>

        <h2 className="t-h3">6. Managing cookies and storage</h2>
        <p>
          You can control or delete cookies and browser storage through your browser settings. Most
          browsers let you block cookies entirely, block third-party cookies, or clear stored data
          when you close the browser. The exact steps vary by browser, so check your browser&apos;s
          help pages.
        </p>
        <p>
          Blocking or clearing storage may affect your experience. For example, the site may not
          remember your theme preference or may replay the introduction on each visit. Strictly
          necessary storage may still be required for the site to operate.
        </p>

        <h2 className="t-h3">7. Do Not Track and Global Privacy Control</h2>
        <p>
          Some browsers send &ldquo;Do Not Track&rdquo; or Global Privacy Control signals. Because
          we do not currently run advertising or cross-site tracking, we do not treat these signals
          differently. If we introduce tracking in future, we will review how these signals are
          handled and update this policy.
        </p>

        <h2 className="t-h3">8. Changes to this policy</h2>
        <p>
          We may update this Cookie Policy when our website, providers or legal requirements
          change. The current version will always be available on this page with the date it was
          last updated.
        </p>

        <h2 className="t-h3">9. Contact us</h2>
        <p>
          If you have a question about this Cookie Policy or how we use cookies, contact:
        </p>
        <p>
          <strong>Dot To Design</strong>
          <br />
          Dubai, United Arab Emirates
          <br />
          Email: <a href="mailto:dottodesign.d2d@gmail.com">dottodesign.d2d@gmail.com</a>
        </p>
      </LegalPageLayout>
    </div>
  );
}
