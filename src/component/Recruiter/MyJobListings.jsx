import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyJobListings.css";

const MyJobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/jobs");
      console.log("Fetched jobs:", response.data); // Debug
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/jobs/${id}`);
      fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleEditClick = (job) => {
    setEditingJob({ ...job });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/jobs/${editingJob.id}`,
        editingJob
      );
      setEditingJob(null);
      fetchJobs();
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleCloseModal = () => {
    setEditingJob(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Not Available";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="my-job-listings-container">
      <h2 className="title">My Job Listings</h2>
      <div className="job-cards">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <h3 className="job-title">{job.title}</h3>
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
            <p className="job-date">
              <strong>Posted on:</strong> {formatDate(job.postedDate)}
            </p>
            <div className="job-actions">
              <button className="edit-btn" onClick={() => handleEditClick(job)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingJob && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Job</h3>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Job Title"
                value={editingJob.title}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="company"
                placeholder="Company"
                value={editingJob.company}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={editingJob.location}
                onChange={handleEditChange}
                required
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience"
                value={editingJob.experience}
                onChange={handleEditChange}
              />
              <input
                type="text"
                name="salary"
                placeholder="Salary"
                value={editingJob.salary}
                onChange={handleEditChange}
              />
              <textarea
                name="description"
                placeholder="Description"
                value={editingJob.description}
                onChange={handleEditChange}
                required
              />
              <input
                type="date"
                name="postedDate" // ✅ match Java field
                value={editingJob.postedDate}
                onChange={handleEditChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobListings;
