module.exports = app => {
    const quizModel = require('../models/quizzes/quiz.model.server')
    const submissionModel = require('../models/quizzes/submission.model.server')
    const userModel = require('../models/user/user.model.server')
    createQuiz = (req, res) => {
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz))
    }

    findAllQuizzes = (req, res) => {
        quizModel.findAllQuizzes()
            .then(q =>  res.send(q))

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


    submitQuiz = (req, res) => {
        const currentUser = req.session['currentUser'];
        console.log("ENTERING SUBMISSIONS!!!\n\n\n\n\n");

        if(currentUser) {
            userModel.findUserById(currentUser._id)
                .then(user =>
                quizModel.findQuizById(req.params.qid)
                    .then(quiz =>  submissionModel.createSubmission({
                                    student: user,
                                    quiz: quiz,
                                    answers: req.body.questions
                                }).then( response => {
                                        if (response) {
                                            // console.log("response" + response);
                                            // var qq = quiz.submissions.push(response);
                                            // console.log("quizSub");
                                            // console.log(quiz.submissions);
                                            quizModel.addSubmission(req.params.qid, response)
                                            .then( r => {
                                                console.log("r")
                                                console.log(r);
                                                res.send(response)
                                            });

                                }}

                            )
                    ))
        } else {
            res.sendStatus(300)
        }



    }


    getAllSubmissionsForQuiz = (req, res) =>
        submissionModel.findAllSubmissionsForQuiz(req.params.qid)
            .then(r => res.send(r))


    findSubmissionsForQuiz = (req, res) => submissionModel.findSubmissionsForQuiz(req.params.qid, req.params.sid)
        .then(r => res.send(r))


    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/:qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('/api/quiz/:qid/question/:questionId', addQuestion)
    app.post('/api/quiz/:qid/submission', submitQuiz)
    app.get('/api/quiz/:qid/submission', getAllSubmissionsForQuiz)
    app.get('/api/quiz/:qid/submission/:sid', findSubmissionsForQuiz)
}
