const mongoose = require('mongoose');
const userSchema = require('./user.schema.server');

const userModel = mongoose.model('UserModel', userSchema);

findAllUsers = () =>
    userModel.find();

findUserByCredentials = (username, password) =>
    userModel.findOne({username: username, password: password});

findUserById = userId =>
    userModel.findById(userId)
findUserByUsername = username => {
    console.log(username)
   return(userModel.find({username: username}));
}
findUserByIdExpanded = userId =>
    userModel
        .findById(userId)
        .populate('sections')
        .exec()
registerUser = user =>
    userModel.create(user)
        .then(() => findUserByUsername(user.username))

updateUser = (past, next) => {
    return (userModel.update({_id: past._id}, {
        username: next.username,
        password: next.password,
        firstName: next.firstName,
        lastName: next.lastName,
        sections: next.sections
    }, function (err, affected, resp) {
        console.log(rest);
    }));
};

deleteUser = user => userModel.remove({_id: user._id})

addSection = (user, section) => {
    var newSections = next.sections.push(section)
    userModel.update({_id: user._id}, {
        username: next.username,
        password: next.password,
        firstName: next.firstName,
        lastName: next.lastName,
        sections: newSections
    })
}

findSectionsForStudent = student => userModel.find({_id: student._id})
    .then(user => user.sections)

removeSection = (student, section) => {
    var secs;
    userModel.find({_id: student._id})
        .then(user => {
            secs = user.sections;
            if (secs) {
                var newS = secs.filter((a) => {return a._id !== section._id});
                userModel.update({_id: student._id}, {
                    username: next.username,
                    password: next.password,
                    firstName: next.firstName,
                    lastName: next.lastName,
                    sections: newS
                })
                return true;

            } else {
                return false;
            }
        })

}

module.exports = {
    findUserByIdExpanded,
    deleteUser,
    findUserByUsername,
    findUserById,
    findAllUsers,
    registerUser,
    updateUser,
    findUserByCredentials,
    registerUser,
    addSection,
    findSectionsForStudent,
    removeSection
};