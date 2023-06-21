const mongoose = require('mongoose');

const errorLogSchema = mongoose.Schema({
    status: {
        type: Number
    },
    message: {
        type: String
    },
    stackTrace: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('errorLog', errorLogSchema);