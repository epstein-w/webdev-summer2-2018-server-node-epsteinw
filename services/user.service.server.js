module.exports = app => {

    const userModel = require('../models/user/user.model.server');

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
        if(currentUser) {
            userModel.findUserByIdExpanded(currentUser._id)
                .then(user => res.send(user))
        } else {
            res.sendStatus(403)
        }
    }

    register = (req, res) => {
        const newUser = req.body;
        if (!userModel.findUserByUsername(newUser.username)) {
            console.log('duplicate');
            res.send(null);
        } else {
            userModel.registerUser(newUser)
                .then( user => req.session['currentUser'] = user)
                .then(res.send(req.session))
        }
    }
    app.get ('/currentUser', currentUser);
    app.get ('/api/user', findAllUsers);
    app.post('/login', login);
    app.post('/register', register)
};