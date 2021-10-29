const express = require('express');

const router = express.Router();
const restrict = require('../middlewares/auth')

const learningController = require('../app/controllers/LearningController');

// function restrict(req, res, next) {
//   if (!req.session.isAuthenticated) {
//     return res.redirect('/accounts/login')
//   }
//   next()
// }
// router.post('/create', learningController.create);
router.get('/:name', restrict, learningController.show);
router.get('/:name/:id', learningController.lesson);


module.exports = router;
