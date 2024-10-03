import "./styles/Need.css";
import { FaWhatsapp } from "react-icons/fa";
const Need = () => {
  const msg = `https://api.whatsapp.com/send?phone=+919910505196&text=Hi, I am interested in your business`;
  const vibrator = (e) => {
    e.preventDefault();
    navigator.vibrate(1001);
    window.location.href = msg;
  };
  return (
    <a href="#" target="_blank" className="Need" onClick={vibrator}>
      <FaWhatsapp />
      Need Help ?
    </a>
  );
};

export default Need;
