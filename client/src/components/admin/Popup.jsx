import PropTypes from "prop-types";
import { IoMdCloseCircle } from "react-icons/io";
import "./styles/Popup.css";
import { useRef } from "react";
const Popup = ({ cmp, func }) => {
  const area = useRef(null);
  const closeHandler = (e) => {
    if (!area.current.contains(e.target)) {
      func();
    }
  };
  return (
    <div className="popup" onClick={closeHandler}>
      <button onClick={func} className="closeBtn">
        <IoMdCloseCircle />
      </button>
      <div className="full" ref={area}>
        {cmp}
      </div>
    </div>
  );
};

export default Popup;
Popup.propTypes = {
  cmp: PropTypes.elementType.isRequired,
  func: PropTypes.func.isRequired,
};
