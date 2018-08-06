const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    title: String,
    capacity: Number,
    courseId: String
}, {collection: 'section'});