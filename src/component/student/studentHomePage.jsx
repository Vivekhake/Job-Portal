import React, { useState, useEffect } from "react";
import axios from "axios";
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
      setMessage("Please complete your profile first.");
      return;
    }

    const applicationData = {
      studentName: profile.firstName + " " + profile.lastName,
      email: profile.email,
      jobTitle: job.title,
      company: job.company,
      resumeUrl: profile.resumePath,
    };

    try {
      await axios.post(
        "http://localhost:8080/api/applications",
        applicationData
      );
      setMessage("✅ Application submitted successfully.");
      fetchApplications(); // Refresh applied jobs
    } catch (error) {
      setMessage("❌ Failed to apply: " + error.message);
    }
  };

  const hasApplied = (job) => {
    return applications.some(
      (app) => app.jobTitle === job.title && app.company === job.company
    );
  };

  return (
    <div className="student-home-container">
      <h1 className="student-home-header">Welcome to Student Home Page</h1>

      {message && <p className="status-message">{message}</p>}

      {/* Profile Section */}
      <div className="student-home-section">
        <h2>👤 Profile</h2>
        {profile ? (
          <>
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
              {profile.startYear} - {profile.endYear}), CGPA: {profile.cgpa}
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
            <p>
              <strong>Skills:</strong> {profile.keySkills}
            </p>
            <p>
              <strong>Experience:</strong> {profile.experience}
            </p>
            <p>
              <strong>Projects:</strong> {profile.projects}
            </p>

            {profile.profileImagePath && (
              <div>
                <strong>Profile Image:</strong>
                <br />
                <img
                  src={`http://localhost:8080/${profile.profileImagePath}`}
                  alt="Profile"
                  style={{ width: "150px", borderRadius: "10px" }}
                />
              </div>
            )}

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
          </>
        ) : (
          <p>Loading profile...</p>
        )}
      </div>

      {/* Job Listings Section */}
      <div className="student-home-section">
        <h2>💼 Job Listings</h2>
        <div className="job-listing-row">
          {jobs.length === 0 ? (
            <p>No jobs available.</p>
          ) : (
            jobs.map((job, index) => (
              <div key={index} className="job-box">
                <h3>{job.title}</h3>
                <p>
                  <strong>Company:</strong> {job.company}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Type:</strong> {job.experience} experience
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
                    {hasApplied(job) ? "Applied" : "Apply"}
                  </button>
                  <button className="btn-join">Join</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentHomePage;
