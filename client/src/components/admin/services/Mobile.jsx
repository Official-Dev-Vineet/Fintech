import { useState } from "react";
import "./styles/Mobile.css";
const Mobile = () => {
  const [data, setData] = useState({});
  const [rechargeType, setRechargeType] = useState("prepaid");
  return (
    <div className="serviceBox">
      <h2 className="title">Mobile Recharge</h2>
      <div className="btnGroup">
        <button
          className={rechargeType === "prepaid" ? "active" : ""}
          onClick={() => setRechargeType("prepaid")}
        >
          Prepaid
        </button>
        <button
          className={rechargeType === "postpaid" ? "active" : ""}
          onClick={() => setRechargeType("postpaid")}
        >
          Postpaid
        </button>
      </div>
      {rechargeType === "prepaid" ? (
        <form name="mobileRecharge" autoComplete="on">
          <div className="inputField">
            <label htmlFor="mobile">Mobile No</label>
            <input
              type="text"
              placeholder="Enter Mobile No"
              id="mobile"
              autoComplete="on"
              required
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
            />
          </div>

          <div className="inputField">
            <label htmlFor="operator">Operator</label>
            <select
              id="operator"
              onChange={(e) => setData({ ...data, operator: e.target.value })}
            >
              <option value="" disabled selected>
                Select
              </option>
              <option value="Airtel">Airtel</option>
              <option value="VI">VI </option>
              <option value="Jio">Jio</option>
              <option value="BSNL">BSNL</option>
            </select>
          </div>

          <div className="inputField">
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              placeholder="Enter Recharge Amount"
              id="amount"
              required
              onChange={(e) => {
                setData({ ...data, amount: e.target.value });
              }}
            />
          </div>
          <button type="submit">Recharge Now</button>
        </form>
      ) : (
        <>
          <form name="mobileRecharge" autoComplete="on">
            <div className="inputField">
              <label htmlFor="mobile">Mobile No</label>
              <input
                type="text"
                placeholder="Enter Mobile No"
                id="mobile"
                autoComplete="on"
                required
                onChange={(e) => setData({ ...data, mobile: e.target.value })}
              />
            </div>

            <div className="inputField">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                placeholder="Enter Bill Amount"
                id="amount"
                required
                onChange={(e) => {
                  setData({ ...data, amount: e.target.value });
                }}
              />
            </div>
            <div className="inputField">
              <label htmlFor="operator">Operator</label>
              <select
                id="operator"
                required
                onChange={(e) => {
                  setData({ ...data, operator: e.target.value });
                }}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="Airtel">Airtel</option>
                <option value="VI">VI </option>
                <option value="Jio">Jio</option>
                <option value="BSNL">BSNL</option>
              </select>
            </div>
            <button type="submit">Recharge Now</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Mobile;
