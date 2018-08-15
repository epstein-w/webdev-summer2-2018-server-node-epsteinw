module.exports = app => {
    const quizModel = require('../models/quizzes/quiz.model.server')

    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    }

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(q => res.send(q))
    }
    findQuizById  = (req, res) => {
        quizModel.findQuizById(req.params.qid)
            .then(q => res.send(q))
    }
    updateQuiz  = (req, res) => {
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status))
    }
    deleteQuiz  = (req, res) => {
        quizModel.deleteQuiz(req.params.qid)
            .then(r => res.send(r))
    }


    addQuestion = (req, res) => {
        quizModel.addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    }

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion)
}
