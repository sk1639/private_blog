const express = require('express');
const router = express.Router();
const { Subscribe } = require('../../models/videoApp/Subscribe');

router.post('/subscribeNumber', (req, res) => {
    Subscribe.find({ 'userTo': req.body.userTo }).exec((err, subscribe) => {
        if (err) return res.status(404).send(err);
        console.log(subscribe.length)
        return res.status(200).json({ success: true, subscribeNumber: subscribe.length })
    })
})

router.post('/subscribed', (req, res) => {
    Subscribe.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom }).exec((err, subscribed) => {
        if (err) return res.status(400).send(err)
        let result = false
        if (subscribed.length !== 0) {
            result = true
        }
        res.status(200).json({ success: true, subscribed: result })
    })
})

//구독 취소
router.post('/unSubscribed', (req, res) => {
    Subscribe.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom }).exec((err, result) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, result })

    })

})


//구독 추가
router.post('/subscribe', (req, res) => {
    const subscribe = new Subscribe(req.body)
    subscribe.save((err, result) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, result })
    })
})

module.exports = router;