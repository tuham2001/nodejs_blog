const express = require('express');
const router = express.Router();
const restrict = require('../middlewares/auth')
const checkAdmin = require('../middlewares/checkAdmin')

const meController = require('../app/controllers/MeController');

router.get('/stored/courses', restrict, checkAdmin, meController.storedCourses);
router.get('/trash/courses', meController.trashCourses);

module.exports = router;
