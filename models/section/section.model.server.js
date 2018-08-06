const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server')
//crud operations

createSection = section =>
    sectionModel.create(section);

findSectionsForCourse = cid =>
    sectionModel.find({courseId: cid});

findAllSections = () =>
    sectionModel.find();
enroll = (userId, sectionId) =>
    userModel.findUserById(userId)
        .then(user => {
            user.sections.push(sectionId);
            return user.save();
        })

module.exports = {
    createSection,
    enroll,
    findSectionsForCourse,
    findAllSections
};