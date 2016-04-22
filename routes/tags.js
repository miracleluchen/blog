/**
 * Created by luch on 4/20/16.
 */
var express = require('express');
var router = express.Router();

var Tag = require('../models/tag');

router.get("/", function (req, res) {
    Tag.getTags(function (err, tags) {
        if (err) {
            res.send(err);
        }
        res.json(tags);
    });
});

router.get("/:_id", function (req, res) {
    Tag.getTagById(req.params._id, function (err, tag) {
        if (err) {
            res.send(err);
        }
        res.json(tag);
    });

});

router.post("/", function (req, res) {
    var tag = req.body;
    Tag.insertTag(tag, function (err, tag) {
        if (err) {
            res.send(err);
        }
        res.json(tag);
    });
});

router.put("/:_id", function (req, res) {
    var update = req.body;
    Tag.updateTag(req.params._id, update, function (err) {
        if (err) {
            res.send(err);
        }
        res.json(update);
    })
});

router.delete("/:_id", function (req, res) {
    Tag.removeTag(req.params._id, function (err) {
        if (err) {
            res.send(err);
        }
        Tag.getTags(function (err, tags) {
            if (err) {
                res.send(err);
            }
            res.json(tags);
        });
    })
});

module.exports = router;