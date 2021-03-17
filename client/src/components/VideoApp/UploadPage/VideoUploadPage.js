import React, { useState, useCallback, useRef } from 'react'
import VideoLeftMenu from '../Main/Section/VideoLeftMenu'
import { Typography, Form, Icon, Spin, Carousel, Input, Button, Select } from 'antd'
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import VideoForm from './Section/VideoForm';

const { Title } = Typography;


function VideoUploadPage() {
    const [LoadingIcon, setLoadingIcon] = useState(false);
    const [ThumbnailPaths, setThumbnailPaths] = useState("");
    const [ThumbnailPath, setThumbnailPath] = useState("");
    const [FilePath, setFilePath] = useState("");
    const [Duration, setDuration] = useState("");
    const thumbNailIndex = useRef(0)

    const onDrop = (files) => {
        console.log(files);
        let formData = new FormData;
        const config = {
            header: { 'content-type': 'multiple/form-data' }
        }
        formData.append("file", files[0])

        //비디오 업로드 요청
        Axios.post('/api/video/uploadfiles', formData, config).then(res => {
            if (res.data.success) {
                console.log(res.data)

                //업로드 된 비디오의 정보
                let variable = {
                    url: res.data.url,
                    fileName: res.data.fileName
                }

                setFilePath(res.data.url);
                setLoadingIcon(true);

                //업로드된 비디오의 정보를 가지고 썸네일 생성요청
                Axios.post('/api/video/thumbnail', variable).then(res => {
                    if (res.data.success) {
                        console.log('썸네일 정보', res.data)
                        setDuration(res.data.fileDuration);
                        setThumbnailPaths(res.data.url);
                        setThumbnailPath(res.data.url[0])
                        setLoadingIcon(false);
                    } else {
                        alert('썸네일 생성 실패');
                        setLoadingIcon(false);
                    }
                })

            } else {
                alert('비디오 업로드를 실패했습니다.')
            }
        })
    }

    const onChange = useCallback((index) => {
        thumbNailIndex.current = index
    }, [])


    const ThumbNail = () => {
        if (ThumbnailPaths.length === 0) {
            return (<div style={{ marginLeft: '5px', border: "1px solid lightgray", width: '300px', height: '240px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Spin tip="Creating Thumbnails" spinning={LoadingIcon}></Spin>
            </div>)
        } else {
            return (<Carousel style={{ width: '300px', height: '240px', marginLeft: '5px', border: "1px solid lightgray" }} afterChange={onChange}>
                {ThumbnailPaths && ThumbnailPaths.map((ThumbnailPath) => (
                    <div>
                        <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                    </div>
                ))
                }
            </Carousel>)
        }

    }


    return (
        <div style={{ display: 'flex' }}>
            <div style={{ position: 'fixed' }}>
                <VideoLeftMenu selectedKey={'2'} />
            </div>
            {/* fixed를 위한 가드영역 */}
            <div style={{ minWidth: '200px' }}>
            </div>
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Title level={2}>Upload Video</Title>
                </div>

                <Form >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* 업로드파일 */}
                        <Dropzone onDrop={onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <div style={{ width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <Icon type="plus" style={{ fontSize: '3rem' }} />
                                </div>
                            )}
                        </Dropzone>
                        {/* 썸네일 */}
                        <ThumbNail />
                    </div>
                    <br />
                    <br />

                    <VideoForm thumbNailIndex={thumbNailIndex} filePath={FilePath} ThumbnailPaths={ThumbnailPaths} duration={Duration} />
                </Form>
            </div>
        </div >
    )
}

export default VideoUploadPage
