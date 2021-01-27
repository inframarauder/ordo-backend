require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const Db = require("./configs/Db");

//init express app
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));

//connect to DB:
Db.createConnection();

//configure root endpoint to check if server is up
app.get("/", (req, res) => {
	return res.sendStatus(200);
});

//start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
