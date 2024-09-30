import { Outlet } from "react-router-dom";
import Navbar from "../decorators/Navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
