import React, { useEffect, useState } from 'react'
import Axios from 'axios'

function SideVideo() {
    const [SideVideos, setSideVideos] = useState([])

    useEffect(() => {
        Axios.post('/api/video/getVideos').then((res) => {
            if (res.data.success) {
                setSideVideos(res.data.videos)
            } else {
                alert('사이드 비디오정보를 가져오는데 실패하였습니다.')
            }
        })
    }, [])

    const renderSideVideo = SideVideos.map((video, index) => {
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return (
            <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '2rem 2rem' }}>
                <div style={{ width: '40%', marginRight: '1rem' }}>
                    <a href={`http://localhost:3000/video/detail_${video._id}`}>
                        <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    </a>
                </div>
                <div style={{ width: '50%' }}>
                    <a href={`http://localhost:3000/video/detail_${video._id}`}>
                        <span style={{ fontSize: '1rem', color: 'black' }}> {video.title}</span><br />
                        <span>{video.writer.name}</span><br />
                        <span>{video.views}</span><br />
                        <span>{minutes} : {seconds}</span>
                    </a>
                </div>
            </div>
        )
    })
    return (
        <>
            <div style={{ mairginTop: '3rem' }}>
                {renderSideVideo}
            </div>
        </>
    )
}

export default SideVideo
