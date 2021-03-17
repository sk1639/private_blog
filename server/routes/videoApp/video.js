const express = require('express');
const router = express.Router();

const { auth } = require("../../middleware/auth")
const multer = require("multer")
var ffmpeg = require("fluent-ffmpeg")
const { Video } = require('../../models/videoApp/Video')
const { Like } = require('../../models/videoApp/Like')
const { User } = require('../../models/User')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400), end('only jpg, png, mp4 is allowed'), false);

        }
        cb(null, true)
    }
})

const upload = multer({ storage: storage }).single("file")


//비디오 업로드
router.post('/uploadfiles', (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false }, err)
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })
})

//썸네일 생성
router.post('/thumbnail', (req, res) => {
    let filePath = [];
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata)
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration;
    })

    ffmpeg(req.body.url).on('filenames', function (filenames) {
        console.log("Will generate " + filenames.join(','))
        console.log(filenames)
        filenames.map((filename) => {
            filePath.push("uploads/thumbnails/" + filename)
        })
    }).on('end', function () {
        console.log("Screenshots taken");
        return res.json({ success: true, url: filePath, fileDuration: fileDuration })
    }).on('error', function (err) {
        console.err(err);
        return res.json({ success: false, err })
    }).screenshots({
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png'
    })
})

//비디오저장
router.post('/uploadVideo', (req, res) => {
    console.log(req.body)
    //req.body = variables
    const video = new Video(req.body);
    video.save((err, doc) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true })
    })

})

//비디오 목록
router.post('/getVideos', (req, res) => {
    Video.find().populate('writer').exec((err, videos) => {
        if (err) res.json({ success: false, err })
        return res.status(200).json({ success: true, videos })
    })

})

//비디오 상세정보
router.post('/getVideoDetail', (req, res) => {
    Video.findById({ '_id': req.body.videoId }).populate('writer').exec((err, videoDetail) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, videoDetail })
    })
})


//likeVideo
router.post('/getFavoriteVideo', (req, res) => {
    Like.find({ 'userId': req.body.userId, 'videoId': { '$ne': null } }).populate([{ path: 'videoId', model: 'Video', populate: { path: 'writer', model: 'User' } }, 'userId']).exec((err, likeList) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true, likeList })
    })
})

//
router.post('/getLikeCount', (req, res) => {
    Like.aggregate([{
        $group: {
            '_id': { 'videoId': '$videoId' },
            'count': { '$sum': 1 }
        }
    }]).exec((err, countList) => {
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true, countList })
    });
})

router.post('/hello', (req, res) => {
    console.log(req.body)
})


module.exports = router;