const express = require('express');
const router = express.Router();
const { Favorite } = require('../../models/movieApp/Favorite')

//=================================
//         MovieApp Favorite
//=================================

//해당 영화의 좋아요 갯수 확인
router.post('/favoriteNumber', (req, res) => {
    console.log('req', req)
    Favorite.find({ "movieId": req.body.movieId }).exec((err, info) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, favoriteNumber: info.length })
    })
})

//로그인한 사용자가 좋아요 눌렀는지 확인하기
router.post('/favorited', (req, res) => {
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom }).exec((err, info) => {
        if (err) return res.status(400).send(err)
        let result = false;
        if (info.length !== 0) {
            result = true
        }
        res.status(200).json({ success: true, favorited: result })
    })
})

//좋아요 하기
router.post('/addToFavorite', (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true })
    })
})

//좋아요 빼기
router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom }).exec((err, doc) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true })
    })
})


router.post('/getFavoredMovie', (req, res) => {
    Favorite.find({ "userFrom": req.body.userFrom }).exec((err, info) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({ success: true, results: info })
    })
})

module.exports = router;