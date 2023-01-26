const express = require("express");
const Item = require("./models/item");
const data = require("./data");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT;
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_URL);
const db=mongoose.connection;