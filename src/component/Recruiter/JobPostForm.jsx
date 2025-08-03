import React, { useState } from "react";
import "./JobPostForm.css";

const JobPostForm = () => {
  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    salary: "",
    experience: "",
    company: "",
    type: "", // ✅ make sure this matches JobSummary 'type' field
    postDate: getTodayDate(),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          description: formData.description,
          salary: formData.salary,
          experience: formData.experience,
          company: formData.company,
          type: formData.type,
          postedDate: formData.postDate,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server responded with error:", errorText);
        alert("Failed to post job: " + errorText);
        return;
      }

      alert("Job Posted Successfully!");

      setFormData({
        title: "",
        location: "",
        description: "",
        salary: "",
        experience: "",
        company: "",
        type: "",
        postDate: getTodayDate(),
      });
    } catch (error) {
      console.error("Network error:", error);
      alert("Error posting job. Please check backend server or network.");
    }
  };

  return (
    <div className="job-form-container">
      <h2>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label>Company</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label>Experience Required</label>
        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <label>Salary</label>
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
        />

        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description</label>
        <textarea
          name="description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Post Date</label>
        <input
          type="date"
          name="postDate"
          value={formData.postDate}
          onChange={handleChange}
          required
        />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostForm;
