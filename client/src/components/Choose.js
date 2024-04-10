import React, { useState} from 'react';
import Welcome from './Welcome';
import NonAllocatedBatchesList from './NonAllocatedBatchesList';
import AllBatchesList from './AllBatchesList';
import AllocatedBatches from './AllocatedBatches';

function Choose() {
  const [selectedOption, setSelectedOption] = useState('Select Batches');
  
  
  return (
    <div className='container mt-4'>
      <label className="mb-2" htmlFor='batchOptions'><b>Select Batch Type:</b></label>&ensp;
      <select id='batchOptions' style={{ width: "200px" }} value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
        <option value='Select Batches'>Select Batches</option>
        <option value='Allocated Batches'>Trainer Allocated Batches</option>
        <option value='Non-Allocated Batches'>Trainer Non-Allocated Batches</option>
        <option value='AllBatchesList'>All Batches List</option>
      </select>

      {selectedOption === 'Select Batches' && (
        <Welcome />
      )}

      {selectedOption === 'Allocated Batches' && (
        <AllocatedBatches  />
      )}

      {selectedOption === 'Non-Allocated Batches' && (
        <NonAllocatedBatchesList  />
      )}

      {selectedOption === 'AllBatchesList' && (
        <AllBatchesList />
      )}
    </div>
  );
}

export default Choose;
