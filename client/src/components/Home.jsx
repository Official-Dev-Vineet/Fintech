import OurMission from "../decorators/OurMission";
import OurPartners from "../decorators/OurPartners";
import OurServices from "../decorators/OurServices";
import Slider from "../decorators/Slider";

const Home = () => {
  const sliderItems = [
    {
      image:
        "https://blog.m2pfintech.com/wp-content/uploads/2022/07/Creative-AePS-Blog-03.jpg",
      title: "Aadhaar Banking (AEPS)",
      description: "Banking Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",
    },
    {
      image:
        "https://img.freepik.com/free-photo/person-paying-with-its-credit-card_23-2149167302.jpg?t=st=1727684432~exp=1727688032~hmac=ecfc4f7d2d49a55458a0ff727642ac444a06fd82762ffab92905203086116945&w=1060",
      title: "MICRO ATMs",
      description: "Banking Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",
    },
    {
      image:
        "https://img.freepik.com/free-photo/financial-income-economic-diagram-money-concept_53876-121065.jpg?t=st=1727684385~exp=1727687985~hmac=66d0fc031a69deb2804d2bd235ea23132ee7ded5863b9e89742a6c75526e6f71&w=1060",
      title: "Cash Management Services (CMS)",
      description: "Cash Management Services made simple and easy",
      path: "/about-us",
      pathname: "Know more",
    },
    {
      image: "https://www.skewinfotech.com/images/recharge-software.png",
      title: "Mobile / DTH Recharge",
      description: "Recharges made simple and easy",
      path: "/about-us",
      pathname: "Recharge Now",
    },
    {
      image:
        "https://assets-news.housing.com/news/wp-content/uploads/2021/09/17191257/Rent-agreement-in-Ghaziabad-FB-1200x700-compressed.jpg",
      title: "Rental Agreement",
      description: "Rental Agreement Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Get Started",
    },
    {
      image:
        "https://blogassets.airtel.in/wp-content/uploads/2022/01/What-are-the-types-of-Utility-Bill.jpg",
      title: "Pay Bills",
      description: "Pay Bills Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Pay Now",
    },
    {
      image:
        "https://www.canarahsbclife.com/content/dam/choice/blog-inner/images/what-is-the-importance-of-insurance.jpg",
      title: "Insurance",
      description: "Insurance Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",
    },
  ];
  return (
    <main className="max-width">
      <Slider sliderItems={sliderItems} time={3000} />
      <OurMission />
      <OurServices />
      <OurPartners />
    </main>
  );
};

export default Home;
