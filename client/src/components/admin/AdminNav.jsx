import PropTypes from "prop-types";
import "./styles/AdminNav.css";
import { IoMenu } from "react-icons/io5";

import { IoWalletSharp } from "react-icons/io5";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { useState } from "react";
import Popup from "./Popup";
import AddMoney from "./services/AddMoney";

const AdminNav = ({ companyName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isShow, setIsShow] = useState(false);
  return (
    <nav>
      <div className="max-width">
        <div className="logo">{companyName}</div>
        <div className={`menu ${showMenu ? "active" : ""}`}>
          <ul>
            <li onClick={() => setShowMenu(false)}>
              <button>
                <span className="icon">
                  <IoWalletSharp />
                </span>
                <span className="btnText">Check Balance</span>
              </button>
            </li>
            <li
              onClick={() => {
                setShowMenu(false);
                setIsShow(true);
              }}
            >
              <button>
                <span className="icon">
                  <RiMoneyRupeeCircleFill />
                </span>
                <span className="btnText">Add Money</span>
              </button>
            </li>
            <li onClick={() => setShowMenu(false)}>
              <button>
                <span className="icon">
                  <IoNotifications />
                </span>
                <span className="btnText">Updates</span>
              </button>
            </li>
            <li onClick={() => setShowMenu(false)}>
              <button>
                <span className="icon">
                  <IoMdHelpCircle />
                </span>
                <span className="btnText">Help</span>
              </button>
            </li>
          </ul>
        </div>
        <button className="menuIcon" onClick={() => setShowMenu((pre) => !pre)}>
          <IoMenu />
        </button>
        {isShow && <Popup cmp={<AddMoney />} func={() => setIsShow(false)} />}
      </div>
    </nav>
  );
};

export default AdminNav;

AdminNav.propTypes = {
  companyName: PropTypes.string.isRequired,
};
