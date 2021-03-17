const express = require('express');
const router = express.Router();

const { Comment } = require('../../models/videoApp/Comment');
const { route } = require('./video');

router.post('/saveComment', (req, res) => {
    console.log(req.body)
    const comment = new Comment(req.body)

    comment.save((err, comment) => {
        if (err) return res.json({ success: false, err })
        // 저장 후 바로 표출하기 위해 코멘트를 저장 후 해당 코멘트의 정보와 작성자를 리턴한다.
        Comment.find({ '_id': comment._id }).populate('writer').exec((err, result) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, result })
        })
    })
})

router.post('/getComment', (req, res) => {
    Comment.find({ 'postId': req.body.videoId }).populate('writer').exec((err, result) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true, result })
    })
})



module.exports = router;