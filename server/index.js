const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors({
    origin: [
        "https://localhost:3000"
    ]
}))

const PORT = 3180;
const mongodbPassword = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://vnFuhung2903:${mongodbPassword}@vnfuhung2903.45t0xd8.mongodb.net/it3180`;

app.listen(PORT, async () => {
    await mongoose.connect(uri);
    console.log("MongoDb connected");
})