// src/components/ApplicationStatusTracker.js

import React from "react";
import "./ApplicationStatusTracker.css";

const statusSteps = [
  "Submitted",
  "Under Review",
  "Shortlisted",
  "Interview",
  "Offered",
  "Rejected", // Added here
];

const ApplicationStatusTracker = ({ currentStatus }) => {
  const currentStepIndex = statusSteps.indexOf(currentStatus);

  return (
    <div className="status-tracker">
      {statusSteps.map((step, index) => (
        <div key={index} className="step-container">
          <div
            className={`step-circle ${
              index <= currentStepIndex ? "active" : ""
            }`}
          >
            {index + 1}
          </div>
          <div className="step-label">{step}</div>
          {index < statusSteps.length - 1 && (
            <div
              className={`step-line ${
                index < currentStepIndex ? "active" : ""
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ApplicationStatusTracker;
