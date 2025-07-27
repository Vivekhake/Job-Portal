import React, { useState, useEffect } from "react";
import "./JobsAndInternships.css";

const JobsAndInternships = () => {
  const [listings, setListings] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // Dummy data (replace with API call later)
    const dummyListings = [
      {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        type: "Job",
        location: "Bangalore",
        postedDate: "2025-07-20",
      },
      {
        id: 2,
        title: "Data Science Intern",
        company: "TCS",
        type: "Internship",
        location: "Mumbai",
        postedDate: "2025-07-22",
      },
      {
        id: 3,
        title: "Backend Developer",
        company: "Amazon",
        type: "Job",
        location: "Hyderabad",
        postedDate: "2025-07-18",
      },
      {
        id: 4,
        title: "UI/UX Design Intern",
        company: "Zoho",
        type: "Internship",
        location: "Chennai",
        postedDate: "2025-07-25",
      },
    ];
    setListings(dummyListings);
  }, []);

  const filteredListings =
    filter === "All"
      ? listings
      : listings.filter((item) => item.type === filter);

  return (
    <div className="jobs-container">
      <h2>💼 Jobs & Internships</h2>

      <div className="filter-buttons">
        <button
          className={filter === "All" ? "active" : ""}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={filter === "Job" ? "active" : ""}
          onClick={() => setFilter("Job")}
        >
          Jobs
        </button>
        <button
          className={filter === "Internship" ? "active" : ""}
          onClick={() => setFilter("Internship")}
        >
          Internships
        </button>
      </div>

      <div className="listings-grid">
        {filteredListings.map((item) => (
          <div key={item.id} className="listing-card">
            <h3>{item.title}</h3>
            <p>
              <strong>Company:</strong> {item.company}
            </p>
            <p>
              <strong>Location:</strong> {item.location}
            </p>
            <p>
              <strong>Posted on:</strong> {item.postedDate}
            </p>
            <p>
              <strong>Type:</strong> {item.type}
            </p>
            <button className="apply-btn">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobsAndInternships;
