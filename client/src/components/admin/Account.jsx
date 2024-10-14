import { useEffect, useState } from "react";
import { getCookie } from "./commonFunc";

const Account = () => {
  const [admin, setAdmin] = useState({});
  const token = getCookie("token");
  useEffect(() => {
    if (token) {
      setAdmin(token);
    }
  }, []);
  return <section className="account">
    
  </section>;
};

export default Account;
