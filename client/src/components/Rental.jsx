import { useState, useLayoutEffect } from "react";
import "./styles/Rental.css";
import LeaseAgreement from "../decorators/LeaseAgreement";

const Rental = () => {
  // Initialize state from localStorage if available
  const [step, setStep] = useState(1);
  const [isShowing, setIsShowing] = useState(false);
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
      setStep(8);
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
    if (data.delivery) {
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
      setStep(6);
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
      setStep(7);
    } else {
      alert("Please fill out your personal details");
    }
  };

  const validateProperty = () => {
    if (data.propertyPrice && data.propertyAddress && data.propertyName) {
      setStep(8);
    } else {
      alert("Please select a property");
    }
  };
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
                    value="Haryana (Stamp Paper - 101)"
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
                <p>Select the preferred mode of delivery:</p>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.delivery === "softcopy" && "active"
                    }`}
                    value="Soft Copy (RS-0)"
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
                    value="Pickup From Counter (RS-0)"
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
                    value="Home Delivery (Charge Applicable)"
                    onClick={() =>
                      setData((pre) => ({
                        ...pre,
                        delivery: "homedelivery",
                      }))
                    }
                  />
                </div>
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
                        value={landlord.category}
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

                    <div className="inputGroup">
                      {landlord.category === "individual" && (
                        <>
                          <select
                            value={landlord.title}
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
                        </>
                      )}
                      {landlord.category !== "individual" &&
                        landlord.category !== "" && (
                          <>
                            <select
                              value={landlord.title}
                              onChange={(e) =>
                                handleInputChange1(
                                  index,
                                  "title",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" disabled>
                                Select
                              </option>
                              <option value="Authority Signatory">
                                Authority Signatory
                              </option>
                              <option value="Partner">Partner</option>
                              <option value="Director">Director</option>
                              <option value="Proprietor">Proprietor</option>
                            </select>
                            <input
                              type="text"
                              className="input"
                              placeholder="Enter Name..."
                              value={landlord.name}
                              onChange={(e) =>
                                handleInputChange1(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </>
                        )}
                    </div>
                    {landlord.category === "individual" &&
                      landlord.title &&
                      landlord.name && (
                        <div className="inputField inputGroup">
                          <select
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
                      <label>Permanent Address:</label>
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
                        type="text"
                        className="input"
                        value={landlord.contact}
                        onChange={(e) =>
                          handleInputChange1(index, "contact", e.target.value)
                        }
                      />
                    </div>

                    <div className="inputField">
                      <label>ID Type:</label>
                      <select
                        className="input"
                        value={landlord.idType}
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
                    <button className="btn" onClick={() => setStep(4)}>
                      Previous
                    </button>
                    <button className="btn" onClick={collectPersonalDetails}>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="form">
                <p>Enter Tenant&apos;s Details</p>
                {data.tenants.map((tenant, index) => (
                  <div key={index}>
                    <div className="inputField">
                      <label htmlFor={`tenant-category-${index}`}>
                        Choose Category:
                      </label>
                      <select
                        id={`tenant-category-${index}`}
                        value={tenant.category}
                        onChange={(e) =>
                          handleInputChange2(index, "category", e.target.value)
                        }
                      >
                        <option value="" disabled>
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

                    <div className="inputGroup">
                      {tenant.category === "individual" && (
                        <>
                          <select
                            value={tenant.title}
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
                            value={tenant.name}
                            onChange={(e) =>
                              handleInputChange2(index, "name", e.target.value)
                            }
                          />
                        </>
                      )}
                      {tenant.category !== "individual" && tenant.category && (
                        <>
                          <select
                            value={tenant.title}
                            onChange={(e) =>
                              handleInputChange2(index, "title", e.target.value)
                            }
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            <option value="Authority Signatory">
                              Authority Signatory
                            </option>
                            <option value="Partner">Partner</option>
                            <option value="Director">Director</option>
                            <option value="Proprietor">Proprietor</option>
                          </select>
                          <input
                            type="text"
                            className="input"
                            placeholder="Enter Name..."
                            value={tenant.name}
                            onChange={(e) =>
                              handleInputChange2(index, "name", e.target.value)
                            }
                          />
                        </>
                      )}
                    </div>

                    {tenant.title && tenant.category === "individual" && (
                      <div className="inputField inputGroup">
                        <select
                          onChange={(e) =>
                            handleInputChange2(
                              index,
                              "titleParent",
                              e.target.value
                            )
                          }
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {tenant.title === "Mr" && (
                            <>
                              {" "}
                              <option value="Son Of">Son Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}

                          {tenant.title === "Ms" && (
                            <>
                              {" "}
                              <option value="Daughter Of">Daughter Of</option>
                              <option value="Care Of">Care Of</option>
                            </>
                          )}
                          {tenant.title === "Mrs" && (
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
                          value={tenant.fName}
                          onChange={(e) =>
                            handleInputChange2(index, "fName", e.target.value)
                          }
                        />
                      </div>
                    )}

                    <div className="inputField">
                      <label>Permanent Address:</label>
                      <input
                        type="text"
                        className="input"
                        value={tenant.address}
                        onChange={(e) =>
                          handleInputChange2(index, "address", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label htmlFor="state">State</label>
                      <select
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
                      <label className="District">District </label>
                      <input
                        type="text"
                        className="input"
                        placeholder="District..."
                        value={tenant.district}
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
                        value={tenant.pincode}
                        onChange={(e) =>
                          handleInputChange2(index, "pincode", e.target.value)
                        }
                      />
                    </div>
                    <div className="inputField">
                      <label>ID Type:</label>
                      <select
                        className="input"
                        value={tenant.idType}
                        onChange={(e) =>
                          handleInputChange2(index, "idType", e.target.value)
                        }
                      >
                        <option value="" disabled>
                          Select ID Type
                        </option>
                        <option value="aadhaar">Aadhaar</option>
                        <option value="passport">Passport</option>
                        <option value="voterID">Voter ID</option>
                        <option value="drivingLicense">Driving License</option>
                      </select>
                    </div>

                    {tenant.idType && (
                      <div className="inputField">
                        <label>
                          {tenant.idType === "aadhaar"
                            ? "Aadhaar Number"
                            : "ID Number"}
                          :
                        </label>
                        <input
                          type="text"
                          className="input"
                          value={tenant.idNumber}
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

                    {/* Remove button for each tenant */}
                    <button
                      onClick={() => handleRemoveTenant(index)}
                      className="btn"
                    >
                      Remove Tenant
                    </button>
                  </div>
                ))}
                <button onClick={handleAddTenant} className="btn">
                  Add Another Tenant
                </button>
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(5)}>
                    Previous
                  </button>
                  <button className="btn" onClick={collectTenantDetails}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 7 && (
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

                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(6)}>
                    Previous
                  </button>
                  <button className="btn" onClick={checkProperty}>
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 8 && (
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
                  <label>Security Amount:</label>
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
                    Electricity Bill (if applicable):{" "}
                    <label htmlFor="eUnit">
                      <span>in Unit</span>
                      <input
                        type="radio"
                        name="ebill"
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
                      placeholder={data.eFix ? "Rs" : data.eUnit ? "Unit" : ""}
                      value={data.electricityBill || ""}
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
                  <label>
                    Water Supply Bill (if applicable):
                    <label htmlFor="fixedWa">
                      <span>Fixed rate (Rs)</span>
                      <input
                        type="radio"
                        name="water"
                        id="fixedWa"
                        onChange={(e) => {
                          setData((pre) => {
                            return {
                              ...pre,
                              waterBillFixed: e.target.checked,
                              waterBillUnit: false,
                              waterBillSociety: false,
                            };
                          });
                        }}
                      />
                    </label>
                    <label htmlFor="unitwa">
                      <span>In Unit</span>
                      <input
                        type="radio"
                        name="water"
                        id="unitwa"
                        onChange={(e) => {
                          setData((pre) => {
                            return {
                              ...pre,
                              waterBillUnit: e.target.checked,
                              waterBillSociety: false,
                              waterBillFixed: false,
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
                        id="fixedWaSoc"
                        onChange={(e) => {
                          setData((pre) => {
                            return {
                              ...pre,
                              waterBillSociety: e.target.checked,
                              waterBillUnit: false,
                              waterBillFixed: false,
                            };
                          });
                        }}
                      />
                    </label>
                  </label>
                  {!data.waterBillSociety && (
                    <input
                      type="text"
                      className="input"
                      value={data.waterBill || ""}
                      onChange={(e) =>
                        setData((pre) => ({
                          ...pre,
                          waterBill: e.target.value,
                        }))
                      }
                    />
                  )}
                </div>
                <div className="inputField">
                  <label>Society Maintenance (if applicable):</label>
                  <input
                    type="text"
                    className="input"
                    value={data.societyMaintenance || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        societyMaintenance: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label> Start Lease Date :</label>
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
                    type="date"
                    className="input"
                    min={0}
                    value={data.rentPayDate || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        rentPayDate: e.target.value,
                      }))
                    }
                  />
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
                  <label> Number of Tanancy months :</label>
                  <select
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
                  <label> Lock in period (in months) :</label>
                  <select
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
                  <button
                    className="btn"
                    onClick={() => {
                      validateProperty();
                      setIsShowing(!isShowing);
                    }}
                  >
                    Preview
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
          <div className={`preview ${isShowing ? "active" : ""}`}>
            <LeaseAgreement data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rental;
