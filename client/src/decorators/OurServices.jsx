import "./styles/OurServices.css";
const OurServices = () => {
    const service = [
        {
          title: "Utility Payments",
          des: "Easily process and secure your transactions with our digital payment solutions. Whether you're receiving payments from customers or paying vendors, our platform ensures a smooth and hassle-free experience.",
          icons: "https://cdn-icons-png.flaticon.com/512/5449/5449048.png",
        },
        {
          title: "Payout Solutions",
          des: "Streamline vendor payouts with our user-friendly platform. Manage payments efficiently while keeping track of all transactions in one place.",
          icons: "https://cdn-icons-png.flaticon.com/512/2845/2845707.png",
        },
        {
          title: "Banking Solutions",
          des: "Take control of your banking needs with our integrated platform. Manage your accounts, track transactions, and simplify financial operations effortlessly.",
          icons: "https://cdn-icons-png.flaticon.com/512/395/395700.png",
        },
        {
          title: "Rental Agreements",
          des: "Create and manage rental agreements with ease. Our platform provides templates and customization options for landlords and tenants, ensuring clear terms and legal compliance.",
          icons: "https://cdn-icons-png.flaticon.com/512/11671/11671502.png",
        },
        {
          title: "Legal Documents",
          des: "Access a wide range of legal documents for your business needs. Our platform simplifies the process of drafting and managing contracts, agreements, and more.",
          icons: "https://cdn-icons-png.flaticon.com/512/10684/10684503.png ",
        },
      ];
      
  return (
    <section className="services">
      <h2 className="subTitle">Our Services</h2>
      <div className="ourServices">
        {service.map((ser, index) => (
          <div className="service" key={index}>
            <img src={ser.icons} alt={ser.title} />
            <h3>{ser.title}</h3>
            <p>{ser.des}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurServices;
