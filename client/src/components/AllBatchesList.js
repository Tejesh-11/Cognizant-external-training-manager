import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

function AllBatchesList() {
  
  const [allbatches,setAllbatches]=useState([]);

  useEffect(() => {
    axios.get("https://externaltrainer-backend.vercel.app/batch-api/batches")
      .then((res) => {
        setAllbatches(res.data.payload);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div style={{overflowX:'auto'}}>
      <h2 className='text-primary text-center'>All Batches</h2>
      <table className='table table-bordered' style={{ width: '95%' }}>
        <thead>
          <tr>
            <th>CohortCode</th>
            <th>Domain</th>
            <th>Room Number</th>
            <th>No of Employees</th>
          </tr>
        </thead>
        <tbody>
          {allbatches.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.cohortNumber}</td>
              <td>{prod.domain}</td>
              <td>{prod.roomNumber}</td>
              <td>{prod.no_ofEmployees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AllBatchesList;
