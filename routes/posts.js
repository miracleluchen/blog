/**
 * Created by luch on 4/20/16.
 */
var express = require('express');
var helpers = require('../middlewares/helpers');
// load the auth variables

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

router.get("/", function (req, res) {

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

router.get("/:_id", function (req, res) {
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


router.post("/", helpers.isLogin, function (req, res) {
    var post = req.body;
    Post.insertPost(post, function (err, post) {
        if (err) {
            res.send(err);
        }
        res.json(post);
    });
});

router.put("/:_id", helpers.isLogin, function (req, res) {
    var update = req.body;
    update.updateDate = new Date();
    Post.updatePost(req.params._id, update, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({"post": update});
    })
});

router.delete("/:_id", helpers.isLogin, function (req, res) {
    Post.removePost(req.params._id, function (err) {
        if (err) {
            res.send(err);
        }
        res.json({"ret": 0});
    })
});

module.exports = router;