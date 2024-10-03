import "./styles/GetACall.css";

const GetACall = () => {
  return (
    <section className="getACall">
      <div className="getACall_wrapper">
        <h1>Request a call back</h1>
        <p>Get a quick call back to help us serve you better.</p>
        <div className="inputField">
          <input type="text" placeholder="Enter your email or phone" />
          <button>Submit</button>
        </div>
      </div>
    </section>
  );
};

export default GetACall;
