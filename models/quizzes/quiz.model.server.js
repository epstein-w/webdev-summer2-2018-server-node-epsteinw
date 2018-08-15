const mongoose = require('mongoose')
const quizSchema = require('./quiz.schema.server')
const quizModel = mongoose.model('QuizModel', quizSchema)

createQuiz = quiz =>
    quizModel.create(quiz)

findAllQuizzes = () =>
    quizModel.find()

findQuizById = quizId =>
    quizModel.findById(quizId)
        .populate('questions')
        .exec()

updateQuiz = (quizId, quiz) =>
    quizModel.update({_id: quizId}, {
        $set: quiz
    })

deleteQuiz = quizId =>
    quizModel.remove({_id: quizId})

addQuestion = (quizId, questionId) =>
    quizModel.update({_id: quizId}, {
        $push: {questions: questionId}
    })

addSubmission = (quizId, submission) =>
    quizModel.update({_id: quizId}, {
        $push: {submissions: submission}
    })


module.exports = {
    createQuiz,
    findAllQuizzes,
    findQuizById,
    updateQuiz,
    deleteQuiz,
    addQuestion,
    addSubmission
}