const express = require("express");
const router = express.Router();


const commentController = require('../controller/comment.controller');

router.post("/", commentController.post); 
router.get("/filter", commentController.filter); 
router.post("/like&unlike", commentController.likeUnlike);




module.exports = router; 