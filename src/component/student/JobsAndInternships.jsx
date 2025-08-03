import React, { useState, useEffect } from "react";
import "./JobsAndInternships.css";

const JobsAndInternships = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [jobType, setJobType] = useState(""); // Sub-filter for Job

  useEffect(() => {
    const fetchJobSummaries = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/job-summaries");
        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }
        const data = await response.json();
        console.log("Fetched job summaries:", data);
        setListings(data);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobSummaries();
  }, []);

  // 🔍 Filtering logic
  const filteredListings = listings.filter((item) => {
    if (filter === "All") return true;
    if (filter === "Internship")
      return item.type?.toLowerCase() === "internship";
    if (filter === "Job") {
      if (jobType === "") return item.type?.toLowerCase() === "job";
      return item.type?.toLowerCase() === jobType.toLowerCase(); // Full-time or Part-Time
    }
    return false;
  });

  return (
    <div className="jobs-container">
      <h2>💼 Jobs & Internships</h2>

      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => {
            setFilter("All");
            setJobType("");
          }}
        >
          All
        </button>

        <button
          className={filter === "Job" ? "active" : ""}
          onClick={() => {
            setFilter("Job");
            setJobType(""); // Reset sub-filter when switching to Job
          }}
        >
          Jobs
        </button>

        <button
          className={filter === "Internship" ? "active" : ""}
          onClick={() => {
            setFilter("Internship");
            setJobType("");
          }}
        >
          Internships
        </button>

        {/* 👇 Sub-filter visible only when "Job" is selected */}
        {filter === "Job" && (
          <div className="sub-filter-buttons">
            <button
              className={jobType === "Full-time" ? "active" : ""}
              onClick={() => setJobType("Full-time")}
            >
              Full-time
            </button>
            <button
              className={jobType === "Part-Time" ? "active" : ""}
              onClick={() => setJobType("Part-Time")}
            >
              Part-Time
            </button>
          </div>
        )}
      </div>

      <div className="listings-grid">
        {filteredListings.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          filteredListings.map((item) => (
            <div key={item.id} className="listing-card">
              <h3>{item.title}</h3>
              <p>
                <strong>Company:</strong> {item.company}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Posted on:</strong>{" "}
                {item.postDate
                  ? new Date(item.postDate).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Type:</strong> {item.type || "N/A"}
              </p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobsAndInternships;
