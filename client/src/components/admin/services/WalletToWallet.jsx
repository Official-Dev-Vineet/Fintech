import "./styles/WalletToWallet.css";

const WalletToWallet = () => {
  return (
    <div className="walletToWallet">
      <h2>Wallet To Wallet</h2>
      <p>Transfer money from one wallet to another.</p>
      <form>
        <div className="inputField">
          <label htmlFor="accountNo"> Account No. </label>
          <input
            type="text"
            placeholder="Enter Account No."
            id="accountNo"
            required
          />
        </div>
        <div className="inputField">
          <label htmlFor="amount">Amount</label>
          <input type="text" placeholder="Enter Amount" id="amount" required />
        </div>
        <p className="input">
          <label htmlFor="remarks">
            Remarks
            <input type="text" placeholder="Remarks (optional)" id="remarks" />
          </label>
        </p>
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
};

export default WalletToWallet;
