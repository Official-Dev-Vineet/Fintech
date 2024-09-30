import { Outlet } from "react-router-dom";
import Navbar from "../decorators/Navbar";
import Footer from "../decorators/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
