import React, { useEffect, useState } from 'react'
import { List, Row, Col, Avatar } from 'antd'
import Axios from 'axios'
import VideoLeftMenu from '../Main/Section/VideoLeftMenu'
import SideVideo from './Section/SideVideo'
import Comments from './Section/Comments'
import Subscribe from './Section/Subscribe'
import LikeDislikes from './Section/LikeDislikes'


function VideoDetailPage(props) {
    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }

    const [VideoDetail, setVideoDetail] = useState([])
    const [Comment, setComment] = useState([])

    useEffect(() => {

        Axios.post('/api/video/getVideoDetail', variable).then(res => {
            if (res.data.success) {
                setVideoDetail(res.data.videoDetail)
            } else {
                alert('비디오 정보를 가져오는데 실패하였습니다.')
            }
        })

        Axios.post('/api/video/comment/getComment', variable).then(res => {
            if (res.data.success) {
                setComment(res.data.result)
            } else {
                alert('코멘트 목록을 가져오는데 실패하였습니다.')
            }
        })


    }, [])

    const refreshFunction = (newComments) => {
        setComment(Comment.concat(newComments))
    }


    if (VideoDetail.writer) {
        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />

        return (

            <div style={{ display: 'flex' }}>
                <div style={{ position: 'fixed' }}>
                    <VideoLeftMenu />
                </div>
                {/* fixed를 위한 가드영역 */}
                <div style={{ minWidth: '200px' }}>
                </div>
                <Row gutter={[16, 16]}>
                    <Col lg={18} xs={24}>
                        <div style={{ width: '100%', padding: '3rem 4rem' }}>
                            <video style={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />
                            <List.Item
                                actions={[<div>{VideoDetail.writer.name}</div>, <LikeDislikes video userId={localStorage.getItem('userId')} videoId={videoId} />, subscribeButton]}
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={VideoDetail.writer.image} />}
                                    title={VideoDetail.title}
                                    description={VideoDetail.description} />
                            </List.Item>

                            {/* comments */}
                            <Comments refreshFunction={refreshFunction} videoId={videoId} comments={Comment} />
                        </div>
                    </Col>
                    <Col lg={6} xs={24}>
                        <SideVideo />
                    </Col>
                </Row>
            </div>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage
