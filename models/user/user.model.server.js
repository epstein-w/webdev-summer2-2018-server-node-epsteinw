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
registerUser = user => userModel.create(user);



module.exports = {
    findUserByIdExpanded,
    findUserByUsername,
    findUserById,
    findAllUsers,
    findUserByCredentials,
    registerUser
};