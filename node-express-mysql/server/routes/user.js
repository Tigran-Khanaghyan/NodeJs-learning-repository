const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.find)
router.get('/adduser', userController.form)
router.post('/adduser', userController.create)
router.get('/', userController.view)



module.exports = router
