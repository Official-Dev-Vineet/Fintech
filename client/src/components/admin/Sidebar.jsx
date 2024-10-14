import { Link, useNavigate } from "react-router-dom";
import "./styles/Sidebar.css";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { deleteCookie, getCookie } from "./commonFunc";
import { useEffect } from "react";

const Sidebar = () => {
  const token = getCookie("token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/admin-login");
    }
  }, []);
  const logoutHandler = () => {
    const isLogout = confirm("Are you sure you want to logout?");
    if (isLogout) {
      deleteCookie("token");
      navigate("/admin-login");
    }
  };
  return (
    <aside>
      <ul>
        <li>
          <Link to="/admin/dashboard">
            {" "}
            <span className="icon">
              <MdDashboard />
            </span>{" "}
            <div className="text">Dashboard</div>
          </Link>
        </li>
        <li>
          <Link to="/admin/transactions">
            <span className="icon">
              <FaMoneyBillTransfer />
            </span>
            <span className="text">Transactions Report</span>
          </Link>
        </li>
        <li>
          <Link to="/admin/myAccount">
            <span className="icon">
              <MdAccountCircle />
            </span>
            <span className="text">MyAccount</span>
          </Link>
        </li>
      </ul>

      <button className="logout" onClick={logoutHandler}>
        <span className="icon">
          <RiLogoutCircleRFill />
        </span>{" "}
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
