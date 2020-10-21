require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const { v4: uuid } = require("uuid");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.use(express.json());

const addresses = [
  {
    id: "UUID",
    firstName: "String",
    lastName: "String",
    address1: "String",
    address2: "String",
    city: "String",
    state: "String",
    zip: "Number",
  },
];

app.get("/address", (req, res) => {
  res.send(addresses);
});

app.post("/address", (req, res) => {
  const {
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
  } = req.body;

  console.log(req.body);
  //validations
  if (!firstName) {
    return res.status(400).send("first name required");
  }
  if (!lastName) {
    return res.status(400).send("last name required");
  }
  if (!address1) {
    return res.status(400).send("address required");
  }
  if (!city) {
    return res.status(400).send("city required");
  }
  if (!state) {
    return res.status(400).send("state required");
  }
  if (!zip) {
    return res.status(400).send("zip code required");
  }

  if (state.length !== 2) {
    return res.status(400).send("state should be 2 characters");
  }

  if (zip.length !== 5) {
    return res.status(400).send("zip code should be 5 digits long");
  }

  const id = uuid();
  const newContacts = {
    id,
    firstName,
    lastName,
    address1,
    address2,
    city,
    state,
    zip,
  };

  addresses.push(newContacts);
  res
    .status(201)
    .location(`http://localhost:8000/address/${id}`)
    .json({ id: id });
  res.send("POST received");
});

app.delete("/", (req, res) => {
  res.send("deleted");
});

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "product") {
    response = { error: { message: "server error" } };
  } else {
    console.log(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
