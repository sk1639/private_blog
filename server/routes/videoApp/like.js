const express = require('express');
const router = express.Router();


const { Like } = require('../../models/videoApp/Like');
const { Dislike } = require('../../models/videoApp/Dislike')

router.post('/getLiked', (req, res) => {
    let variable = []
    if (req.body.videoId) {
        variable = { 'videoId': req.body.videoId }
    } else {
        variable = { 'commentId': req.body.commentId }
    }
    Like.find(variable).exec((err, likes) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, likes })
    })

})

router.post('/getDisliked', (req, res) => {
    let variable = []
    if (req.body.videoId) {
        variable = { 'videoId': req.body.videoId }
    } else {
        variable = { 'commentId': req.body.commentId }
    }
    Dislike.find(variable).exec((err, dislikes) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, dislikes })
    })

})


//좋아요
router.post('/upLike', (req, res) => {
    let variable = []
    if (req.body.videoId) {
        variable = { 'videoId': req.body.videoId, userId: req.body.userId }
    } else {
        variable = { 'commentId': req.body.commentId, userId: req.body.userId }
    }

    const like = new Like(variable)
    like.save((err, result) => {
        if (err) return res.json({ success: false, err })

        Dislike.findOneAndDelete(variable).exec((err, dislikeResult) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
    })
})


//좋아요제거
router.post('/unLike', (req, res) => {
    let variable = []
    if (req.body.videoId) {
        variable = { 'videoId': req.body.videoId, userId: req.body.userId }
    } else {
        variable = { 'commentId': req.body.commentId, userId: req.body.userId }
    }

    Like.findOneAndDelete(variable).exec((err, unlikeResult) => {
        if (err) return res.status(400).json({ success: false, err })
        res.status(200).json({ success: true })

    })
})

//싫어요
router.post('/upDislike', (req, res) => {
    let variable = []
    if (req.body.videoId) {
        variable = { 'videoId': req.body.videoId, userId: req.body.userId }
    } else {
        variable = { 'commentId': req.body.commentId, userId: req.body.userId }
    }

    const disLike = new Dislike(variable)
    disLike.save((err, result) => {
        if (err) return res.json({ success: false, err })
        //좋아요눌러져있으면 좋아요제거
        Like.findOneAndDelete(variable).exec((err, result) => {
            if (err) return res.status(400).json({ success: false, err })
            res.status(200).json({ success: true })
        })
    })

})


router.post('/unDislike', (req, res) => {
    let variable = []
    if (req.body.videoId) {
        variable = { 'videoId': req.body.videoId, userId: req.body.userId }
    } else {
        variable = { 'commentId': req.body.commentId, userId: req.body.userId }
    }

    Dislike.findOneAndDelete(variable).exec((err, result) => {
        if (err) res.status(400).json({ success: false })
        res.status(200).json({ success: true })
    })

})


module.exports = router;
