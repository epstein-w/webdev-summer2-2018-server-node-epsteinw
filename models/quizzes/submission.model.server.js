const mongoose = require('mongoose');
const schema = require('./submission.schema.server');
const  model = mongoose.model('SubmissionModel', schema);


createSubmission =  submission =>
    model.create(submission)

findAllSubmissions = () => model.find()

findAllSubmissionsForStudent = studentId => model.find({student: studentId})


findAllSubmissionsForQuiz = quizId =>
    model.find({quiz: quizId})
        .populate('student')
        .exec()

findSubmissionsForQuiz = (quizId, sid) =>
    model.find({_id: sid})
        .populate('answers')
        .exec()


module.exports = {
    createSubmission,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz,
    findSubmissionsForQuiz
}