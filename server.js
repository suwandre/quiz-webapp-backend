require('dotenv').config();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

app.listen(port, async () => {
    console.log(`Server is running on port: ${port}`);
    await mongoose.connect(mongoURI);
});