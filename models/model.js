var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('user', userSchema)


    // time: { type: String, required: true },
    // habit1: { type: String, required: true },
    // habit2: { type: String, required: true },
    // habit3: { type: String, required: true },