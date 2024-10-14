import PropTypes from "prop-types";
import "./styles/AdminNav.css";
const AdminNav = ({ companyName }) => {
  return (
    <nav>
      <div className="logo">{companyName}</div>
      <ul>
        <li>
          <button>Check Balance</button>
        </li>
        <li>
          <button>Load Money</button>
        </li>
        <li>
          <button>Updates</button>
        </li>
        <li>
          <button>Help</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;

AdminNav.propTypes = {
  companyName: PropTypes.string.isRequired,
};
