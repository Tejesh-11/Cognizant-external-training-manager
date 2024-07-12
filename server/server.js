// Import required modules
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// Enable CORS with specific origins and credentials
const corsOptions = {
  origin: ["https://extrernaltrainer-frontend.vercel.app/"], 
  methods: ["POST","GET"],
  credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Import API routes
const userRouter = require('./APIs/user-api');
const batchRouter = require('./APIs/batch-api');

// Use the imported API routes
app.use('/user-api', userRouter);
app.use('/batch-api', batchRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: "An error occurred", payload: err.message });
  console.error(err);
});

// Assign port number from environment variable or default to 2000
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Web server listening on port ${PORT}`));
