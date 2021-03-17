import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'
import LikeDislikes from './LikeDislikes';
import moment from 'moment';

const { TextArea } = Input;

function SingleComment(props) {
    const user = useSelector(state => state.user)
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState('')


    const onSubmit = (e) => {
        e.preventDefault()

        const commentVariables = {
            writer: user.userData._id,
            content: CommentValue,
            responseTo: props.comment._id,
            postId: props.comment.postId
        }

        axios.post('/api/video/comment/saveComment', commentVariables).then(res => {
            if (res.data.success) {
                console.log(res.data)
                setCommentValue('');
                props.refreshFunction(res.data.result);
                setOpenReply(false);
            } else {
                alert('코멘트 작성에 실패하였습니다.')
            }
        })


    }

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onClickReplyOpen = (e) => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id} />, <div style={{ width: '20px', textAlign: 'center' }}>|</div>,
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    return (
        <div>
            <Comment
                style={{ padding: '0px 0px' }}
                datetime={moment(props.comment.createAt).format("MMM Do YY")}
                actions={actions}
                author={props.comment.writer.name}
                content={<p>{props.comment.content}</p>}
                avatar={<Avatar src={props.comment.writer.image} />}
            />

            {OpenReply && <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '90%', marginLeft: '5px', borderRadius: '5px' }}
                    onChange={onHandleChange}
                    value={CommentValue}
                    placeholder="코멘트를 작성해주세요"
                />
                <Button style={{ height: '52px' }} size="large" onClick={onSubmit}>Submit</Button>
            </form>}
        </div>
    )
}

export default SingleComment
