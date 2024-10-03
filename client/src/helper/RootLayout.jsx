import { Outlet } from "react-router-dom";
import Navbar from "../decorators/Navbar";
import Footer from "../decorators/Footer";
import Need from "../utils/Need";
import GetACall from "../decorators/GetACall";
import Call from "../utils/Call";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <GetACall />
      <Footer />
      <Need />
      <Call />
    </>
  );
};

export default RootLayout;
