const express = require("express");
const Item = require("./models/item");
const data = require("./data");
const blankline = require("./blankline");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
var $ = require("jquery")

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

app.put("/notes/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body, (err, updatedItem) => {
        console.log("cell updated")
        res.redirect("/notes")
    });
});

app.post("/notes/:id", (req, res) => {
    Item.findByIdAndUpdate(req.params.id, {name: req.query.name}, (err, updatedItem) => {
        console.log("task edited app.post")
        console.log(req.query.name)
        res.redirect("/notes")
    });
});

// Create

app.post("/notes", (req, res) => {
    Item.create(blankline, (err, items) => {
        console.log("add new button clicked")
        console.log(items)
        res.redirect("/notes");
    });

});

// Edit - NA

// Show - NA

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})