import { useDocumentTitle } from "../helper/Hooks";
import "./styles/Privacy.css";

const TermsAndConditions = () => {
  useDocumentTitle("Terms and Conditions || Chagans Technologies ltd");
  return (
    <main className="privacyPolicy max-width">
      <h1>Terms and Conditions</h1>
      <p>
        Welcome to Chagans Technology Pvt Ltd. By accessing or using our fintech
        services, you agree to be bound by the following terms and conditions.
      </p>

      <h2 className="subTitle">1. Acceptance of Terms</h2>
      <p>
        By accessing our website or using our services, you agree to these Terms
        and Conditions, as well as any other guidelines, policies, or rules that
        may be posted in the future. If you do not agree to these terms, please
        discontinue use of our services.
      </p>

      <h2 className="subTitle">2. Eligibility</h2>
      <p>
        You must be at least 18 years of age to use our services. By agreeing to
        these terms, you confirm that you are at least 18 years old.
      </p>

      <h2 className="subTitle">3. User Accounts</h2>
      <p>
        To access certain features of our services, you may be required to
        create an account. You are responsible for maintaining the
        confidentiality of your account details and are fully responsible for
        all activities that occur under your account.
      </p>

      <h2 className="subTitle">4. Use of Our Services</h2>
      <p>
        Our services are intended solely for personal and lawful purposes. You
        agree not to use our services for any illegal activities, including but
        not limited to fraud, money laundering, or unauthorized access to data.
      </p>

      <h2 className="subTitle">5. Fees and Payments</h2>
      <p>
        Chagans Technology Pvt Ltd may charge fees for certain services. You are
        responsible for all applicable fees and charges, including taxes.
        Failure to pay these fees may result in suspension or termination of
        your account.
      </p>

      <h2 className="subTitle">6. Intellectual Property</h2>
      <p>
        All content, trademarks, and data on this website, including but not
        limited to software, text, graphics, logos, and icons, are the property
        of Chagans Technology Pvt Ltd or its licensors. You may not reproduce,
        modify, or distribute any content without our written consent.
      </p>

      <h2 className="subTitle">7. Privacy</h2>
      <p>
        Your privacy is important to us. Please review our Privacy Policy to
        understand how we collect, use, and protect your personal information.
      </p>

      <h2 className="subTitle">8. Limitation of Liability</h2>
      <p>
        Chagans Technology Pvt Ltd is not liable for any damages that result
        from the use of, or inability to use, our services. We do not guarantee
        the accuracy or reliability of any information provided through our
        services.
      </p>

      <h2 className="subTitle">9. Indemnification</h2>
      <p>
        You agree to indemnify and hold Chagans Technology Pvt Ltd harmless from
        any claims, damages, or expenses arising out of your use of our services
        or violation of these terms.
      </p>

      <h2 className="subTitle">10. Termination</h2>
      <p>
        We reserve the right to suspend or terminate your access to our services
        at any time, without notice, if we believe you are in violation of these
        terms or engaged in illegal activities.
      </p>

      <h2 className="subTitle">11. Governing Law</h2>
      <p>
        These Terms and Conditions are governed by and construed in accordance
        with the laws of India, and you agree to submit to the jurisdiction of
        the courts of Faridabad (Haryana), India.
      </p>

      <h2 className="subTitle">12. Changes to the Terms</h2>
      <p>
        Chagans Technology Pvt Ltd reserves the right to update or modify these
        Terms and Conditions at any time. Any changes will be effective upon
        posting the updated terms on our website. Continued use of our services
        following any changes constitutes your acceptance of the revised terms.
      </p>

      <h2 className="subTitle">13. Contact Us</h2>
      <p>
        If you have any questions about these Terms and Conditions, please
        contact us at:
        <br />
        Email: <a href="mailto:info@chagans.com">info@chagans.com</a>
        <br />
        Phone: <a href="tel:+919910505196">Message Us</a>
      </p>
    </main>
  );
};

export default TermsAndConditions;
