/**
 * Created by luch on 4/20/16.
 */
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

var Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;

module.exports.getTags = function (callback, limit) {
    Tag.find(callback).limit(limit);
};

module.exports.getTagById = function (id, callback) {
    Tag.findById(id, callback);
};

module.exports.insertTag = function (tag, callback) {
    Tag.create(tag, callback);
};

module.exports.updateTag = function (id, tag, callback) {
    var query = {_id: id};
    var update = tag;
    Tag.findOneAndUpdate(query, update, callback);
};

module.exports.removeTag = function (id, callback) {
    var query = {_id: id};
    Tag.remove(query, callback);
};