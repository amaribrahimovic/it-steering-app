const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true
    },
    businessImpact: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    status: String
});

module.exports = mongoose.model("projects", projectSchema);