const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);
const userModel = require('../user/user.model.server')
//crud operations

createSection = section =>
    sectionModel.create(section);

findSectionsForCourse = cid =>
    sectionModel.find({courseId: cid})
        .then(t => {
            var s;
            t.forEach(function(e) {
                sectionModel.find({})
            })
            return t;
        });


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

findSectionById = sectionId =>
    sectionModel.find({_id: sectionId})
decrement = section => {
    sectionModel.update({_id: section._id}, {
        title: section.title,
        capacity: section.capacity - 1,
        courseId: section.courseId
    });
    return sectionModel.find({_id: section._id}).capacity;
}

increment = section => {
    sectionModel.update({_id: section._id}, {
        title: section.title,
        capacity: section.capacity + 1,
        courseId: section.courseId
    });
    return sectionModel.find({_id: section._id}).capacity;
}



module.exports = {
    createSection,
    sectionEdit,
    findSectionById,
    deleteSection,
    enroll,
    findSectionsForCourse,
    findAllSections,
    decrement,
    increment
};