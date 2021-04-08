const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: string, require: true, unique: true},
    serverID: {type: string, require: true},
    coins: {type: Number, default: 0},
    bank: {type: Number},
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model; 