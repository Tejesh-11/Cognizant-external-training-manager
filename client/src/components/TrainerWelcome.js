import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function TrainerWelcome() {
  const currentUser = useSelector((state) => state.login.currentUser);
  const [allocatedBatch, setAllocatedBatch] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    // Check if the user is authenticated
    if (!currentUser) {
      // If not authenticated, redirect to login page
      navigate('/login'); 
      return;
    }
    
    // Fetch data only if the user is authenticated
    fetchAllocatedBatch();
  }, [currentUser]);

  const fetchAllocatedBatch = async () => {
    try {
      const res = await axios.get(`http://localhost:2000/batch-api/batchdetails/${currentUser.username}`);
      setAllocatedBatch(res.data.payload);
    } catch (error) {
      console.error('Error fetching allocated batch:', error);
    }
  };

  return (
    <div className="container d-flex ">
      <div className="card me-4 mt-2" style={{ width: '300px', height: '380px' }}>
        <div className="card-body">
          <h5 className="card-title">Your Profile</h5>
          <p className="card-text">Trainer Name: {currentUser && currentUser.username}</p>
          <img src={currentUser && currentUser.profileImageUrl} height="200px" width="150px" className="card-img-top" alt="" />
          <p>Pleasure to have you</p>
        </div>
      </div>
      <div className='w-50 mx-auto mt-4'>
        <h1 className='mb-3'>Hello, {currentUser && currentUser.username}</h1>
        <h2>Find Your Allocated Batch Details Here</h2>
        {allocatedBatch ? (
          <div>
            <h3 className='text-success mt-2 mb-3'>You have been Allocated:</h3>
            <p>Cohort Code: {allocatedBatch.cohortNumber}</p>
            <p>Domain: {allocatedBatch.domain}</p>
            <p>Room Number: {allocatedBatch.roomNumber}</p>
            <p>No.of Employees: {allocatedBatch.no_ofEmployees}</p>
          </div>
        ) : (
          <h3 className='text-danger'>You are not allocated to any batch Yet..</h3>
        )}
      </div>
    </div>
  );
}

export default TrainerWelcome;