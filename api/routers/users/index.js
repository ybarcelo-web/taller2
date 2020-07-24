const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/users');

router.route('/')
    .get(controller.getAll)
    .post(controller.newUser);    

router.route('/:id')
    .get(controller.getUser)
    .put(controller.updateUser)
    .delete(controller.deleteUser);

router.route('/tweets/count/:id')
    .get(controller.countTweets);

router.route('/:id/tweets/')
    .get(controller.listTweets);

module.exports = router;