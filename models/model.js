var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    time: { type: Number, required: false },
    start: { type: Date, default: Date.now},
    habit1: { type: String, required: false },
    habit2: { type: String, required: false },
    habit3: { type: String, required: false }
});

module.exports = mongoose.model('user', userSchema)