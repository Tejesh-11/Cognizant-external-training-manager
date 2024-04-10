const exp = require("express");
const router1 = exp.Router();

const expressAsyncHandler = require("express-async-handler");

//import req handlers from Controller
const {allocateBatch, deallocateBatch, getAllocatedBatches, getNonAllocatedBatches,getBatches, deleteBatches, getBatchDetails} = require("../Controllers/batch-controller");

//batches related api's

router1.get("/batches",expressAsyncHandler(getBatches))
router1.put("/allocate",expressAsyncHandler(allocateBatch));
router1.put("/deallocate",expressAsyncHandler(deallocateBatch));
router1.get("/allocatedbatches/:username",expressAsyncHandler(getAllocatedBatches));
router1.get("/nonallocatedbatches/:username",expressAsyncHandler(getNonAllocatedBatches));
router1.delete("/deletebatch",expressAsyncHandler(deleteBatches))


//get batch details for trainers
router1.get("/batchdetails/:username",expressAsyncHandler(getBatchDetails));


module.exports = router1;