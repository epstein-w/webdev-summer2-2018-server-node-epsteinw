const mongoose = require('mongoose');
const sectionSchema = require('./section.schema.server');

const sectionModel = mongoose.model('SectionModel', sectionSchema);

//crud operations

createSection = section =>
    sectionModel.create(section);

findSectionsForCourse = cid =>
    sectionModel.find({courseId: cid});

module.exports = {
    createSection,
    findSectionsForCourse
};