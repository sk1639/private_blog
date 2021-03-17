import Axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Comment, Button, Input } from 'antd'
import { withRouter } from "react-router-dom";
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

function Comments(props) {
    const user = useSelector(state => state.user)
    const videoId = props.videoId;
    const [CommentValue, setCommentValue] = useState('')


    const onSubmit = (e) => {
        e.preventDefault();
        if (user.userData.isAuth) {
            const commentVariables = {
                content: CommentValue,
                writer: user.userData._id,
                postId: videoId,
            }

            console.log(user)

            Axios.post('/api/video/comment/saveComment', commentVariables).then((res) => {
                if (res.data.success) {
                    console.log(res.data.result)
                    setCommentValue('');
                    props.refreshFunction(res.data.result)
                } else {
                    alert('코멘트 작성에 실패하였습니다.')
                }
            })
        } else {
            alert('로그인 후 코멘트를 작성해주세요.')
            props.history.push('/login')
        }
    }

    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    return (
        <div>
            <br />
            <p> Replies</p>
            <hr />
            {props.comments && props.comments.map((comment, index) => (
                (!comment.responseTo &&
                    <>
                        <SingleComment refreshFunction={props.refreshFunction} key={index} comment={comment} postId={videoId} />
                        <ReplyComment refreshFunction={props.refreshFunction} key={comment._id + index} commentLists={props.comments} parentCommentId={comment._id} postId={videoId} />
                        <hr />
                    </>)
            ))}


            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요."

                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default withRouter(Comments)
