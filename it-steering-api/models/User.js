const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    admin: Boolean,
    projects: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'projects'
    }]
});

module.exports = mongoose.model("users", userSchema);