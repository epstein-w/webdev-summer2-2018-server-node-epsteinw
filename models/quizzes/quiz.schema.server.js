const mongoose = require('mongoose')
module.exports = mongoose.Schema({
    title: String,
    submissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubmissionsModel'
    }],
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionModel'
    }]
}, {collection: 'quiz'});