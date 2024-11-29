import React, { useState } from 'react';
import axios from 'axios';

const PostJob = ({ token }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
    featured: false,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/jobs/post-job',
        jobData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token here
          },
        }
      );
      setMessage('Job posted successfully!');
    } catch (error) {
      setMessage('Error posting job');
    }
  };

  return (
    <div>
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Job Description"
          value={jobData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={jobData.company}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Job Location"
          value={jobData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          required
        />
        <label>
          Featured
          <input
            type="checkbox"
            name="featured"
            checked={jobData.featured}
            onChange={() => setJobData({ ...jobData, featured: !jobData.featured })}
          />
        </label>
        <button type="submit">Post Job</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostJob;
