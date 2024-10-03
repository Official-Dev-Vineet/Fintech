import "./styles/OurPartners.css";
const OurPartners = () => {
  const partners = [
    "https://static.vecteezy.com/system/resources/previews/020/975/663/non_2x/sbi-logo-sbi-icon-transparent-free-png.png",
    "https://logowik.com/content/uploads/images/idfc-first-bank8846.jpg",
    "https://seekvectorlogo.com/wp-content/uploads/2022/03/rbl-bank-ltd-vector-logo-2022.png",
    "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-logo.png",
    "https://download.logo.wine/logo/Axis_Bank/Axis_Bank-Logo.wine.png",
    "https://images.indianexpress.com/2020/10/equitas-small-finance-bank-1200.jpeg?w=389",
  ];

  return (
    <div className="ourPartner max-width">
      <h2 className="subTitle">Our Partners</h2>
      <p>
        We have been working with some of the best financial institutions in the
        country. We are proud to have been a part of them. We have helped them
        grow their businesses.
      </p>

      <div className="partners">
        <div className="partners_track">
          {partners.map((partner, index) => {
            return (
              <div key={index} className="partner-img">
                <img src={partner} alt="partner" />
              </div>
            );
          })}
          {partners.map((partner, index) => {
            return (
              <div key={index} className="partner-img">
                <img src={partner} alt="partner" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OurPartners;
