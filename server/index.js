require('dotenv').config();
const express = require('express');
const cors = require('cors');

//Setup database
const database = require("./config/database.config.js")
database.connect();

const routeApi = require("./routes/index.route.js");
const app = express();
app.use(express.json());

const port = process.env.PORT;
app.use(cors({
    origin: [
        "https://localhost:3000"
    ]
}))

routeApi(app);

app.listen(port, () => {
   console.log(`App is listening on port ${port}`)
})