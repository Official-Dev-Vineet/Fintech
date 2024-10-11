import "./styles/Mobile.css";
const Fastag = () => {
  // const [data, setData] = useState({});
  const FastTagProvider = [
    "AU NETC",
    "Airtel Payment Bank",
    "Axis Bank",
    "Bajaj Pay",
    "Bandhan Bank",
    "Bank Of Maharashtra",
    "Bank OF Baroda",
    "CUB",
    "Canara Bank",
    "Equitas",
    "FASTag",
    "Federal Bank",
    "Hdfc Bank",
    "ICICI",
    "IDBI",
    "IDFC FIRST",
    "IHMCL NHAI",
    "IOB",
    "Indian Bank",
    "Induslnd Bank",
    "J&K Bank",
    "KVB",
    "Karnataka Bank",
    "Kotak",
    "LivQuik (QuickWallet)",
    "PNB",
    "Paul Merchants",
    "Paytm",
    "RBL",
    "SBI",
    "Saraswat Bank",
    "South Indian Bank",
    "Test Finance",
    "Transaction Analysts",
    "Transcorp",
    "UCO",
    "Union Bank Of India",
    "Yes Bank",
  ];
  return (
    <div className="serviceBox">
      <h2 className="title">FASTag</h2>
      <form>
        <div className="inputField">
          <label htmlFor="provider">Provider</label>
          <select name="provider" id="provider">
            <option value="" disabled selected>
              Select Provider
            </option>
            {FastTagProvider.map((provider) => (
              <option key={provider} value={provider}>
                {provider} FASTag
              </option>
            ))}
          </select>
        </div>

        <div className="inputField">
          <label htmlFor="mobile">Mobile No</label>
          <input
            type="text"
            placeholder="Enter Mobile No"
            id="mobile"
            autoComplete="on"
            required
          />
        </div>

        <div className="inputField">
          <label htmlFor="vehicleRegNo">Vehicle Registration Number</label>
          <input
            type="text"
            placeholder="Enter Amount"
            id="vehicleRegNo"
            autoComplete="on"
            required
          />
        </div>
        <button>Recharge</button>
      </form>
    </div>
  );
};

export default Fastag;
