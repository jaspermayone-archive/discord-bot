const mongoose = require('mongoose')
const { MongoDB } = require('../config.json')

const warnSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    warnings: {
        type: [Object],
        required: true
    },
    maxWarnings: {
        type: Number,
        default: '10'
    },
    action:{
        type:String,
        default: 'ban'
    }
})

module.exports = mongoose.model('warnings', warnSchema)