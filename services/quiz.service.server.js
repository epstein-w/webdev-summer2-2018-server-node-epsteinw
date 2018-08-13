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


    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz)
}
