import React, { useEffect, useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import "./Shortlisted.css";

const Interview = () => {
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem("interviewApplications");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        "http://localhost:8080/api/applications"
      );
      setApplications(response.data);
      localStorage.setItem(
        "interviewApplications",
        JSON.stringify(response.data)
      );
    } catch (err) {
      setError("Failed to load latest applications. Showing saved data.");
      console.error("Error fetching applications:", err);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (application) => {
    if (!application.email || !application.studentName) {
      console.error(
        "❌ Missing email or student name in application:",
        application
      );
      return;
    }

    try {
      await emailjs.send(
        "service_atbtqah", // ✅ Your EmailJS service ID
        "template_ottxov3", // ✅ Your EmailJS template ID
        {
          name: application.studentName, // e.g., "Vivek Hake"
          email: application.email, // ✅ must match your EmailJS template
          job_title: application.jobTitle,
          company: application.company, // ✅ match template variable
        },
        "OgvfDY-xgXb0J6XBo" // ✅ Your EmailJS public key
      );

      alert("📩 Interview email sent to " + application.email);
    } catch (error) {
      console.error("❌ EmailJS failed:", error);
      alert("❌ Failed to send email: " + (error.text || error.message));
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/applications/${id}/update-status`,
        null,
        { params: { status: newStatus } }
      );

      const updatedApp = applications.find((app) => app.id === id);

      if (!updatedApp) {
        alert("⚠️ Application not found.");
        return;
      }

      // Send email if moving to InterviewScheduling
      if (newStatus === "InterviewScheduling") {
        await sendEmail(updatedApp);
      }

      // Update local state
      setApplications((prevApps) => {
        const updatedApps = prevApps.map((app) =>
          app.id === id ? { ...app, status: newStatus } : app
        );
        localStorage.setItem(
          "interviewApplications",
          JSON.stringify(updatedApps)
        );
        return updatedApps;
      });
    } catch (err) {
      setError("Failed to update status or send email.");
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="shortlist-container">
      <h2>Interview Applications - Full History</h2>
      {loading && <p>Loading applications...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <table className="shortlist-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Resume</th>
            <th>Company</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 && !loading ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "16px" }}>
                No applications found.
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td>{app.studentName}</td>
                <td>{app.email}</td>
                <td>{app.jobTitle}</td>
                <td>
                  <a href={app.resumeUrl} target="_blank" rel="noreferrer">
                    View
                  </a>
                </td>
                <td>{app.company}</td>
                <td className={`status-${app.status?.toLowerCase()}`}>
                  {app.status}
                </td>
                <td>
                  <div className="button-group">
                    <button
                      className="btn1 accept"
                      onClick={() =>
                        updateStatus(app.id, "InterviewScheduling")
                      }
                      disabled={
                        app.status.toLowerCase() === "interviewscheduling"
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="btn1 reject"
                      onClick={() => updateStatus(app.id, "rejected")}
                      disabled={app.status.toLowerCase() === "rejected"}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Interview;
