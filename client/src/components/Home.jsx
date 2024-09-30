import Slider from "../decorators/Slider";

const Home = () => {
  const sliderItems = [
    {
      image:
        "https://i.pinimg.com/564x/b2/53/b2/b253b29a74a71890dbfa514ea67923bc.jpg",
      title: "Aadhaar Banking (AEPS)",
      description: "Banking Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "about-us",
    },
    {
      image:
        "https://i.pinimg.com/originals/71/ef/47/71ef47140fab5931b5d767bb4c3f3406.gif",
      title: "MICRO ATMs",
      description: "Banking Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "about-us",
    },
    {
      image:
        "https://i.pinimg.com/originals/71/ef/47/71ef47140fab5931b5d767bb4c3f3406.gif",
      title: "Cash Management Services (CMS)",
      description: "Cash Management Services made simple and easy",
      path: "/about-us",
      pathname: "about-us",
    },
    {
      image:
        "https://i.pinimg.com/originals/71/ef/47/71ef47140fab5931b5d767bb4c3f3406.gif",
      title: "Mobile / DTH Recharge",
      description: "Recharges made simple and easy",
      path: "/about-us",
      pathname: "about-us",
    },
    {
      image:
        "https://i.pinimg.com/originals/71/ef/47/71ef47140fab5931b5d767bb4c3f3406.gif",
      title: "Rental Agreement",
      description: "Rental Agreement Services made easy – anytime, anywhere",
      path: "/about-us",
      pathname: "about-us",
    },
  ];
  return (
    <main>
      <Slider sliderItems={sliderItems} time={3000} />
    </main>
  );
};

export default Home;
