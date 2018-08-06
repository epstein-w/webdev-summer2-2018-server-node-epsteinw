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
sectionEdit = section => {
    // console.log(section);
    var oldSection;
    sectionModel.find({_id: section._id})
        .then(sec => oldSection = sec);
    console.log(sectionModel.find());
    console.log(oldSection)
    // oldSection.title = section.title;
    // oldSection.capacity = section.capacity;
    // console.log(oldSection);
    // return userModel.save(oldSection);

}
deleteSection = section => {
    sectionModel.remove({title: section.title})
        .then(() => res.sendStatus(200));
}

module.exports = {
    createSection,
    sectionEdit,
    deleteSection,
    enroll,
    findSectionsForCourse,
    findAllSections
};