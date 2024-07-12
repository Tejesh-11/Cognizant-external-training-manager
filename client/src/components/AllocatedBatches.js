import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllocatedBatches = () => {

  const [allocatedBatches, setAllocatedBatches] = useState([]);
  const currentUser = useSelector((state) => state.login.currentUser);
  
  

  useEffect(() => {
    fetchAllocatedBatches();
  }, [currentUser.username]);

  const fetchAllocatedBatches = async () => {
  
    try {
      const res = await axios.get(`https://externaltrainer-backend.vercel.app/batch-api/allocatedbatches/${currentUser.username}`);
      setAllocatedBatches(res.data.payload);
    } catch (error) {
      console.error('Error fetching allocated batches:', error);
      toast.error('Error fetching allocated batches');
    }
  };

  const deallocateBatch = async (batch) => {
    try {
      await axios.put(`https://externaltrainer-backend.vercel.app/batch-api/deallocate`, {
        username: currentUser.username,
        batch: batch
      });
      fetchAllocatedBatches();
      toast.error('Deallocated Successfully !');
    } catch (error) {
      console.error('Error deallocating batch:', error);
      toast.error('Error deallocating batch');
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(12);
    pdf.text('Allocated Batches', 15, 15);

    // Default table headers
    const headers = [['Cohort Code', 'Domain', 'Room Number', 'No. of Employees', 'Selected Trainer']];

    // Default table rows (empty initially)
    const data = [];

    // Add allocatedBatches data to the table
    allocatedBatches.forEach((batch) => {
      const rowData = [
        batch.cohortNumber,
        batch.domain,
        batch.roomNumber,
        batch.no_ofEmployees,
        batch.trainer
      ];
      data.push(rowData);
    });

    // AutoTable configuration
    pdf.autoTable({
      startY: 20, // Start position
      head: headers,
      body: data,
    });

    // Save the PDF
    pdf.save('allocated_batches.pdf');
  };
  

  return (
        <div className="conatiner" style={{ overflowX: 'auto' }}>
          <h2 className='text-success text-center'>Allocated Batches</h2>
          <table className='table table-bordered' style={{ width: '95%' }} >
            <thead>
              <tr>
                <th>Cohort Code</th>
                <th>Domain</th>
                <th>Room Number</th>
                <th>No. of Employees</th>
                <th>Selected Trainer</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allocatedBatches.map((batch) => (
                <tr key={batch.id}>
                  <td>{batch.cohortNumber}</td>
                  <td>{batch.domain}</td>
                  <td>{batch.roomNumber}</td>
                  <td>{batch.no_ofEmployees}</td>
                  <td>{batch.trainer}</td>
                  <td>
                    <button className='btn btn-danger btn-sm' onClick={() => deallocateBatch(batch)}>
                      Deallocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className='btn btn-primary mb-3' onClick={generatePDF}>
            Download PDF
          </button>
        </div>
  );
};

export default AllocatedBatches;
