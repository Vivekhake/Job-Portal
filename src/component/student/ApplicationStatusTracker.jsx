import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";
import "./ApplicationStatusTracker.css";

const statusSteps = [
  "Under Review",
  "Shortlisted",
  "Interview",
  "InterviewScheduling",
  "Offered",
  "Rejected",
];

const getStatusIcon = (status) => {
  const color = "#fff";
  switch (status) {
    case "Under Review":
      return <FaHourglassHalf color={color} title={status} />;
    case "Shortlisted":
    case "Interview":
    case "InterviewScheduling":
    case "Offered":
      return <FaCheckCircle color={color} title={status} />;
    case "Rejected":
      return <FaTimesCircle color={color} title={status} />;
    default:
      return null;
  }
};

const ApplicationStatusTracker = ({ currentStatus }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const finalIndex = statusSteps.indexOf(currentStatus);
    if (finalIndex === -1) return;

    setActiveIndex(0); // Reset animation

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        if (prev < finalIndex) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 800); // Step-by-step delay

    return () => clearInterval(interval);
  }, [currentStatus]);

  return (
    <div className="status-tracker">
      {statusSteps.map((step, index) => {
        const isActive = index <= activeIndex;

        return (
          <div key={index} className="step-wrapper">
            <div
              className={`step-circle ${isActive ? "active" : ""}`}
              style={{
                animation: isActive ? "fadeInStep 0.4s ease forwards" : "none",
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="icon-container">{getStatusIcon(step)}</div>
            </div>
            <div className="step-label">{step}</div>
            {index < statusSteps.length - 1 && (
              <div
                className={`step-line ${index < activeIndex ? "active" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationStatusTracker;
