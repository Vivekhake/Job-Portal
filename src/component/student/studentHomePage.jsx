import React, { useState, useEffect } from "react";
import axios from "axios";
import ApplicationStatusTracker from "./ApplicationStatusTracker";
import "./studentHomePage.css";

const StudentHomePage = () => {
  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchJobs();
    fetchStudentProfile();
    fetchApplications();
  }, []);
  // 🔁 Auto-refresh applications every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchApplications();
    }, 10000); // 10 seconds

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/jobs");
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchStudentProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/student-profile"
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching student profile:", error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/applications"
      );
      setApplications(response.data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleApply = async (job) => {
    if (!profile) {
      setMessage("⚠️ Please complete your profile first.");
      return;
    }

    if (hasApplied(job)) {
      setMessage(
        "⚠️ You have already applied for this job. Please wait for recruiter response."
      );
      return;
    }

    const newApp = {
      studentName: profile.firstName + " " + profile.lastName,
      email: profile.email,
      jobTitle: job.title,
      company: job.company,
      resumeUrl: profile.resumePath,
      jobId: job.id,
      appliedDate: new Date().toISOString(),
      status: "Submitted",
    };

    try {
      await axios.post("http://localhost:8080/api/applications", newApp);
      setMessage("✅ Application submitted successfully.");

      // Optimistically add new application to local state
      setApplications((prev) => [...prev, newApp]);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        typeof error.response.data === "string" &&
        error.response.data.includes("already applied")
      ) {
        setMessage(
          "⚠️ You already applied for this job. Please wait for recruiter response."
        );
      } else {
        setMessage("❌ Failed to apply: " + error.message);
      }
    }
  };

  const hasApplied = (job) => {
    const app = applications.find((app) => app.jobId === job.id);
    return app && app.status !== "Rejected";
  };

  const getApplication = (job) => {
    return applications.find((app) => app.jobId === job.id);
  };

  return (
    <div className="student-home-container">
      <h1 className="student-home-header">🎓 Student Dashboard</h1>

      {message && <p className="status-message">{message}</p>}

      {/* Profile Section */}
      <div className="section-card">
        <h2>👤 Profile Details</h2>
        {profile ? (
          <div className="profile-grid">
            <div className="profile-left">
              <p>
                <strong>Name:</strong> {profile.firstName} {profile.lastName}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Mobile:</strong> {profile.mobile}
              </p>
              <p>
                <strong>Address:</strong> {profile.address}, {profile.city},{" "}
                {profile.state} - {profile.zipCode}
              </p>
              <p>
                <strong>Education:</strong> {profile.collegeName} (
                {profile.startYear}-{profile.endYear}), CGPA: {profile.cgpa}
              </p>
              <p>
                <strong>Skills:</strong> {profile.keySkills}
              </p>
              <p>
                <strong>Experience:</strong> {profile.experience}
              </p>
              <p>
                <strong>Projects:</strong> {profile.projects}
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a href={profile.github} target="_blank" rel="noreferrer">
                  {profile.github}
                </a>
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  {profile.linkedin}
                </a>
              </p>
              {profile.resumePath && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a
                    href={`http://localhost:8080/${profile.resumePath}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                </p>
              )}
            </div>
            {profile.profileImagePath && (
              <div className="profile-right">
                <img
                  src={`http://localhost:8080/${profile.profileImagePath}`}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
            )}
          </div>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Job Listings Section */}
      {/* Job Listings Section */}
      {/* Job Listings Section */}
      <div className="section-card">
        <h2>💼 Available Jobs</h2>
        <div className="job-listings">
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job, index) => {
              const application = getApplication(job);
              const hasAppliedToJob = !!application;

              return (
                <div key={index} className="job-card">
                  <h3>{job.title}</h3>
                  <p>
                    <strong>Company:</strong> {job.company}
                  </p>
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Experience:</strong> {job.experience}
                  </p>
                  <p>
                    <strong>Salary:</strong> {job.salary}
                  </p>
                  <p className="job-description">{job.description}</p>
                  <p>
                    <strong>Post Date:</strong> {job.postDate}
                  </p>

                  <div className="job-buttons">
                    <button
                      className="btn-apply"
                      onClick={() => handleApply(job)}
                      disabled={hasApplied(job)}
                    >
                      {application?.status === "Rejected"
                        ? "🔁 Re-Apply"
                        : hasApplied(job)
                        ? "✅ Applied"
                        : "Apply"}
                    </button>
                  </div>

                  {/* ✅ Show tracker if applied and status is not rejected */}
                  {hasAppliedToJob && application.status !== "Rejected" && (
                    <ApplicationStatusTracker
                      currentStatus={application.status || "Submitted"}
                    />
                  )}

                  {/* Show applied date if available */}
                  {application?.appliedDate && (
                    <p>
                      <strong>Applied On:</strong> {application.appliedDate}
                    </p>
                  )}

                  {/* ❌ Show rejection message if status is Rejected */}
                  {application?.status === "Rejected" && (
                    <p className="rejected-text">
                      ❌ Your application was rejected.
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
