import { useDocumentTitle } from "../helper/Hooks";
import "./styles/Privacy.css";

const RefundPolicy = () => {
  useDocumentTitle("Refund Policy || Chagans Technologies ltd");
  return (
    <main className="privacyPolicy max-width">
      <h1>Refund Policy</h1>
      <p>
        At Chagans Technology Pvt Ltd, we are committed to providing
        high-quality fintech services and ensuring customer satisfaction. If for
        any reason you are not satisfied with our services, please review our
        refund policy below.
      </p>

      <h2 className="subTitle">1. Eligibility for Refunds</h2>
      <p>Refunds are available under the following conditions:</p>
      <ul>
        <li>
          The service provided was not as described or failed to meet the
          agreed-upon quality.
        </li>
        <li>
          You have requested a refund within the specified refund period, which
          is <strong>[Number of Days]</strong> days from the purchase date.
        </li>
        <li>
          Refunds will not be issued for services that have already been fully
          utilized or where significant progress has been made based on the
          service provided.
        </li>
      </ul>

      <h2 className="subTitle">2. Non-Refundable Services</h2>
      <p>
        Certain services provided by Chagans Technology Pvt Ltd are
        non-refundable, including but not limited to:
      </p>
      <ul>
        <li>
          Custom financial consulting services once delivered or initiated.
        </li>
        <li>
          Subscription-based services after the start of the billing cycle.
        </li>
        <li>
          Any third-party services or products purchased through our platform.
        </li>
      </ul>

      <h2 className="subTitle">3. Process for Requesting a Refund</h2>
      <p>To request a refund, please follow these steps:</p>
      <ol>
        <li>
          Contact our support team at <strong>support@chagans.com</strong>{" "}
          within the refund period, providing your order number, the reason for
          the refund, and any other relevant details.
        </li>
        <li>
          Our team will review your request and determine eligibility based on
          our refund criteria.
        </li>
        <li>
          If your refund is approved, it will be processed within{" "}
          <strong>[Number of Days]</strong> business days.
        </li>
      </ol>

      <h2 className="subTitle">4. Method of Refund</h2>
      <p>
        Refunds will be processed using the same payment method you used to
        purchase the service. Depending on your payment method, it may take
        additional time for the refund to be credited to your account.
      </p>

      <h2 className="subTitle">5. Changes to Refund Policy</h2>
      <p>
        We reserve the right to modify or update this refund policy at any time.
        Any changes to this policy will be effective upon posting on our
        website. Continued use of our services after any changes indicates your
        acceptance of the updated policy.
      </p>

      <h2 className="subTitle">6. Contact Us</h2>
      <p>
        If you have any questions about our refund policy or need further
        assistance, please contact us:
        <br />
        Email:{" "}
        <a href="mailto:info@chagans.com" target="_blank">
          info@chagans.com
        </a>
        <br />
        Phone: <a href="tel:+91 9910505196">+91 9910505196</a>
      </p>
    </main>
  );
};

export default RefundPolicy;
