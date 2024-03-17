const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    projects: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'projects',
    }]
});

userSchema.pre('save', async function(next){
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

module.exports = mongoose.model("users", userSchema);