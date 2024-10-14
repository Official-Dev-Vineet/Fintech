import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../decorators/Navbar";
import Footer from "../decorators/Footer";
import Need from "../utils/Need";
import GetACall from "../decorators/GetACall";
import Call from "../utils/Call";
import { useEffect, useState } from "react";
import AdminNav from "../components/admin/AdminNav";
import Sidebar from "../components/admin/Sidebar";

const RootLayout = () => {
  const location = useLocation();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const path = location.pathname.split("/");
    if (path[path.length - 2] === "admin") {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  }, [location]);
  return (
    <>
      {isShow ? (
        <>
          <Navbar />
          <Outlet />
          <GetACall />
          <Footer />
          <Need />
          <Call />
        </>
      ) : (
        <div className="admin">
          <AdminNav companyName="Chagans Technologies Limited" />
          <div className="adminGridView">
            <Sidebar />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default RootLayout;
