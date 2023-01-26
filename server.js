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

db.on("connected", () => console.log("connected to mongo"));
db.on("error", (err) => console.log(err.message + "mongo not connected"));

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

// Seed Route

app.get("/notes/seed", (req, res) => {
    Item.deleteMany({}, (err, results) => {
        Item.create(data, (err, items) => {
            res.redirect("/notes");
        });
    });
});

// Index

app.get("/", (req, res) => {
    res.redirect("/notes");
});

app.get("/notes", (req, res) => {
    Item.find({}, (err, allItems) => {
        res.render("index.ejs", {
            items: allItems
        });
    });
});

// New - NA 

// Delete

app.delete("/notes/:id", (req, res) => {
    Item.findByIdAndDelete(req.params.id, (err, deletedItem) => {
        res.redirect("/notes");
    });
});

// Update

app.post("/notes/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, (err, updatedItem) => {
        res.redirect("/notes")
    });
});

// Create

app.post("/notes", (req, res) => {
    Item.create(req.body, (err, newItem) => {
        res.redirect("/notes")
    });
});

// Edit - NA

// Show - NA

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})