require('dotenv').config();
const express = require('express');
const cors = require('cors');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
//Setup database
const database = require("./config/database.config.js")
database.connect();

const routeApi = require("./routes/index.route.js");
const app = express();
app.use(express.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }))

const port = process.env.PORT;
app.use(cors({
    origin: [
        "http://localhost:3000"
    ]
}))

routeApi(app);

app.listen(port, () => {
   console.log(`App is listening on port ${port}`)
})