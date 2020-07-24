const express = require('express');
const router = express.Router();
const controller = require('./../../controllers/tweets');

router.route('/')
    .get(controller.getTweets)
    .post(controller.newTweet);    

router.route('/comment')
    .post(controller.newComment);
router.route('/:id')
        .get(controller.getTweet)
        .delete(controller.deleteTweet);

router.route('/lasts/:nf')
        .get(controller.getLastsTweets);
router.route('/:id/comments/count')
        .get(controller.getCommentsCount);
module.exports = router;