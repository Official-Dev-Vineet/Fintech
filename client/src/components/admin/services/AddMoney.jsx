import { useState } from "react";
import "./styles/AddMoney.css";

const AddMoney = () => {
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const addMoney = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear error message on each submit

    try {
      // Step 1: Generate payment token
      const tokenRes = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/payment/generateToken`,
        {
          method: "POST",
        }
      );
      const tokenResult = await tokenRes.json();
      // Step 2: Add money with token, amount, and remarks
      const addMoneyRes = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/payment/addMoney`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: tokenResult.data.data.token,
            amount: amount,
            remarks: remarks,
          }),
        }
      );

      const result = await addMoneyRes.json();

      // Step 3: Check response and redirect if successful
      if (result.result.code === "RP000") {
        const windowO = window.open(result.result.paymentLink, "_blank");
        if (windowO) {
            windowO.focus();
        }
      } else {
        throw new Error(result.result.message || "Failed to add money");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message || "Something went wrong.");
    }
  };

  return (
    <div className="addMoney">
      <h2>Add Money to your wallet</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={addMoney}>
        <div className="inputField">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            placeholder="Enter Amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="inputField">
          <label htmlFor="remarks">Remarks</label>
          <input
            type="text"
            placeholder="Remarks (optional)"
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
        <button type="submit">Add Money</button>
      </form>
    </div>
  );
};

export default AddMoney;
