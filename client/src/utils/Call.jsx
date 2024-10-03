import "./styles/call.css";
import { FiPhoneCall } from "react-icons/fi";
const Call = () => {
  const vibrator = () => {
    navigator.vibrate(1001);
  };
  return (
    <a
      href="tel:01294020010"
      target="_blank"
      onClick={vibrator}
      className="Call"
    >
      <FiPhoneCall />
    </a>
  );
};

export default Call;
