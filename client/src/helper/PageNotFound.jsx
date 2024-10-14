import React from "react";
import "./styles/MaintenancePage.css"; // Import the CSS for styling

const MaintenancePage = () => {
  return (
    <div className="maintenance-container">
      <div className="maintenance-box">
        <h1>We'll be back soon!</h1>
        <p>
          Sorry for the inconvenience but we're performing some maintenance at
          the moment. We'll be back online shortly!
        </p>
        <div className="icon-container">
          <div className="icon-wrench">&#128295;</div>
        </div>
        <p className="contact-info">
          If you need to, you can always{" "}
          <a href="mailto:info@chagans.com">contact us</a> for updates.
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
