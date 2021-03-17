import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment';
import { EnterOutlined } from '@ant-design/icons'

function ReplyComment(props) {
    const [ChildCommentCount, setChildCommentCount] = useState(0);
    const [OnToggle, setOnToggle] = useState(false);
    useEffect(() => {
        let commentCount = 0;
        props.commentLists.map((comment) => {
            if (comment.responseTo === props.parentCommentId)
                commentCount++
        }
        )
        setChildCommentCount(commentCount)
    }, [props.commentLists])

    const renderReplyComment = (parentCommentId) =>
        props.commentLists.map((comment, index) => (
            <React.Fragment>
                {
                    comment.responseTo === parentCommentId &&
                    <div style={{ width: '80%', marginLeft: '40px' }}>
                        <SingleComment
                            refreshFunction={props.refreshFunction}
                            key={index} comment={comment} postId={props.videoId} />
                        <ReplyComment key={comment._id} refreshFunction={props.refreshFunction} commentLists={props.commentLists} postId={props.videoId} parentCommentId={comment._id} />
                    </div>

                }
            </React.Fragment>
        ))

    const onToggle = (e) => {
        setOnToggle(!OnToggle)
    }


    return (
        <div>
            {ChildCommentCount > 0 &&
                <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor: 'pointer' }} onClick={onToggle}>
                    <EnterOutlined style={{ transform: 'scaleX(-1)' }} /> View {ChildCommentCount} more comment(s)
                </p>
            }

            {OnToggle && renderReplyComment(props.parentCommentId)}
        </div>
    )
}

export default ReplyComment
