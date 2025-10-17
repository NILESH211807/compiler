const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
    shareId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: false,
    // },
    language: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Share = mongoose.model('share', shareSchema);
module.exports = Share;