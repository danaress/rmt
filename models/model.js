var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: { type: Number, required: true, unique: false },
    messages: [{
    messageDate: { type: String, required: true },
    message: { type: String, required: true, default: 0 }
}]

});

module.exports = mongoose.model('users', userSchema)