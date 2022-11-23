const express = require("express");
const router = express.Router();


const profileController = require('../controller/profile.controller');

router.post("/create", profileController.create); 
router.get("/get", profileController.get)
router.get("/:userid", profileController.view)




module.exports = router; 