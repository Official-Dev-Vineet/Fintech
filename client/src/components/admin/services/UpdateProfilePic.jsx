import { useState } from "react";
import { getCookie } from "../commonFunc";
import "./styles/UpdateProfilePic.css";
import PropTypes from "prop-types";
const UpdateProfilePic = ({func}) => {
  const token = getCookie("token");
  const [update, setUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const updateProfilePic = async (e) => {
    e.preventDefault();
    setUpdate(false);
    setErrorMessage(""); // Reset previous error message

    if (!profilePic) {
      setErrorMessage("Please select a profile picture");
      return;
    }

    const formData = new FormData();
    formData.append("updateProfilePic", profilePic);
    const url = import.meta.env.VITE_SERVER_URL;

    try {
      const res = await fetch(`${url}/user/updateProfilePic`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const result = await res.json();
      if (result?.success) {
        alert("Profile picture updated successfully");
        setUpdate(true);
        func();
      } else {
        throw new Error(result?.message || "Failed to update profile picture");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="updateProfilePic">
      <h1>Update Profile Picture</h1>
      <form onSubmit={updateProfilePic}>
        <div className="inputField">
          <label htmlFor="profilePic">Profile Picture</label>
          <input
            type="file"
            id="profilePic"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {update && (
        <p className="success">Profile picture updated successfully!</p>
      )}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default UpdateProfilePic;

UpdateProfilePic.propTypes = {
  func: PropTypes.func.isRequired,
};
