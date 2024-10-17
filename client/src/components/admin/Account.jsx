import { useEffect, useState } from "react";
import { getCookie } from "./commonFunc";
import Kyc from "./services/Kyc";

const Account = () => {
  const [admin, setAdmin] = useState({});
  const token = getCookie("token");
  const [isKycCompleted, setIsKycCompleted] = useState(false);
  useEffect(() => {
    if (token) {
      setAdmin(token);
    }
  }, []);
  return (
    <section className="account">
      <div className="accountWrapper">
        {isKycCompleted === false ? (
          <Kyc />
        ) : (
          <AccountDetails admin={admin} setIsKycCompleted={setIsKycCompleted} />
        )}
      </div>
    </section>
  );
};

export default Account;
