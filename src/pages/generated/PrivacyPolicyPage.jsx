import { usePageRuntime } from '../pageRuntime.js';
import LegalPageLayout from '../../components/LegalPageLayout.jsx';

export default function PrivacyPolicyPage() {
  const rootRef = usePageRuntime('privacy');

  return (
    <div ref={rootRef}>
      <LegalPageLayout
        category="Privacy"
        title="Privacy Policy"
        updated="22 October 2026"
      >
        <p className="lead">
          This Privacy Policy explains how Dot To Design collects, uses and protects personal
          information when you visit our website, contact us or work with us. We keep this page
          in plain language and update it whenever our practices change.
        </p>

        <h2 className="t-h3">1. Who we are</h2>
        <p>
          Dot To Design is a design studio based in Dubai, United Arab Emirates. For the purposes
          of applicable data protection laws, Dot To Design acts as the controller of the personal
          information described in this policy.
        </p>
        <p>
          Questions about this policy or your personal information can be sent to{" "}
          <a href="mailto:dottodesign.d2d@gmail.com">dottodesign.d2d@gmail.com</a>.
        </p>

        <h2 className="t-h3">2. Information we collect</h2>
        <p>We collect information in three main ways:</p>
        <ul>
          <li>
            <strong>Information you provide.</strong> When you use our contact form, email us or
            engage us for a project, we may receive your name, email address, company or brand
            name, project details, preferred engagement type and any other information you choose
            to share.
          </li>
          <li>
            <strong>Information collected automatically.</strong> When you visit the website, our
            hosting provider may process technical information such as your IP address, browser
            type, device type, referring page, pages viewed and timestamps. This information is
            used to operate, secure and improve the website.
          </li>
          <li>
            <strong>Information from cookies and similar technologies.</strong> We use a small
            amount of browser storage to remember your theme preference and session state. See our{" "}
            <a href="/cookie-policy">Cookie Policy</a> for details.
          </li>
        </ul>
        <p>
          Please do not send us sensitive personal information, confidential business records or
          third-party personal data unless we have agreed on how it should be handled.
        </p>

        <h2 className="t-h3">3. How we use your information</h2>
        <p>We use personal information to:</p>
        <ul>
          <li>Respond to enquiries, briefs and requests for a proposal.</li>
          <li>Deliver, manage and improve our design, branding and digital services.</li>
          <li>Communicate about projects, invoices, schedules and support requests.</li>
          <li>Operate, maintain and secure the website.</li>
          <li>Understand how the website is used so we can improve its content and performance.</li>
          <li>Comply with legal, accounting and regulatory obligations.</li>
          <li>Send relevant updates where you have asked to receive them.</li>
        </ul>

        <h2 className="t-h3">4. Lawful bases</h2>
        <p>
          Where data protection laws such as the UAE Personal Data Protection Law or the GDPR
          apply, we rely on one or more of the following lawful bases:
        </p>
        <ul>
          <li>
            <strong>Contract.</strong> Processing needed to respond to your request or deliver
            services you have asked for.
          </li>
          <li>
            <strong>Legitimate interests.</strong> Running and securing our business and website,
            provided your rights are not overridden.
          </li>
          <li>
            <strong>Consent.</strong> Where you have explicitly agreed, for example to receive
            marketing communications. You can withdraw consent at any time.
          </li>
          <li>
            <strong>Legal obligation.</strong> Processing needed to meet tax, accounting or other
            regulatory requirements.
          </li>
        </ul>

        <h2 className="t-h3">5. Sharing your information</h2>
        <p>
          We do not sell personal information. We share it only where necessary, with:
        </p>
        <ul>
          <li>
            <strong>Service providers.</strong> Trusted suppliers that help us run the website and
            our business, such as hosting, email delivery, cloud storage and analytics providers.
            Our form submissions are delivered through Resend, and the website is hosted by Vercel.
          </li>
          <li>
            <strong>Professional advisers.</strong> Accountants, lawyers and insurers where needed
            to operate the business.
          </li>
          <li>
            <strong>Authorities.</strong> Where required by law, a court order or a lawful request
            from a public authority.
          </li>
          <li>
            <strong>Business transfers.</strong> If the studio is reorganised, merged or sold,
            information may be transferred as part of that transaction, subject to appropriate
            safeguards.
          </li>
        </ul>
        <p>
          Service providers are expected to process personal information only on our instructions
          and to apply appropriate security measures.
        </p>

        <h2 className="t-h3">6. International transfers</h2>
        <p>
          Some of our service providers may process information outside the UAE. Where this
          happens, we take reasonable steps to ensure that appropriate safeguards are in place and
          that information receives a comparable level of protection.
        </p>

        <h2 className="t-h3">7. How long we keep information</h2>
        <p>
          We keep personal information only for as long as necessary for the purpose it was
          collected, including to meet legal, accounting and reporting requirements. Enquiry and
          project records are typically retained for the duration of our relationship and for a
          reasonable period afterwards. Browser storage is kept until you clear it or, for session
          storage, until you close the browser tab.
        </p>

        <h2 className="t-h3">8. Security</h2>
        <p>
          We use reasonable technical and organisational measures to protect personal information
          against unauthorised access, loss, misuse or alteration. No method of transmission or
          storage is completely secure, so we cannot guarantee absolute security. If you believe
          your information has been compromised, please contact us promptly.
        </p>

        <h2 className="t-h3">9. Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct, delete or
          restrict the processing of your personal information, to object to certain processing,
          to withdraw consent, or to receive a portable copy of the information you provided. To
          exercise a right, email us at{" "}
          <a href="mailto:dottodesign.d2d@gmail.com">dottodesign.d2d@gmail.com</a>. We may need to verify
          your identity before acting on a request. You may also have the right to complain to
          your local data protection authority.
        </p>

        <h2 className="t-h3">10. Marketing communications</h2>
        <p>
          If you opt in to marketing updates, you can unsubscribe at any time using the link in
          the email or by contacting us. We do not share your contact details with third parties
          for their own marketing.
        </p>

        <h2 className="t-h3">11. Children</h2>
        <p>
          Our website and services are intended for businesses and professional audiences. We do
          not knowingly collect personal information from children under 16. If you believe a
          child has provided us with personal information, please contact us and we will delete it.
        </p>

        <h2 className="t-h3">12. Third-party links</h2>
        <p>
          The website may link to third-party sites, such as Instagram or client websites. We are
          not responsible for the privacy practices of those sites, and we encourage you to review
          their policies before sharing information with them.
        </p>

        <h2 className="t-h3">13. Changes to this policy</h2>
        <p>
          We may update this Privacy Policy from time to time to reflect changes in our practices,
          technology or legal requirements. The updated version will be published on this page with
          a revised date.
        </p>

        <h2 className="t-h3">14. Contact us</h2>
        <p>
          For any question, request or concern about this policy or your personal information,
          contact:
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
