/**
 * Created by luch on 4/21/16.
 */
var express = require('express');
var router = express.Router();

var Post = require('../models/post');

var getTagList = function (posts) {
    var tags = [];
    for (var i = 0; i < posts.length; i++) {
        for (var j = 0; j < posts[i].tags.length; j++) {
            if (tags.indexOf(posts[i].tags[j]) < 0) {
                tags.push(posts[i].tags[j]);
            }
        }
    }
    return tags;
};

router.get("/posts", function (req, res) {
    var limit = req.query.limit || 0;
    var category = req.query.category || 'all';
    Post.getPosts(function (err, posts) {
        if (err) {
            res.send(err);
        }
        Post.getPosts(function (err, allPosts) {
            var tags = getTagList(allPosts);
            res.json({"posts": posts, "tags": tags});
        }, 0, 'all');
    }, limit, category);
});

router.get("/posts/:_id", function (req, res) {
    Post.getPostById(req.params._id, function (err, post) {
        if (err) {
            res.send(err);
        }
        Post.getPosts(function (err, posts) {
            var tags = getTagList(posts);
            res.json({"post": post, "tags": tags});
        }, 0, 'all');
    });

});

router.get("/search/:keyword", function (req, res) {
    Post.searchPosts(req.params.keyword, function (err, searchPosts) {
        if (err) {
            res.send(err);
        }
        Post.getPosts(function (err, posts) {
            var tags = getTagList(posts);
            res.json({"posts": searchPosts, "tags": tags});
        }, 0, 'all');
    });
});
