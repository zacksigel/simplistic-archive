const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {type: String, required: false},
    description: {type: String, required: false},
    dateLastPerformed: {type: String, required: false},
    dueDate: {type: String, required: false},
    priority: {type: String, required: false},
    completed: {type: String, required: false}
})

module.exports = mongoose.model("Item", itemSchema)