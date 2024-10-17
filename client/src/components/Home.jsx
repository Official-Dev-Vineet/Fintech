import OurMission from "../decorators/OurMission";
import OurPartners from "../decorators/OurPartners";
import OurServices from "../decorators/OurServices";
import Slider from "../decorators/Slider";
import { useDocumentTitle } from "../helper/Hooks";

const Home = () => {
  useDocumentTitle("Home || Chagans Business Center");
  const sliderItems = [
    {
      image:
        "https://assets-news.housing.com/news/wp-content/uploads/2021/09/17191257/Rent-agreement-in-Ghaziabad-FB-1200x700-compressed.jpg",
      title: "Rental Agreement",
      description: "Rental Agreement Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Get Started",
    },

    {
      image: "https://www.westernadvocate.com.au/images/transform/v1/crop/frm/JbL8dJ5dh2XzNFST9PPkaJ/d3839ef1-40a6-4db3-8574-389a112b85be.jpg/r0_0_4896_3220_w1200_h678_fmax.jpg",
      title: "LOAN REPAYMENT",
      description: "loan Repayment made easy – anywhere",
      path: "/about-us",
      pathname: "Know more",
    },
    {
      image: "https://static.toiimg.com/photo/81124381.cms",
      title: "FASTAG",
      description: "fASTTAG Services made ride easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",
    },
    {
      image: "https://i.ytimg.com/vi/QWGOInveJ28/maxresdefault.jpg",
      title: "INSURANCE",
      description: "iNSURANCE Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",
    },

    {
      image: "http://b2c.cscbls.com/images/slider/ss.png",
      title: "MICRO ATMs",
      description: "Banking Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",
    },

    {
      image:
        "https://www.sonvarsa.com/galleryimg/9477357cash1-management-software-in-ahmedabad.png",
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
        "https://cdn.pixabay.com/photo/2021/03/19/13/15/bill-6107551_640.png",
      title: "Pay Bills",
      description: "Pay Bills Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Pay Now",
    },
    {
      image: "https://eyeoftheflyer.com/wp-content/uploads/2020/11/Marriott-Bonvoy-Brilliant-Amex-Promotion.jpg",
      title: "CREDIT CARD BILL PAYMENT",
      description: "Card Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "Know more",

    },
    {
      image:
        "https://globalfintechseries.com/wp-content/uploads/Google-Pay-India-signs-MoU-with-NPCI-International-for-Global-Expansion-of-UPI.webp",
      title: "Aadhaar Banking (AEPS)",
      description: "Banking Services made easy – anytime, anywhere",
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
