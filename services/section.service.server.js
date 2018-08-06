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

    findAllSections = (req, res) => {
        sectionModel.findAllSections()
            .then(response => res.send(response));
    }

    sectionEnroll = (req, res) => {
        const currentUser = req.session['currentUser'];
        sectionModel
            .enroll(currentUser._id, req.params['sectionId'])
            .then(status => res.sendStatus(200))
    }

    app.put('/api/section/:sectionId/enroll', sectionEnroll)
    app.get('/api/section', findAllSections)
    app.get('/api/course/:cid/section', findSectionsForCourse)
    app.post('/api/section', createSection)
}