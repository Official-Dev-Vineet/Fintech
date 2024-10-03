import "./styles/call.css";
import { FiPhoneCall } from "react-icons/fi";
const Call = () => {
  const vibrator = (e) => {
    e.preventDefault();
    navigator.vibrate(1001);
    window.location.href = "tel:01294020010";
  };
  return (
    <a
      href="#"
      target="_blank"
      onClick={vibrator}
      className="Call"
    >
      <FiPhoneCall />
    </a>
  );
};

export default Call;
