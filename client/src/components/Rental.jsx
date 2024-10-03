import { useState } from "react";
import "./styles/Rental.css";

const Rental = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(
    JSON.parse(localStorage?.getItem("rentalData")) || {}
  );
  const stepUpRental = () => {
    if (data.type) {
      setStep(3);
      localStorage.setItem("rentalData", JSON.stringify(data));
    } else {
      alert("Please select a type");
    }
  };
  return (
    <main className="rental">
      <div className="max-width">
        <h1 className="subTitle">Rent Agreement</h1>
        <div className="formWrapper">
          {step === 1 && (
            <div className="form">
              <p>
                Create and manage rental agreements with ease. Our platform
                provides templates and customization options for landlords and
                tenants, ensuring clear terms and legal compliance.
              </p>
              <button className="btn" onClick={() => setStep(2)}>
                Start
              </button>
            </div>
          )}
          {step === 2 && (
            <div className="form">
              <p>
                You are applying for a{" "}
                <strong className="themeText">Rent agreement</strong> as :
              </p>
              <div className="inputField">
                <input
                  type="button"
                  className={`input ${data.type === "landlord" && "active"}`}
                  value={"Landlord"}
                  onClick={() =>
                    setData((pre) => {
                      return {
                        ...pre,
                        type: "landlord",
                      };
                    })
                  }
                />
              </div>
              <div className="inputField">
                <input
                  type="button"
                  className={`input ${data.type === "tenant" && "active"}`}
                  value={"Tenant"}
                  onClick={() =>
                    setData((pre) => {
                      return {
                        ...pre,
                        type: "tenant",
                      };
                    })
                  }
                />
              </div>
              <div className="btnGroup">
                <button
                  className="btn"
                  onClick={() => setStep((pre) => pre - 1)}
                >
                  Previous
                </button>
                <button className="btn" onClick={stepUpRental}>
                  Next
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="form">
              <p>Select the state in which you want to apply for :</p>
              <div className="inputField">
                <input
                  type="button"
                  className={`input ${data.state === "haryana" && "active"}`}
                  value={"Haryana (Stamp Paper - 101)"}
                  onClick={() => {
                    return setData((pre) => {
                      return {
                        ...pre,
                        state: "haryana",
                      };
                    });
                  }}
                />
              </div>
              <div className="inputField">
                <input
                  type="button"
                  className="input"
                  value={"Other"}
                  onClick={() => {
                    alert(
                      "Sorry, Currently we are not provide our service in other state"
                    );
                  }}
                />
              </div>
              <div className="btnGroup">
                <button
                  className="btn"
                  onClick={() => setStep((pre) => pre - 1)}
                >
                  Previous
                </button>
                <button className="btn" onClick={stepUpRental}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Rental;
