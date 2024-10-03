import { useDocumentTitle } from "../helper/Hooks";
import "./styles/Privacy.css";

const PrivacyPolicy = () => {
  useDocumentTitle("Privacy Policy || Chagans Technologies ltd");
  return (
    <main className="privacyPolicy max-width">
      <h1>Privacy Policy</h1>
      <p>
        Welcome to Chagans Technology Pvt Ltd! We care about your privacy, and
        we want to explain how we handle your information.
      </p>

      <h2 className="subTitle">Information We Collect</h2>
      <p>
        We collect information to provide better services to you. This includes:
      </p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Your name, email, phone number,
          and other contact details.
        </li>
        <li>
          <strong>Financial Information:</strong> Details about your bank
          account, transactions, or payment history.
        </li>
        <li>
          <strong>Usage Information:</strong> How you use our services, such as
          pages visited and features used.
        </li>
      </ul>

      <h2 className="subTitle">Why We Collect This Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and improve our services.</li>
        <li>Process payments and transactions.</li>
        <li>Keep your account safe and secure.</li>
        <li>Send you updates about our services.</li>
      </ul>

      <h2 className="subTitle">How We Protect Your Information</h2>
      <p>
        We take your security seriously. We use encryption and other safeguards
        to keep your information safe. Only authorized personnel can access your
        information, and we ensure strict confidentiality.
      </p>

      <h2 className="subTitle">Who We Share Your Information With</h2>
      <p>
        We do not sell your information to anyone. However, we may share your
        data with:
      </p>
      <ul>
        <li>
          Trusted third-party service providers who help us operate our services
          (such as payment processors).
        </li>
        <li>Law enforcement, if required by law.</li>
      </ul>

      <h2 className="subTitle">Your Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access the information we hold about you.</li>
        <li>Ask us to update or correct your information.</li>
        <li>Request deletion of your information, if applicable.</li>
        <li>Request restriction of processing your information.</li>
      </ul>

      <h2 className="subTitle">Cookies</h2>
      <p>
        We use cookies to improve your experience on our website. Cookies help
        us remember your preferences and understand how you use our services.
      </p>

      <h2 className="subTitle">Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. If we make significant
        changes, we’ll let you know by posting a notice on our website.
      </p>

      <h2 className="subTitle">Contact Us</h2>
      <p>
        If you have any questions about this policy, please contact us at{" "}
        <a href="mailto:privacy@chagans.com">privacy@chagans.com</a>.
      </p>

      <p>
        <strong>Effective Date:</strong> October 1, 2024
      </p>
    </main>
  );
};

export default PrivacyPolicy;
