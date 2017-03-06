var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: { type: Number, required: true, unique: false },
    messageTime: { type: Date, required: true },
    message: { type: String, required: false, default: 0 },
});

module.exports = mongoose.model('users', userSchema)