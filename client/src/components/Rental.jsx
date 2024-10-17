import { useState, useLayoutEffect, useMemo } from "react";
import "./styles/Rental.css";
import LeaseAgreement from "../decorators/LeaseAgreement";

const Rental = () => {
  // Initialize state from localStorage if available
  const [step, setStep] = useState(1);
  const [isShowing, setIsShowing] = useState(false);
  const [phone, setPhone] = useState("");
  const [data, setData] = useState({
    landlords: [
      {
        category: "",
        title: "",
        name: "",
        fName: "",
        address: "",
        idType: "",
        idNumber: "",
      },
    ],
    tenants: [
      {
        category: "",
        title: "",
        name: "",
        fName: "",
        address: "",
        idType: "",
        idNumber: "",
      },
    ], // Initialize opponents
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [opponentIndex, setOpponentIndex] = useState(0);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const checkPhone = () => {
    if (phone.length === 10 && /^\d*$/.test(phone)) {
      setStep(6);
    } else {
      alert("Please enter a valid phone number");
    }
  };
  const handleInputChange2 = (index, field, value) => {
    const updatedOpponents = [...data.tenants];
    if (updatedOpponents[index]) {
      updatedOpponents[index][field] = value;
      setData((pre) => {
        return {
          ...pre,
          tenants: updatedOpponents,
        };
      });
    }
  };

  const handleRemoveTenant = (index) => {
    const updatedOpponents = data.tenants.filter((_, i) => i !== index);
    setData((pre) => {
      return {
        ...pre,
        tenants: updatedOpponents,
      };
    });
    setOpponentIndex((pre) => pre - 1);
  };

  const checkProperty = () => {
    if (data.propertyType && data.propertyName) {
      setStep(9);
    } else {
      alert("Please select property type");
    }
  };
  const handleAddLandlord = () => {
    setData((prev) => ({
      ...prev,
      landlords: [
        ...prev.landlords,
        {
          category: "",
          title: "",
          name: "",
          titleParent: "",
          fName: "",
          address: "",
          idType: "",
          idNumber: "",
        },
      ],
    }));
    setCurrentIndex((pre) => pre + 1);
  };

  const stepUpRental = () => {
    if (data.type) {
      setStep(3);
    } else {
      alert("Please select a type");
    }
  };

  const checkState = () => {
    if (data.state) {
      setStep(4);
    } else {
      alert("Please select a state");
    }
  };

  const stepUpDelivery = () => {
    if (data.delivery && data.stamp) {
      setStep(5);
    } else {
      alert("Please select a delivery type");
    }
  };

  const handleInputChange1 = (index, field, value) => {
    const updatedLandlords = [...data.landlords];
    updatedLandlords[index][field] = value;
    setData((pre) => {
      return {
        ...pre,
        landlords: updatedLandlords,
      };
    });
  };

  const handleAddTenant = () => {
    setData((prev) => ({
      ...prev,
      opponents: [
        ...prev.opponents,
        {
          category: "",
          title: "",
          name: "",
          fName: "",
          address: "",
          idType: "",
          idNumber: "",
        },
      ],
    }));
    setOpponentIndex((pre) => pre + 1);
  };

  const handleRemoveLandlord = (index) => {
    setData((prevData) => {
      const newLandlords = [...prevData.landlords];
      newLandlords.splice(index, 1); // Remove the landlord at the given index
      return { ...prevData, landlords: newLandlords }; // Return updated state
    });
    setCurrentIndex((pre) => pre - 1);
  };

  const collectPersonalDetails = () => {
    const landlord = data.landlords[currentIndex];
    // Check if landlord details are present
    if (
      landlord.address &&
      landlord.category &&
      landlord.idNumber &&
      landlord.name &&
      landlord.address
    ) {
      setStep(7);
      console.log(data);
    } else {
      alert("Please fill out landlord details");
    }
  };

  const collectTenantDetails = () => {
    const opponent = data.tenants[opponentIndex];

    // Check if opponent details are present
    if (
      opponent.address &&
      opponent.category &&
      opponent.idNumber &&
      opponent.name &&
      opponent.address
    ) {
      setStep(8);
    } else {
      alert("Please fill out your personal details");
    }
  };

  const validateProperty = () => {
    if (data.propertyPrice && data.propertyAddress && data.propertyName) {
      alert(
        "After you have completed the payment, you can edit the details or submit the form."
      );
      setStep(8);
      console.log(data);
    } else {
      alert("Please fill valid property details");
    }
  };
  const LeasePage = useMemo(() => {
    return (
      <div className={`preview ${isShowing ? "active" : ""}`}>
        <LeaseAgreement data={data} />
      </div>
    );
  }, [data, isShowing]);
  return (
    <main className="rental">
      <div className="max-width">
        <h1 className="subTitle">Rent Agreement</h1>
        <div className="rentalWrapper">
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
                  <strong className="themeText">Rent agreement</strong> as:
                </p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${data.type === "landlord" && "active"}`}
                    value="Landlord"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        type: "landlord",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className={`input ${data.type === "tenant" && "active"}`}
                    value="Tenant"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        type: "tenant",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className={`input ${data.type === "other" && "active"}`}
                    value="Other"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        type: "other",
                      }))
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(1)}>
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
                <p>Select the state in which you want to apply for:</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${data.state === "haryana" && "active"}`}
                    value="Haryana"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        state: "haryana",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className="input"
                    value="Other"
                    onClick={() =>
                      alert(
                        "Sorry, we currently do not provide services in other states"
                      )
                    }
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(2)}>
                    Previous
                  </button>
                  <button className="btn" onClick={checkState}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="form">
                <p>Select Type of Stamp :</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${data.stamp === "h10" && "active"}
                    `}
                    value="Stamp ( Rs. 10 )"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        stamp: "h10",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className={`input ${data.stamp === "h20" && "active"}`}
                    value="Stamp ( Rs. 20 )"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        stamp: "h20",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className={`input ${data.stamp === "h50" && "active"}`}
                    value="Stamp ( Rs. 50 )"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        stamp: "h50",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className={`input ${data.stamp === "h101" && "active"}`}
                    value="Stamp ( Rs. 101 )"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        stamp: "h101",
                      }))
                    }
                  />
                </div>
                {data.stamp && (
                  <>
                    <p>Select the preferred mode of delivery:</p>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.delivery === "softcopy" && "active"
                        }`}
                        value={
                          data.stamp === "10"
                            ? "Soft Copy (Rs. 150)"
                            : data.stamp === "h20"
                            ? "Soft Copy (Rs. 170)"
                            : data.stamp === "h50"
                            ? "Soft Copy (Rs. 200)"
                            : "Soft Copy (Rs. 250)"
                        }
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            delivery: "softcopy",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.delivery === "pickup" && "active"
                        }`}
                        value={
                          data.stamp === "h10"
                            ? "Pickup From Counter (Rs. 150)"
                            : data.stamp === "h20"
                            ? "Pickup From Counter (Rs. 170)"
                            : data.stamp === "h50"
                            ? "Pickup From Counter (Rs. 200)"
                            : "Pickup From Counter (Rs. 250)"
                        }
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            delivery: "pickup",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.delivery === "homedelivery" && "active"
                        }`}
                        value={
                          data.stamp === "h10"
                            ? "Home Delivery (Rs. 150 + Delivery Charge)"
                            : data.stamp === "h20"
                            ? "Home Delivery (Rs. 170 + Delivery Charge)"
                            : data.stamp === "h50"
                            ? "Home Delivery (Rs. 200 + Delivery Charge)"
                            : "Home Delivery (Rs. 250 + Delivery Charge)"
                        }
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            delivery: "homedelivery",
                          }))
                        }
                      />
                    </div>
                  </>
                )}
                {data.delivery === "homedelivery" && (
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <label htmlFor="deliveryCharge">
                      Enter Delivery Address
                    </label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Delivery Address"
                      id="deliveryCharge"
                      autoComplete="on"
                      required
                      value={data.deliveryAddress}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          deliveryAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(3)}>
                    Previous
                  </button>
                  <button className="btn" onClick={stepUpDelivery}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 5 && (
              <div className="form">
                <p>Enter Phone Number to continue.</p>
                <div className="inputField">
                  <input
                    type="text"
                    className="input"
                    placeholder="Enter Phone Number"
                    value={phone}
                    maxLength={10}
                    pattern="[0-9]{10}"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(4)}>
                    Previous
                  </button>
                  <button className="btn" onClick={checkPhone}>
                    Next
                  </button>
                </div>
              </div>
            )}
            {step === 6 && (
              <div className="form">
                <p>Enter Landlord&apos;s Details</p>
                {data.landlords.map((landlord, index) => (
                  <div key={index}>
                    <div className="inputField">
                      <label htmlFor={`category-${index}`}>
                        {" "}
                        Choose Category:{" "}
                      </label>
                      <select
                        id={`category-${index}`}
                        value={landlord?.category}
                        onChange={(e) =>
                          handleInputChange1(index, "category", e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                        <option value="firm">Firm</option>
                        <option value="government">Government</option>
                        <option value="localAuthority">Local Authority</option>
                        <option value="artificialJuridicalPerson">
                          Artificial Juridical Person
                        </option>
                        <option value="associationOfPerson">
                          Association Of Person
                        </option>
                        <option value="bodyOfIndividual">
                          Body Of Individual
                        </option>
                        <option value="hinduUndividedFamily">
                          Hindu Undivided Family
                        </option>
                        <option value="limitedLiabilityPartnership">
                          Limited Liability Partnership
                        </option>
                      </select>
                    </div>
                    {landlord.category !== "individual" &&
                      landlord.category !== "" && (
                        <>
                          <div className="inputField">
                            <label>Firm details:</label>
                            <div className="inputGroup">
                              <select
                                value={landlord?.firmTitle}
                                onChange={(e) =>
                                  handleInputChange1(
                                    index,
                                    "firmTitle",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled selected>
                                  Select
                                </option>
                                <option value="M/s">M/s.</option>
                              </select>
                              <input
                                type="text"
                                className="input"
                                placeholder="Enter details..."
                                value={landlord.firmName}
                                onChange={(e) =>
                                  handleInputChange1(
                                    index,
                                    "firmName",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="inputField">
                            <label htmlFor={`firmTitle-${index}`}>
                              {" "}
                              Through :{" "}
                            </label>
                            <select
                              id={`firmTitle-${index}`}
                              value={landlord?.firmOwnerTitle}
                              onChange={(e) =>
                                handleInputChange1(
                                  index,
                                  "firmOwnerTitle",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled selected>
                                Select
                              </option>
                              <option value="Authorized Signatory">
                                Authorized Signatory
                              </option>
                              <option value="Partner">Partner</option>
                              <option value="Director">Director</option>
                              <option value="Proprietor">Proprietor</option>
                              <option value="President">President</option>
                              <option value="Secretory">Secretory</option>
                            </select>
                          </div>
                        </>
                      )}
                    <div className="inputField">
                      <label htmlFor={`firmTitle-${index}`}> Title : </label>
                      <div className="inputGroup">
                        <select
                          value={landlord?.title}
                          onChange={(e) =>
                            handleInputChange1(index, "title", e.target.value)
                          }
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="Mr">Mr.</option>
                          <option value="Ms">Miss</option>
                          <option value="Mrs">Mrs.</option>
                        </select>
                        <input
                          type="text"
                          className="input"
                          placeholder="Enter Name..."
                          value={landlord.name}
                          onChange={(e) =>
                            handleInputChange1(index, "name", e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {landlord.title && landlord.name && (
                      <div className="inputField inputGroup">
                        <select
                          value={landlord.titleParent || ""}
                          onChange={(e) =>
                            handleInputChange1(
                              index,
                              "titleParent",
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled selected>
                            Select
                          </option>
                          {landlord.title === "Mr" && (
                            <>
                              {" "}
                              <option value="Son Of">Son Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}

                          {landlord.title === "Ms" && (
                            <>
                              {" "}
                              <option value="Daughter Of">Daughter Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}
                          {landlord.title === "Mrs" && (
                            <>
                              {" "}
                              <option value="Wife Of">Wife Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}
                        </select>
                        <input
                          type="text"
                          className="input"
                          placeholder="Enter Details"
                          value={landlord.fName}
                          onChange={(e) =>
                            handleInputChange1(index, "fName", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div className="inputField">
                      <label>
                        {landlord.category !== "individual"
                          ? "Firm"
                          : "Permanent"}{" "}
                        Address:
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={landlord.address}
                        onChange={(e) =>
                          handleInputChange1(index, "address", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label htmlFor="state">State</label>
                      <select
                        value={landlord.state || ""}
                        name="state"
                        id="state"
                        onChange={(e) =>
                          handleInputChange1(index, "state", e.target.value)
                        }
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                      </select>
                    </div>
                    <div className="inputField">
                      <label htmlFor="District">District</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="District..."
                        value={landlord.district}
                        onChange={(e) =>
                          handleInputChange1(index, "district", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label>Pincode:</label>
                      <input
                        type="text"
                        pattern="[0-9]{6}"
                        className="input"
                        value={landlord.pincode}
                        onChange={(e) =>
                          handleInputChange1(index, "pincode", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label>Contact Number:</label>
                      <input
                        type="tel"
                        className="input"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={landlord.contact}
                        onChange={(e) =>
                          handleInputChange1(index, "contact", e.target.value)
                        }
                      />
                    </div>

                    <div className="inputField">
                      <label>ID Type:</label>
                      <select
                        value={landlord.idType || ""}
                        className="input"
                        onChange={(e) =>
                          handleInputChange1(index, "idType", e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Select ID Type
                        </option>
                        <option value="aadhaar">Aadhaar</option>
                        <option value="passport">Passport</option>
                        <option value="voterID">Voter ID</option>
                        <option value="drivingLicense">Driving License</option>
                      </select>
                    </div>

                    {landlord.idType && (
                      <div className="inputField">
                        <label>
                          {landlord.idType === "aadhaar"
                            ? "Aadhaar Number"
                            : "ID Number"}
                          :
                        </label>
                        <input
                          type="text"
                          className="input"
                          maxLength={12}
                          value={landlord.idNumber}
                          onChange={(e) =>
                            handleInputChange1(
                              index,
                              "idNumber",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}
                    <button
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleRemoveLandlord(index)}
                      className="btn"
                    >
                      Remove Landlord
                    </button>
                  </div>
                ))}

                <div className="btnGroup">
                  <button
                    onClick={handleAddLandlord}
                    style={{ backgroundColor: "blue" }}
                    className="btn"
                  >
                    Add Another Landlord
                  </button>
                  <div className="btnGroup">
                    <button className="btn" onClick={() => setStep(5)}>
                      Previous
                    </button>
                    <button className="btn" onClick={collectPersonalDetails}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 7 && (
              <div className="form">
                <p>Enter Tenant&apos;s Details</p>
                {data.tenants.map((landlord, index) => (
                  <div key={index}>
                    <div className="inputField">
                      <label htmlFor={`category-${index}`}>
                        {" "}
                        Choose Category:{" "}
                      </label>
                      <select
                        id={`category-${index}`}
                        value={landlord?.category}
                        onChange={(e) =>
                          handleInputChange2(index, "category", e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Select
                        </option>
                        <option value="individual">Individual</option>
                        <option value="company">Company</option>
                        <option value="firm">Firm</option>
                        <option value="government">Government</option>
                        <option value="localAuthority">Local Authority</option>
                        <option value="artificialJuridicalPerson">
                          Artificial Juridical Person
                        </option>
                        <option value="associationOfPerson">
                          Association Of Person
                        </option>
                        <option value="bodyOfIndividual">
                          Body Of Individual
                        </option>
                        <option value="hinduUndividedFamily">
                          Hindu Undivided Family
                        </option>
                        <option value="limitedLiabilityPartnership">
                          Limited Liability Partnership
                        </option>
                      </select>
                    </div>
                    {landlord.category !== "individual" &&
                      landlord.category !== "" && (
                        <>
                          <div className="inputField inputGroup">
                            <select
                              value={landlord?.firmTitle}
                              onChange={(e) =>
                                handleInputChange2(
                                  index,
                                  "firmTitle",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled selected>
                                Select
                              </option>
                              <option value="M/s">M/s.</option>
                            </select>
                            <input
                              type="text"
                              className="input"
                              placeholder="Enter details..."
                              value={landlord.firmName}
                              onChange={(e) =>
                                handleInputChange2(
                                  index,
                                  "firmName",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="inputField">
                            <label htmlFor={`firmTitle-${index}`}>
                              {" "}
                              Title:{" "}
                            </label>
                            <select
                              id={`firmTitle-${index}`}
                              value={landlord?.firmOwnerTitle}
                              onChange={(e) =>
                                handleInputChange2(
                                  index,
                                  "firmOwnerTitle",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled selected>
                                Select
                              </option>
                              <option value="Authorized Signatory">
                                Authorized Signatory
                              </option>
                              <option value="Partner">Partner</option>
                              <option value="Director">Director</option>
                              <option value="Proprietor">Proprietor</option>
                              <option value="President">President</option>
                              <option value="Secretory">Secretory</option>
                            </select>
                          </div>
                        </>
                      )}
                    <div className="inputField inputGroup">
                      <select
                        value={landlord?.title}
                        onChange={(e) =>
                          handleInputChange2(index, "title", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="Mr">Mr.</option>
                        <option value="Ms">Miss</option>
                        <option value="Mrs">Mrs.</option>
                      </select>
                      <input
                        type="text"
                        className="input"
                        placeholder="Enter Name..."
                        value={landlord.name}
                        onChange={(e) =>
                          handleInputChange2(index, "name", e.target.value)
                        }
                      />
                    </div>

                    {landlord.title && landlord.name && (
                      <div className="inputField inputGroup">
                        <select
                          value={landlord.titleParent || ""}
                          onChange={(e) =>
                            handleInputChange2(
                              index,
                              "titleParent",
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled selected>
                            Select
                          </option>
                          {landlord.title === "Mr" && (
                            <>
                              {" "}
                              <option value="Son Of">Son Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}

                          {landlord.title === "Ms" && (
                            <>
                              {" "}
                              <option value="Daughter Of">Daughter Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}
                          {landlord.title === "Mrs" && (
                            <>
                              {" "}
                              <option value="Wife Of">Wife Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}
                        </select>
                        <input
                          type="text"
                          className="input"
                          placeholder="Enter Details"
                          value={landlord.fName}
                          onChange={(e) =>
                            handleInputChange2(index, "fName", e.target.value)
                          }
                        />
                      </div>
                    )}
                    <div className="inputField">
                      <label>
                        {landlord.category !== "individual"
                          ? "Firm"
                          : "Permanent"}{" "}
                        Address:
                      </label>
                      <input
                        type="text"
                        className="input"
                        value={landlord.address}
                        onChange={(e) =>
                          handleInputChange2(index, "address", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label htmlFor="state">State</label>
                      <select
                        value={landlord.state || ""}
                        name="state"
                        id="state"
                        onChange={(e) =>
                          handleInputChange2(index, "state", e.target.value)
                        }
                      >
                        <option value="">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">
                          Himachal Pradesh
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">
                          Andaman and Nicobar Islands
                        </option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">
                          Dadra and Nagar Haveli and Daman and Diu
                        </option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                      </select>
                    </div>
                    <div className="inputField">
                      <label htmlFor="District">District</label>
                      <input
                        type="text"
                        className="input"
                        placeholder="District..."
                        value={landlord.district}
                        onChange={(e) =>
                          handleInputChange2(index, "district", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label>Pincode:</label>
                      <input
                        type="text"
                        pattern="[0-9]{6}"
                        className="input"
                        value={landlord.pincode}
                        onChange={(e) =>
                          handleInputChange2(index, "pincode", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label>Contact Number:</label>
                      <input
                        type="tel"
                        maxLength={10}
                        pattern="[0-9]{10}"
                        className="input"
                        value={landlord.contact}
                        onChange={(e) =>
                          handleInputChange2(index, "contact", e.target.value)
                        }
                      />
                    </div>

                    <div className="inputField">
                      <label>ID Type:</label>
                      <select
                        value={landlord.idType || ""}
                        className="input"
                        onChange={(e) =>
                          handleInputChange2(index, "idType", e.target.value)
                        }
                      >
                        <option value="" disabled selected>
                          Select ID Type
                        </option>
                        <option value="aadhaar">Aadhaar</option>
                        <option value="passport">Passport</option>
                        <option value="voterID">Voter ID</option>
                        <option value="drivingLicense">Driving License</option>
                      </select>
                    </div>

                    {landlord.idType && (
                      <div className="inputField">
                        <label>
                          {landlord.idType === "aadhaar"
                            ? "Aadhaar Number"
                            : "ID Number"}
                          :
                        </label>
                        <input
                          type="text"
                          className="input"
                          maxLength={12}
                          value={landlord.idNumber}
                          onChange={(e) =>
                            handleInputChange2(
                              index,
                              "idNumber",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    )}
                    <button
                      style={{ backgroundColor: "red" }}
                      onClick={() => handleRemoveTenant(index)}
                      className="btn"
                    >
                      Remove Tenant
                    </button>
                  </div>
                ))}

                <div className="btnGroup">
                  <button
                    onClick={handleAddTenant}
                    style={{ backgroundColor: "blue" }}
                    className="btn"
                  >
                    Add Another Tenant
                  </button>
                  <div className="btnGroup">
                    <button className="btn" onClick={() => setStep(6)}>
                      Previous
                    </button>
                    <button className="btn" onClick={collectTenantDetails}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 8 && (
              <>
                <p>Type Of Property:</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.propertyType === "residential" ? "active" : ""
                    }`}
                    value="Residential"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        propertyType: "residential",
                      }))
                    }
                  />
                  <input
                    type="button"
                    className={`input ${
                      data.propertyType === "commercial" ? "active" : ""
                    }`}
                    value="Commercial"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        propertyType: "commercial",
                      }))
                    }
                  />
                </div>
                {data.propertyType === "residential" && (
                  <>
                    <p>Property Name:</p>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "house" ? "active" : ""
                        }`}
                        value="House"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "house",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "apartment" ? "active" : ""
                        }`}
                        value="Apartment"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "apartment",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "flat" ? "active" : ""
                        }`}
                        value="Flat"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "flat",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "room" ? "active" : ""
                        }`}
                        value="Room"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "room",
                          }))
                        }
                      />
                    </div>
                  </>
                )}
                {data.propertyType === "commercial" && (
                  <>
                    <p>Property Name:</p>
                    <div className="inputField">
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "shop" ? "active" : ""
                        }`}
                        value="Shop"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "shop",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "office" ? "active" : ""
                        }`}
                        value="Office"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "office",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "vacantPlot" ? "active" : ""
                        }`}
                        value="Vacant Plot"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "vacantPlot",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "shed" ? "active" : ""
                        }`}
                        value="Shed"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "shed",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "agricultureLand"
                            ? "active"
                            : ""
                        }`}
                        value="Agriculture Land"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "agricultureLand",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "warehouse" ? "active" : ""
                        }`}
                        value="Warehouse"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "warehouse",
                          }))
                        }
                      />
                      <input
                        type="button"
                        className={`input ${
                          data.propertyName === "factory" ? "active" : ""
                        }`}
                        value="Factory"
                        onClick={() =>
                          setData((pre) => ({
                            ...pre,
                            propertyName: "factory",
                          }))
                        }
                      />
                    </div>
                  </>
                )}
                {data.propertyType === "commercial" &&
                  data.propertyName !== "factory" && (
                    <div className="inputField">
                      <label> Area Of Propertry (in sq.ft.):</label>
                      <input
                        className="input"
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            shopArea: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                {data.propertyName === "flat" && (
                  <>
                    <div className="inputField">
                      <label>Flat Type:</label>
                      <select
                        value={data.flatType}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            flatType: e.target.value,
                          }))
                        }
                      >
                        <option value="" selected disabled>
                          select
                        </option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                        <option value="4BHK">4BHK</option>
                        <option value="5BHK">5BHK</option>
                      </select>
                    </div>
                    <div className="inputField">
                      <label htmlFor="floorNmb"> Floor No:</label>
                      <select
                        id="floorNmb"
                        value={data.floorNo}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            floorNo: e.target.value,
                          }))
                        }
                      >
                        <option value="" selected disabled>
                          select
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13">13</option>
                        <option value="14">14</option>
                      </select>
                    </div>
                    <div
                      className="inputField"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <label>Other Rights:</label>
                      <label htmlFor="parking">
                        {" "}
                        Parking:{" "}
                        <input
                          type="checkbox"
                          id="parking"
                          onChange={(e) =>
                            setData((pre) => ({
                              ...pre,
                              parking: e.target.checked,
                            }))
                          }
                        />
                      </label>
                      <label htmlFor="terrace">
                        {" "}
                        Terrace:{" "}
                        <input
                          type="checkbox"
                          id="terrace"
                          onChange={(e) =>
                            setData((pre) => ({
                              ...pre,
                              parking: e.target.checked,
                            }))
                          }
                        />
                      </label>
                    </div>
                  </>
                )}
                {data.propertyName === "house" && (
                  <div className="inputField">
                    <label>Area Of House (in sq.yrd. ):</label>
                    <input
                      className="input"
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          houseArea: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                {data.propertyName === "apartment" && (
                  <div className="inputField">
                    <label>Area Of Apartment (in sq.ft. ):</label>
                    <input
                      className="input"
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          houseArea: e.target.value,
                        }))
                      }
                    />
                  </div>
                )}
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(7)}>
                    Previous
                  </button>
                  <button className="btn" onClick={checkProperty}>
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 9 && (
              <div className="form">
                <p>Fill the details of Property:</p>
                <div className="inputField">
                  <label>Rental Property Address:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.propertyAddress || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        propertyAddress: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label htmlFor="state">State</label>
                  <select
                    value={data.propertyState || ""}
                    name="state"
                    id="state"
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        propertyState: e.target.value,
                      }))
                    }
                  >
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                    <option value="Ladakh">Ladakh</option>
                    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  </select>
                </div>
                <div className="inputField">
                  <label>District:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.propertyDisctrict || ""}
                    onChange={(e) =>
                      setData((pre) => {
                        return {
                          ...pre,
                          propertyDisctrict: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Pincode:</label>
                  <input
                    type="text"
                    pattern="[0-9]{6}"
                    className="input"
                    value={data.propertyPincode || ""}
                    onChange={(e) =>
                      setData((pre) => {
                        return {
                          ...pre,
                          propertyPincode: e.target.value,
                        };
                      })
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Property Rent:</label>
                  <input
                    type="text"
                    className="input"
                    value={data.propertyPrice || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        propertyPrice: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="inputField">
                  <label>Security Amount (If applicable):</label>
                  <input
                    type="text"
                    className="input"
                    value={data.securityPrice || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        securityPrice: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>
                    Electricity Bill :{" "}
                    <label htmlFor="eUnit">
                      <span>in Unit</span>
                      <input
                        type="radio"
                        name="ebill"
                        checked={data.eUnit || false}
                        id="eUnit"
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            eUnit: e.target.checked,
                            eSociety: false,
                            eFix: false,
                          }))
                        }
                      />
                    </label>{" "}
                    <label htmlFor="fixedUnit">
                      <span>Fixed Rate (Rs)</span>
                      <input
                        type="radio"
                        checked={data.eFix || false}
                        name="ebill"
                        id="fixedUnit"
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            eFix: e.target.checked,
                            eSociety: false,
                            eUnit: false,
                          }))
                        }
                      />
                    </label>{" "}
                    <label htmlFor="society">
                      <span> Direct To Concern Authority </span>
                      <input
                        type="radio"
                        name="ebill"
                        id="society"
                        checked={data.eSociety || false}
                        onChange={(e) =>
                          setData((pre) => ({
                            ...pre,
                            eSociety: e.target.checked,
                            eFix: false,
                            eUnit: false,
                          }))
                        }
                      />
                    </label>{" "}
                  </label>

                  {!data.eSociety && (
                    <input
                      type="text"
                      className="input"
                      placeholder={
                        data.eFix ? "Rs" : data.eUnit ? "Per Unit" : ""
                      }
                      value={data?.electricityBill}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          electricityBill: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
                <div className="inputField">
                  <div className="inputGroup">
                    <label>Furniture and other Details:</label>
                    <input
                      type="radio"
                      name="furniture"
                      id="feryes"
                      checked={data.furniture === true}
                      value={true}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          furniture: true,
                        }))
                      }
                    />
                    <label htmlFor="feryes">Yes</label>
                    <input
                      type="radio"
                      name="furniture"
                      id="ferno"
                      checked={data.furniture === false}
                      value={false}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          furniture: false,
                        }))
                      }
                    />
                    <label htmlFor="ferno">No</label>
                  </div>

                  {data.furniture === true && (
                    <input
                      type="text"
                      className="input"
                      value={data.furnitureDetails || ""}
                      placeholder="Furniture and other Details"
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          furnitureDetails: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>

                <div className="inputField">
                  <div className="inputGroup">
                    <label>Water Charges</label>
                    <input
                      type="radio"
                      name="waterCharge"
                      id="watyes"
                      checked={data.waterCharge === true}
                      value={true}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          waterCharge: true,
                        }))
                      }
                    />
                    <label htmlFor="watyes">Yes</label>
                    <input
                      type="radio"
                      name="waterCharge"
                      id="watno"
                      checked={data.waterCharge === false}
                      value={false}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          waterCharge: false,
                        }))
                      }
                    />
                    <label htmlFor="watno">No</label>
                  </div>

                  {data.waterCharge === true && (
                    <div className="inputField">
                      <div className="inputGroup">
                        <label htmlFor="fixedWa">
                          <span>Fixed rate (Rs)</span>
                          <input
                            type="radio"
                            name="water"
                            id="fixedWa"
                            checked={data.wFix || false}
                            onChange={(e) => {
                              setData((pre) => {
                                return {
                                  ...pre,
                                  wFix: e.target.checked,
                                  wSociety: false,
                                };
                              });
                            }}
                          />
                        </label>
                        <label htmlFor="fixedWaSoc">
                          <span>Direct To Concern Authority</span>
                          <input
                            type="radio"
                            name="water"
                            checked={data.wSociety || false}
                            id="fixedWaSoc"
                            onChange={(e) => {
                              setData((pre) => {
                                return {
                                  ...pre,
                                  wSociety: e.target.checked,
                                  wFix: false,
                                };
                              });
                            }}
                          />
                        </label>
                      </div>
                      {!data.wSociety && (
                        <input
                          type="text"
                          className="input"
                          value={data?.waterBill}
                          placeholder={data.wFix && "Rs"}
                          onChange={(e) =>
                            setData((pre) => ({
                              ...pre,
                              waterBill: e.target.value,
                            }))
                          }
                        />
                      )}
                    </div>
                  )}
                </div>

                <div className="inputField">
                  <div className="inputGroup">
                    <label>Society Maintenance:</label>
                    <input
                      type="radio"
                      name="maintenance"
                      id="socyes"
                      value={true}
                      checked={data.societyMaintenance === true}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          societyMaintenance: true,
                        }))
                      }
                    />
                    <label htmlFor="socyes">Yes</label>
                    <input
                      type="radio"
                      name="maintenance"
                      id="socno"
                      value={false}
                      checked={data.societyMaintenance === false}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          societyMaintenance: false,
                        }))
                      }
                    />
                    <label htmlFor="socno">No</label>
                  </div>

                  {data.societyMaintenance === true && (
                    <input
                      type="text"
                      className="input"
                      value={data.societyMaintenanceCharge || ""}
                      placeholder="Rs. 0.00"
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          societyMaintenanceCharge: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
                <div className="inputField">
                  <label>Lease Starting Date :</label>
                  <input
                    type="date"
                    className="input"
                    min={0}
                    value={data.startLeaseDate || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        startLeaseDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label> Rent Pay Date:</label>
                  <input
                    type="number"
                    className="input"
                    min={1}
                    max={30}
                    value={data.rentPayDate || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        rentPayDate: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label htmlFor="rentextextendRate">
                    Percentage of extension in rent on renewal :
                  </label>
                  <select
                    name="rentextextendRate"
                    id="rentextextendRate"
                    value={data.rentextextendRate || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        rentextextendRate: e.target.value,
                      }))
                    }
                  >
                    <option value="" disabled selected>
                      Select
                    </option>
                    <option value="1">1%</option>
                    <option value="2">2%</option>
                    <option value="3">3%</option>
                    <option value="4">4%</option>
                    <option value="5">5%</option>
                    <option value="6">6%</option>
                    <option value="7">7%</option>
                    <option value="8">8%</option>
                    <option value="9">9%</option>
                    <option value="10">10%</option>
                    <option value="11">11%</option>
                    <option value="12">12%</option>
                    <option value="13">13%</option>
                    <option value="14">14%</option>
                    <option value="15">15%</option>
                    <option value="16">16%</option>
                    <option value="17">17%</option>
                    <option value="18">18%</option>
                    <option value="19">19%</option>
                    <option value="20">20%</option>
                  </select>
                </div>
                {/* Terms and Conditions Section */}
                <div className="inputField">
                  <label>Terms and Conditions:</label>
                  <ul>
                    {data.terms?.map((term, index) => (
                      <li key={index}>
                        {term}
                        <button
                          className="btn remove-btn"
                          onClick={() => {
                            setData((pre) => ({
                              ...pre,
                              terms: pre.terms.filter((_, i) => i !== index),
                            }));
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <input
                    type="text"
                    className="input"
                    value={data.newTerm || ""}
                    placeholder="Add new term"
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        newTerm: e.target.value,
                      }))
                    }
                  />
                  <button
                    className="btn add-btn"
                    onClick={() => {
                      if (data.newTerm) {
                        setData((pre) => ({
                          ...pre,
                          terms: [...(pre.terms || []), pre.newTerm],
                          newTerm: "", // Clear input after adding
                        }));
                      }
                    }}
                  >
                    Add Term
                  </button>
                </div>
                <div className="inputField">
                  <label> Number of Tenancy months :</label>
                  <select
                    value={data?.numberOfMonth || ""}
                    onChange={(e) => {
                      setData((pre) => {
                        return {
                          ...pre,
                          numberOfMonth: e.target.value,
                        };
                      });
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
                      return <option key={month}>{month}</option>;
                    })}
                  </select>
                </div>
                <div className="inputField">
                  <label> Lock in period (if applicable) :</label>
                  <select
                    value={data.lockInPeriod || ""}
                    onChange={(e) => {
                      setData((pre) => {
                        return {
                          ...pre,
                          lockInPeriod: e.target.value,
                        };
                      });
                    }}
                  >
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
                      return <option key={month}>{month}</option>;
                    })}
                  </select>
                </div>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(7)}>
                    Previous
                  </button>
                  <button className="btn" onClick={validateProperty}>
                    Pay now
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="previewBtn"
            onClick={() => setIsShowing(!isShowing)}
          >
            {isShowing ? "Hide Preview" : "Show Preview"}
          </button>
          {LeasePage}
        </div>
      </div>
    </main>
  );
};

export default Rental;
