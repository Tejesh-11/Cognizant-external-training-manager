import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    // Fetch trainers data from backend
    const fetchTrainers = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/user-api/trainers`); 
        setTrainers(response.data.payload.map(trainer => ({ ...trainer, showMoreInfo: false }))); 
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  const toggleMoreInfo = (index) => {
    const updatedTrainers = [...trainers];
    updatedTrainers[index].showMoreInfo = !updatedTrainers[index].showMoreInfo;
    setTrainers(updatedTrainers);
  };

  
  return (
    <div className="container mt-3">
      <div className="row">
        {trainers.map((trainer, index) => (
          <div key={trainer._id} className="col-lg-3 col-md-5 col-sm-6 mb-4">
            <div className="card text-white" style={{backgroundColor:"#1E728C"}}>
              <div className='card-header'>
                <img src={trainer.profileImageUrl} height="200px" width="150px" className="card-img-top" alt="" />
                <h5 className="card-title mt-2"><span className="bi bi-person-fill fs-7"> {trainer.username}</span></h5>
              </div>
              <div className="card-body">
                <div className='card-text bg-tertiary mb-2'>
                  {trainer.showMoreInfo && (
                    <>
                      <span className="bi bi-terminal-plus  text-white fs-7"></span>  {trainer.experience}<br></br>
                      <span className="bi bi-envelope-at-fill text-white fs-7"></span>  {trainer.email}<br></br>
                      <span className="bi bi-gear-fill text-white fs-7"></span>  {trainer.skills}<br></br>
                      <span className="bi bi-telephone-fill text-white fs-7"></span>  {trainer.phno}<br></br>
                    </>
                  )}
                </div>
                
                <button onClick={() => toggleMoreInfo(index)} className="btn" style={{backgroundColor:"white",color:"black"}}>{trainer.showMoreInfo ? "View Less" : "View More"}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trainers;
