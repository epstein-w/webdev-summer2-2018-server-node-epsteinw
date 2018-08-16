module.exports = app => {
    const questionModel = require('../models/quizzes/question.model.server')

    createQuestion = (req, res) => {
       console.log(req.body);
        questionModel
            .createQuestion(req.body)
            .then(
                question => {
                    // console.log(question);
                    res.json(question);
                },
                error => res.send(error))
    }






    app.post('/api/question', createQuestion)
}