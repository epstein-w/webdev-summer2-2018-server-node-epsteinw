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
    createSectionForCourse = (req, res) => {
        // if (req.session['currentUser'].role == 'ADMIN') {
            sectionModel.createSection(req.body)
                .then(r => res.send(r));

        // } else {
        //     res.send("not an admin");
        // }

    }

    sectionEdit = (req, res) => {
        sectionModel.sectionEdit(req.body);


    }

    sectionDelete = (req, res) =>
        sectionModel.deleteSection(req.body);

    getSectionById = (req, res) => sectionModel.findSectionById(req.params['id'])
        .then(section => res.send(section))



    app.delete('/api/section', sectionDelete)
    app.put('/api/section', sectionEdit);
    app.get('/api/section/:id', getSectionById);
    app.put('/api/section/:sectionId/enroll', sectionEnroll)
    app.get('/api/section', findAllSections)
    app.get('/api/course/:cid/section', findSectionsForCourse)
    app.post('/api/section', createSection)
    app.post('/api/course/:courseId/section', createSectionForCourse)
}