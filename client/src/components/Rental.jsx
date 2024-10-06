import { useState, useLayoutEffect } from "react";
import "./styles/Rental.css";
import LeaseAgreement from "../decorators/LeaseAgreement";

const Rental = () => {
  // Initialize state from localStorage if available
  const [step, setStep] = useState(1);
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
  };

  const handleRemoveLandlord = (index) => {
    setData((prevData) => {
      const newLandlords = [...prevData.landlords];
      newLandlords.splice(index, 1); // Remove the landlord at the given index
      return { ...prevData, landlords: newLandlords }; // Return updated state
    });
  };

  const collectPersonalDetails = () => {
    const landlord = data.landlords[currentIndex];
    // Check if landlord details are present
    if (landlord.idNumber) {
      setStep(6);
      console.log(data);
    } else {
      alert("Please fill out landlord details");
    }
  };

  const collectTenantDetails = () => {
    const opponent = data.tenants[opponentIndex];

    // Check if opponent details are present
    if (opponent) {
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
                </div>
                <div className="inputField">
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
                </div>
                <div className="inputField">
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
                </div>
                <div className="inputField">
                  <input
                    type="button"
                    className={`input ${
                      data.delivery === "homedelivery" && "active"
                    }`}
                    value="Home delivery (Charge Applicable)"
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
                      {landlord.category === "individual" ? (
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
                      ) : (
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
                              handleInputChange1(index, "name", e.target.value)
                            }
                          />
                        </>
                      )}
                    </div>
                    {landlord.title && landlord.category === "individual" && (
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
                      <label>ID Type:</label>
                      <select
                        className="input"
                        value={landlord.idType}
                        onChange={(e) =>
                          handleInputChange1(index, "idType", e.target.value)
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
                          handleInputChange1(index, "idNumber", e.target.value)
                        }
                      />
                    </div>

                    {/* Remove button for each landlord */}
                    <button
                      onClick={() => handleRemoveLandlord(index)}
                      className="btn"
                    >
                      Remove Landlord
                    </button>
                  </div>
                ))}
                <button onClick={handleAddLandlord} className="btn">
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
                      {tenant.category === "individual" ? (
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
                      ) : (
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
                          handleInputChange2(index, "idNumber", e.target.value)
                        }
                      />
                    </div>

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

            {step == 7 && (
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
                </div>
                <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                    </div>
                    <div className="inputField">
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
                  <button className="btn" onClick={() => setStep(8)}>
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 8 && (
              <div className="form">
                <p>Fill the details of Property:</p>
                <div className="inputField">
                  <label>Property Address:</label>
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
                  <label>Electricity Bill (if applicable):</label>
                  <label htmlFor="eUnit">In Unit</label>
                  
                  <input
                    type="text"
                    className="input"
                    value={data.electricityBill || ""}
                    onChange={(e) =>
                      setData((pre) => ({
                        ...pre,
                        electricityBill: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="inputField">
                  <label>Water Supply Bill (if applicable):</label>
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
                  <label> Number of months :</label>
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
                <div className="btnGroup">
                  <button className="btn" onClick={() => setStep(7)}>
                    Previous
                  </button>
                  <button className="btn" onClick={validateProperty}>
                    Preview
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="preview">
            <LeaseAgreement data={data} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Rental;
