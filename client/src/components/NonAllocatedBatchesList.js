import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';

const NonAllocatedBatchesList = () => {
  
  const [trainers,setTrainers]=useState([]);
  const [batches,setBatches]=useState([]);

  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const currentUser = useSelector((state) => state.login.currentUser);
  
  
   

  useEffect(() => {
    axios.get(`https://externaltrainer-backend.vercel.app/nonallocatedbatches/${currentUser.username}`)
      .then((res) => {
        setBatches(res.data.payload);
      })
      .catch((err) => console.log(err));

    axios.get(`https://externaltrainer-backend.vercel.app/user-api/trainers`)
      .then((res) => {
        setTrainers(res.data.payload);
      })
      .catch((err) => console.log(err));
  }, []);
  

  const handleSelectTrainer = (batchId, trainerId) => {
    setSelectedTrainers(prevState => ({ ...prevState, [batchId]: trainerId }));
  };
  

  const allocateBatch= async (batch)=>{
    const selectedTrainerId=selectedTrainers[batch.id];
    
    await axios.put(`http://localhost:2000/batch-api/allocate`,{
      username:currentUser.username,
      batch:{...batch,trainer:selectedTrainerId}
    });
    setBatches(prevBatches=>prevBatches.filter(i=>i.id!==batch.id))
    toast.success("Batch Allocated Successfully !");
  }


  return (
    <div style={{overflowX:'auto'}}>
      <h2 className='text-danger text-center'>Trainer Non-Allocated Batches</h2>
      <table className='table table-bordered' style={{ width: '95%' }}>
        <thead>
          <tr>
            <th>Cohort Code</th>
            <th>Domain</th>
            <th>Room Number</th>
            <th>No. of Employees</th>
            <th>Available Trainers</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch) => (
            <tr key={batch.id}>
              <td>{batch.cohortNumber}</td>
              <td>{batch.domain}</td>
              <td>{batch.roomNumber}</td>
              <td>{batch.no_ofEmployees}</td>
              <td>
                <select value={selectedTrainers[batch.id] || ''} onChange={(e) => handleSelectTrainer(batch.id, e.target.value)} style={{width:"160px"}}>
                  <option value="">Select Trainer</option>
                  {batch.domain && trainers
                    .filter(trainer => trainer.skills.includes(batch.domain))
                    .map((trainer) => (
                      <option key={trainer.id} value={trainer.id}>{trainer.username}</option>
                    ))}
                </select>
              </td>
              <td>
                <button className='btn btn-success btn-sm' onClick={() => allocateBatch(batch)} disabled={!selectedTrainers[batch.id]}>Allocate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NonAllocatedBatchesList;

