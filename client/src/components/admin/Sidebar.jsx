import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdAccountCircle, MdDashboard } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { deleteCookie, getCookie } from "./commonFunc";
import "./styles/Sidebar.css";
import Popup from "./Popup";
import UpdateProfilePic from "./services/UpdateProfilePic";

const Sidebar = () => {
  const token = getCookie("token");
  const [isOpen, setIsOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [userProfilePic, setUserProfilePic] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProfilePic();
  }, []);

  useEffect(() => {
    fetchProfilePic();
  }, [update]);

  const logoutHandler = () => {
    const isLogout = confirm("Are you sure you want to logout?");
    if (isLogout) {
      deleteCookie("token");
      navigate("/login");
    }
  };

  const fetchProfilePic = async () => {
    const url = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${url}/user/profilePic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    result?.success && setUserProfilePic(result.profilePic);
  };

  return (
    <aside className={isOpen ? "adminSidebar active" : "adminSidebar"}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <span className="icon">{isOpen ? "Close" : "Open"} Menu</span>
      </button>
      <div className="imageContainer" onClick={() => setUpdate(!update)}>
        <img
          src={
            import.meta.env.VITE_SERVER_URL + "/userProfile/" + userProfilePic
          }
          alt="user"
        />
      </div>
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

      <div className="logout">
        <button onClick={() => navigate("/")}>
          <span className="icon">
            <FaHome />
          </span>{" "}
          Back to Home
        </button>

        <button onClick={logoutHandler}>
          <span className="icon">
            <RiLogoutCircleRFill />
          </span>{" "}
          Logout
        </button>
      </div>
      {update && (
        <Popup cmp={<UpdateProfilePic func={() => setUpdate(false)} />} func={() => setUpdate(false)} />
      )}
    </aside>
  );
};

export default Sidebar;
