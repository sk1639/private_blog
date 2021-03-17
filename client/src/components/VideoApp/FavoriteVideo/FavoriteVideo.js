import React, { useState, useEffect } from 'react'
import VideoLeftMenu from '../Main/Section/VideoLeftMenu'
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import Axios from 'axios'
import { useSelector } from 'react-redux';

function FavoriteVideo() {
    const [favoriteVideo, setFavoriteVideo] = useState([])
    const [LikeNumber, setLikeNumber] = useState([]);



    useEffect(() => {
        Axios.post('/api/video/getFavoriteVideo', { userId: localStorage.getItem('userId') }).then(res => {
            if (res.data.success) {
                let favoriteVideos = [];
                let likes = [];
                let mergedList = [];
                favoriteVideos = res.data.likeList;
                Axios.post('/api/video/getLikeCount').then(res => {
                    if (res.data.success) {
                        likes = res.data.countList
                        mergedList = favoriteVideos.map((video) => {
                            let obj = likes.find((item) => {
                                return video.videoId._id === item._id.videoId
                            })
                            video.videoId.likeCount = obj.count
                            return video
                        })
                        setFavoriteVideo(mergedList)
                    } else {
                        alert('데이터를 가져오는데 실패하였습니다')
                    }
                })

            } else {
                alert('비디오 정보를 가져오는데 실패하였습니다.')
            }
        })


    }, [])

    const IconText = ({ icon, text }) => (
        <div>
            {React.createElement(icon)}
            {text}
        </div>
    );



    const RenderList = () => {
        if (favoriteVideo) {
            return <div style={{ width: '90%', margin: '0 auto' }}>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={favoriteVideo}
                    footer={<div>more..</div>}
                    renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={LikeOutlined} text={item.videoId.likeCount} key="list-vertical-like-o" />,
                                <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={`http://localhost:5000/${item.videoId.thumbnail}`}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.videoId.writer.image} />}
                                title={<a href={`/video/detail_${item.videoId._id}`}>{item.videoId.title}</a>}
                                description={item.videoId.writer.email}
                            />
                            {item.videoId.description}
                            <div style={{ minHeight: "70px" }}></div>
                        </List.Item>
                    )}
                />
            </div>
        } else {
            return <div>Loading...</div>
        }
    }





    return (

        <div style={{ display: 'flex' }}>
            <div style={{ position: 'fixed' }}>
                <VideoLeftMenu selectedKey={'3'} />
            </div>
            {/* fixed를 위한 영역가드 */}
            <div style={{ minWidth: '200px' }}>
            </div>
            <div style={{ width: '85%', margin: '3rem auto' }}>
                <h2> Favorite Videos</h2>
                <hr />
                <RenderList />
            </div>
        </div>
    )
}

export default FavoriteVideo
