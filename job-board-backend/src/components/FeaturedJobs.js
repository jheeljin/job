import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedJobs = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);

  useEffect(() => {
    // Fetch featured jobs from your backend
    axios.get('http://localhost:5000/api/jobs/featured-jobs')
      .then(response => {
        setFeaturedJobs(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching featured jobs!", error);
      });
  }, []);

  return (
    <div className="featured-jobs">
      <h2>Featured Jobs</h2>
      <div className="jobs-list">
        {featuredJobs.map((job) => (
          <div key={job._id} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p><strong>Company:</strong> {job.company}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>

            {/* Render Apply Button only if the user is not logged in */}
            <Link to="/candidate/register">
              <button>Apply Now</button>
            </Link>

            <Link to="/canditate/login">
            {/* <button>Apply Now</button> */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedJobs;
