//mongo database for warning system

const mongoose = require('mongoose');

const warnSchema = mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  warns:{
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('warnings', warnSchema);