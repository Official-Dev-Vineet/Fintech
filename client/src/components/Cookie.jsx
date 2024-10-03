import { useDocumentTitle } from "../helper/Hooks";
import "./styles/Privacy.css"
const CookiePolicy = () => {
  useDocumentTitle("Cookie Policy || Chagans Technologies ltd");
  return (
    <main className="privacyPolicy max-width">
      <h1>Cookie Policy</h1>
      <p>
        At Chagans Technology Pvt Ltd, we use cookies to improve your experience
        on our website and services. This Cookie Policy explains what cookies
        are, how we use them, and how you can manage your cookie preferences.
      </p>

      <h2 className="subTitle">1. What are Cookies?</h2>
      <p>
        Cookies are small text files that are placed on your device (computer,
        tablet, or mobile) when you visit a website. Cookies help websites
        function more efficiently and provide reporting information to website
        owners.
      </p>

      <h2 className="subTitle">2. Types of Cookies We Use</h2>
      <p>We use the following types of cookies on our website:</p>
      <ul>
        <li>
          <strong>Essential Cookies:</strong> These cookies are necessary for
          the proper functioning of our website. Without these cookies, some
          parts of the website may not work properly.
        </li>
        <li>
          <strong>Performance and Analytics Cookies:</strong> These cookies
          collect information about how you use our website, such as which pages
          are visited most often, and help us improve the performance of our
          services.
        </li>
        <li>
          <strong>Functionality Cookies:</strong> These cookies remember your
          preferences and choices, improving your experience on our website
          (e.g., language settings, login details).
        </li>
        <li>
          <strong>Advertising and Targeting Cookies:</strong> These cookies are
          used to deliver advertisements that are relevant to you and your
          interests, both on our website and on third-party platforms.
        </li>
      </ul>

      <h2 className="subTitle">3. How We Use Cookies</h2>
      <p>We use cookies to:</p>
      <ul>
        <li>Remember your preferences and settings.</li>
        <li>Improve the functionality and performance of our website.</li>
        <li>Analyze how our website is used to improve your experience.</li>
        <li>
          Deliver personalized advertisements based on your browsing behavior.
        </li>
      </ul>

      <h2 className="subTitle">4. Third-Party Cookies</h2>
      <p>
        We may allow third-party service providers, such as analytics and
        advertising partners, to place cookies on your device to help us analyze
        website traffic, provide personalized advertisements, or measure the
        effectiveness of our marketing campaigns. These third-party cookies are
        governed by the respective third party&apos;s privacy policy.
      </p>

      <h2 className="subTitle">5. Managing Your Cookie Preferences</h2>
      <p>
        You can manage or disable cookies through your browser settings.
        However, please note that disabling certain cookies may affect the
        functionality of our website, and some services may not be available.
      </p>
      <p>
        To learn more about how to control cookies, visit your browser&apos;s
        help documentation or use the links below for popular browsers:
      </p>
      <ul>
        <li>
          <a
            href="https://support.google.com/chrome/answer/95647?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Chrome
          </a>
        </li>
        <li>
          <a
            href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mozilla Firefox
          </a>
        </li>
        <li>
          <a
            href="https://support.apple.com/kb/PH21411?locale=en_US"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Safari
          </a>
        </li>
        <li>
          <a
            href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
            target="_blank"
            rel="noopener noreferrer"
          >
            Microsoft Edge
          </a>
        </li>
      </ul>

      <h2 className="subTitle">6. Changes to Our Cookie Policy</h2>
      <p>
        We may update this Cookie Policy from time to time. Any changes will be
        posted on this page with an updated revision date. Continued use of our
        website after the changes indicates your acceptance of the updated
        policy.
      </p>

      <h2 className="subTitle">7. Contact Us</h2>
      <p>
        If you have any questions or concerns about our use of cookies, please
        contact us at:
        <br />
        Email: support@chagans.com
        <br />
        Phone: +91-XXXX-XXXXXX
      </p>
    </main>
  );
};

export default CookiePolicy;
