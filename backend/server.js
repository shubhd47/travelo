const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const Travel = require("./models/travel");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/travel", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
    process.exit();
  });

app.use(bodyParser.json());
app.use(cors());

app.post("/api/newTravel", (req, res) => {
    
  const travel = new Travel({
    name: req.body.name,
    address: req.body.address,
    destination: req.body.destination,
    numberOfTraveler: parseInt(req.body.travelerCount),
  });
  travel
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Travel Added!",
        result: result,
      });
    })
    .catch((error) => {
        console.log('error-',error)
      res.status(401).json({
        message: "Error Occured",
        error: error,
      });
    });
});

app.get("/api/getTravel/:id", (req, res) => {
  Travel.findById(req.params.id)
    .then((result) => {
      res.status(200).json({
        message: "Travel fetched successfully",
        result: result,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "Error Occured",
        error: error,
      });
    });
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
