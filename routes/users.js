/**
 * Created by luch on 4/20/16.
 */
var express = require('express');
var router = express.Router();

router.post("/", function (req, res) {
    console.log("Add Users");
});

router.put("/:_id", function (req, res) {
    console.log("Update Users");
});

router.delete("/:_id", function (req, res) {
    console.log("Delete Users");
});

module.exports = router;