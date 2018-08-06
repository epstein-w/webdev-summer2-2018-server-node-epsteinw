module.exports = app => {

    const sectionModel = require('../models/section/section.model.server')
    createSection = (req, res) => {
        sectionModel.createSection(req.body)
            .then(s => res.send(s))
    }

    findSectionsForCourse = (req, res) => {
        var cid = req.params['cid'];
        sectionModel.findSectionsForCourse(cid)
            .then(s => res.send(s))
    }

    app.get('/api/course/:cid/section', findSectionsForCourse)
    app.post('/api/section', createSection)
}