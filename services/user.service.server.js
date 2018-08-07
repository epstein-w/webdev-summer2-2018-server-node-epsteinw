module.exports = app => {

    const userModel = require('../models/user/user.model.server');
    const sectionModel = require('../models/section/section.model.server')

    findAllUsers = (req, res) =>
        userModel.findAllUsers()
            .then(users => {
                res.send(users);
            });

    login = (req, res) => {
        const user = req.body;
        userModel.findUserByCredentials(user.username, user.password)
            .then(user => {
                req.session['currentUser'] = user;
                res.send(req.session['currentUser']);
            });
    };

    currentUser = (req, res) => {
        const currentUser = req.session['currentUser'];
        console.log("U:" + currentUser.username);

        if(currentUser) {
            userModel.findUserByUsername(currentUser.username)
                .then((foundUser) => {
                    console.log(foundUser)
                    res.send(foundUser);
                })
            // userModel.findUserByUsername(currentUser.usernamme)
            //     .then(user => findUserByIdExpanded(user._id)
            //         .then(suser => {
            //             console.log(suser);
            //             res.send(suser)
            //         }))

        } else {
            res.sendStatus(403)
        }
    }

    register = (req, res) => {
        const newUser = req.body;
        if (!userModel.findUserByUsername(newUser.username)) {

            res.send(null);
        } else {
            userModel.registerUser(newUser)
                .then( user => {

                    req.session['currentUser'] = newUser

                })
                .then(() => res.send(req.session['currentUser']))
        }
    }
    logout = (req, res) => {
        const curUser = req.session['currentUser'];
        if (curUser) {
            req.session.destroy();
            res.sendStatus(200);
        } else {
            res.sendStatus(403)
        }
    }


    profile = (req, res) => {
        const curUser = req.session['currentUser'];
        if (curUser) {
            userModel.findUserByUsername(curUser.username)
                .then(user => res.send(user))
        } else {
            res.sendStatus(403);
        }
    }

    updateProfile = (req, res) => {
        var curUser = req.session['currentUser'];
        var nextUser = req.body;
        if (curUser) {
            userModel.findUserByUsername(curUser.username)
                .then(user => {
                    userModel.updateUser(user, nextUser)
                        .then( t => res.send(t));

                })
        } else {
            res.sendStatus(403);
        }
    }


    deleteUser = (req, res) => {
        const curUser = req.session['currentUser'];
        if (curUser) {
            userModel.findUserByUsername(curUser.username)
                .then(user => userModel.deleteUser(user)
                    .then(r => res.sendStatus(200)));

        } else {
            res.sendStatus(403);
        }
    }



    studentEnroll = (req, res) => {
        const curUser = req.session['currentUser'];
        if (curUser) {
            sectionModel.findSectionById(req.params['sid'])
                .then(section => {
                    if (section.capacity > 0) {
                        sectionModel.decrement(section)
                            .then(cap => {
                                if (cap >= 0) {
                                    userModel.addSection(curUser, section)
                                        .then(r => {
                                            res.send(user);
                                        })
                                } else {
                                    res.sendStatus(403);
                                }
                            })
                    } else {
                        res.sendStatus(402);
                    }
                })
        } else {
            res.sendStatus(405);
        }
    }

    getSectionsForUser = (req, res) => userModel.findSectionsForStudent(req.params['sid'])
        .then(sections => res.send(sections))


    deleteSectionFromUser = (req, res) => {
        const curUser = req.session['currentUser'];
        if (curUser) {
            sectionModel.findSectionById(req.params['sid'])
                .then(section => {
                        sectionModel.increment(section)
                            .then(cap => {
                                userModel.removeSection(curUser, section)
                                    .then(r => {
                                        if (r) {
                                            res.send(user);
                                        } else {
                                            res.sendStatus(403);
                                        }
                                    })
                            })

                })
        } else {
            res.sendStatus(405);
        }
    }



    app.get('/profile', profile);
    app.get ('/currentUser', currentUser);
    app.get ('/api/user', findAllUsers);
    app.post('/login', login);
    app.post('/register', register);
    app.post('/logout', logout);
    app.put('/profile', updateProfile);
    app.delete('/profile', deleteUser);




    app.post('/api/student/:sid/section/kid', studentEnroll);
    app.get('/api/student/:sid/section', getSectionsForUser);
    app.delete('/api/student/:sid/section/:kid', deleteSectionFromUser);
}