import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";  // Import useParams to get the jobId from URL
// Extracts the jobId from the URL

const ApplyJob = () => {
  const { jobId } = useParams();  // Extract jobId from URL params
  console.log("Received jobId:", jobId);  // Verify jobId is extracted correctly

  const [candidateName, setCandidateName] = useState("");
  const [resume, setResume] = useState(null);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]); // Store the selected file
  };

  const handleApply = async () => {
    if (!candidateName || !resume) {
      alert("Please fill all fields and choose a file.");
      return;
    }

    if (!jobId) {
      alert("Job ID is missing!");
      return;
    }

    const formData = new FormData();
    formData.append("candidateName", candidateName);
    formData.append("resume", resume);

    try {
      const response = await axios.post(`http://localhost:5000/api/apply/${jobId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error applying for job:", error);
    }
  };

  return (
    <div>
      <h2>Apply for Job</h2>
      <form>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          placeholder="Your Name"
        />
        <br />
        <input
          type="file"
          onChange={handleFileChange}
        />
        <br />
        <button type="button" onClick={handleApply}>
          Apply
        </button>
      </form>
    </div>
  );
};

export default ApplyJob;
