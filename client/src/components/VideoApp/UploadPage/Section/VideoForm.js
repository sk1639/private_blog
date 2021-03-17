import React, { useState } from 'react'
import { Input, Select, Button, message } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";


const { TextArea } = Input;
const { Option } = Select;


const PrivateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
]

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
]



function VideoForm(props) {
    const user = useSelector(state => state.user)
    const [VideoTitle, setVideoTitle] = useState("")
    const [Descript, setDescript] = useState("")
    const [Private, setPrivate] = useState([])
    const [Category, setCategory] = useState([])

    const onChangeTitle = (e) => {
        setVideoTitle(e.currentTarget.value)
    }

    const onChangeDescript = (e) => {
        setDescript(e.currentTarget.value)
    }

    const onPrivateChange = (value) => {
        setPrivate(value)
    }

    const onCategoryChange = (value) => {
        setCategory(value);

    }


    const onSubmit = (e) => {
        e.preventDefault();

        console.log(user.userData._id)
        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Descript,
            privacy: Private,
            filePath: props.filePath,
            catecory: Category,
            duration: props.duration,
            thumbnail: props.ThumbnailPaths[props.thumbNailIndex.current]
        }

        Axios.post('/api/video/uploadVideo', variables).then(res => {
            if (res.data.success) {
                console.log(res.data)
                message.success('성공적으로 업로드를 완료했습니다.')
                props.history.push('/')
            } else {
                alert("비디오 저장에 실패했습니다.")
            }
        })
    }

    return (
        <div>
            <label>Title</label>
            <Input onChange={onChangeTitle}
                value={VideoTitle} />
            <br />
            <br />
            <label>Description</label>
            <TextArea
                onChange={onChangeDescript} value={Descript}
            />
            <br />
            <br />
            <Select onChange={onPrivateChange}>
                {PrivateOptions.map((item, index) => (
                    <Option key={index} value={item.value}>{item.label}</Option>
                ))}

            </Select>
            <br />
            <br />
            <Select onChange={onCategoryChange}>
                {CategoryOptions.map((item, index) => (
                    <Option key={index} value={item.value}>{item.label}</Option>
                ))}

            </Select>
            <br />
            <br />
            <Button type="primary" size="large" onClick={onSubmit}>
                Submit
            </Button>
        </div>
    )
}

export default withRouter(VideoForm)
