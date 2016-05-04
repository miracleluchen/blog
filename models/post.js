/**
 * Created by luch on 4/20/16.
 */
var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    bodyDes: {type: String, required: true},
    author: {type: String, required: true},
    createDate: {type: Date, default: Date.now},
    updateDate: {type: Date, default: Date.now},
    tags: [String],
    view: Number
});

var Post = mongoose.model('Post', postSchema);
module.exports = Post;

module.exports.getPosts = function (callback, limit, category) {
    var query = {tags: category};
    if (category == 'all') {
        Post.find(callback).sort({createDate: -1}).limit(limit);
    } else {
        Post.find(query, callback).sort({createDate: -1});
    }
};

module.exports.getPostById = function (id, callback) {
    var query = {_id: id};
    Post.findById(id, callback);
};

module.exports.searchPosts = function (keyword, callback) {
    var query = {title: new RegExp(keyword, 'i')};
    Post.find(query, callback);
};

module.exports.insertPost = function (post, callback) {
    Post.create(post, callback);
};

module.exports.updatePost = function (id, post, callback) {
    var query = {_id: id};
    var update = post;
    Post.findOneAndUpdate(query, update, callback);
};

module.exports.removePost = function (id, callback) {
    var query = {_id: id};
    Post.remove(query, callback);
};