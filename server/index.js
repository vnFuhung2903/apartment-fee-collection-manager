require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Setup database
const database = require("./config/database.config.js")
database.connect();

const app = express();
app.use(express.json());

const port = process.env.PORT;
app.use(cors({
    origin: [
        "https://localhost:3000"
    ]
}))


app.listen(port, () => {
   console.log(`App is listening on port ${port}`)
})