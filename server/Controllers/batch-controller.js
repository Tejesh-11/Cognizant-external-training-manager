const {Coach}=require("../db");
const {Batch}=require("../db")


//get batches
const getBatches = async (req, res) => {
    const batches = await Batch.find();
    res.status(200).send({ message: 'Success', payload: batches });
};
  


//allocate batch
const allocateBatch =async(req,res)=>{
    const{username,batch}=req.body;
    const {trainer}=batch;
    const coach=await Coach.findOneAndUpdate(
      {username:username},
      {$push:{allocatedbatches:{...batch,trainer:trainer}}},
      {new:true}//returns updated document
    );
    res.status(200).send({ message: "batch is allocated", payload: coach.allocatedbatches });
}
  

//deallocate batch
const deallocateBatch=async(req,res)=>{
    const{username,batch}=req.body;
    
    const coach=await Coach.findOneAndUpdate(
      {username:username},
      {$pull:{allocatedbatches:batch}},
      {new:true}
    );
    const nonallocatedbatches=await Batch.find({_id:{$nin:coach.allocatedbatches}})
    res.status(200).send({ message: "batch is deallocated", payload: nonallocatedbatches });
}
  

//list of allocated batches 
const getAllocatedBatches=async(req,res)=>{
    const {username}=req.params;
    const coach=await Coach.findOne({username:username});
    res.status(200).send({ message: "allocated batches Retrieved", payload: coach.allocatedbatches });
}


//list of non-allocated batches
const getNonAllocatedBatches=async(req,res)=>{
    const {username}=req.params;
    const coach=await Coach.findOne({username:username});
    const nonallocatedbatches=await Batch.find({_id:{$nin:coach.allocatedbatches}})
    res.status(200).send({ message: "non allocated batches Retrieved", payload: nonallocatedbatches });
}



//Trainer to get batch details
const getBatchDetails=async(req,res)=>{
    const {username}=req.params;
    const coach= await Coach.findOne()
    const batchdetails=coach.allocatedbatches.find(batch=>batch.trainer===username);
    if(!batchdetails){
      return res.status(404).send({message:"No batch is allocated yet..",payload:null})
    }
    res.status(200).send({message:"Allocated batch details",payload:batchdetails});
}
  





//delete batch

const deleteBatches=async(req,res)=>{
    const {username,batch}=req.body;
  
    const coach=await Coach.findOne({username});
    const index=coach.allocatedbatches.findIndex(b=>b===batch._id);
    coach.allocatedbatches.splice(index,1);
    await coach.save();
    res.send({message:"deleted batch"})
}
 




//export
module.exports = {getBatchDetails,getBatches,allocateBatch,deallocateBatch,getAllocatedBatches,getNonAllocatedBatches,deleteBatches};