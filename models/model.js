var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    number: { type: Number, required: false, default: 0 },
    time: { type: String, required: false, default: null },
    start: { type: Date, default: Date.now()},
    habit1: { type: String, required: false, default: '' },
    habit2: { type: String, required: false, default: '' },
    habit3: { type: String, required: false, default: '' },
    array1: { type: Array, required: false },
    array2: { type: Array, required: false },
    array3: { type: Array, required: false },
});

module.exports = mongoose.model('users', userSchema)