const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "https://localhost:3000"
    ]
}))

const PORT = 3180;
const uri = process.env.MONGODB_URI;

app.listen(PORT, async () => {
    await mongoose.connect(uri);
    console.log("MongoDb connected");
})