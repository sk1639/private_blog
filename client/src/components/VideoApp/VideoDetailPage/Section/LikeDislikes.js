import React, { useState, useEffect } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios'

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    //비디오 좋아요> 디테일페이지이에서 프롭스 video 넘겨받음
    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    }
    else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {
        //좋아요 정보 가져오기
        Axios.post('/api/video/like/getLiked', variable).then(res => {
            if (res.data.success) {
                console.log(res.data)
                //좋아요갯수
                setLikes(res.data.likes.length);
                //눌렀는지 확인
                res.data.likes.map(like => {
                    if (like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('좋아요 정보를 가져오는데 실패하였습니다.')
            }
        })

        // 싫어요 정보 가져오기
        Axios.post('/api/video/like/getDisliked', variable).then(res => {
            if (res.data.success) {
                console.log(res.data)
                //싫어요갯수
                setDislikes(res.data.dislikes.length);
                //눌렀는지 확인
                res.data.dislikes.map(dislike => {
                    if (dislike.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert('싫어요 정보를 가져오는데 실패하였습니다.')
            }
        })

    }, [])


    const onLike = () => {
        //안눌러진 상태
        if (LikeAction === null) {
            Axios.post('/api/video/like/upLike', variable).then(res => {
                if (res.data.success) {
                    setLikes(Likes + 1)
                    setLikeAction('liked')
                    //좋아요를 눌렀으므로 싫어요가 눌러진 상태였다면 싫어요를 제거한다.
                    if (DislikeAction !== null) {
                        setDislikeAction(null)
                        setDislikes(Dislikes - 1)
                    }
                }
                else {
                    alert('좋아요 실패')
                }

            })
        } else { //좋아요가 눌러진 상태
            Axios.post('/api/video/like/unLike', variable).then(res => {
                if (res.data.success) {
                    setLikes(Likes - 1)
                    setLikeAction(null)
                } else {
                    alert('좋아요 제거 실패')
                }
            })

        }
    }



    const onDislike = () => {
        //안눌러진 상태
        if (DislikeAction === null) {
            Axios.post('/api/video/like/upDislike', variable).then(res => {
                if (res.data.success) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')
                    //싫어요 눌렀으므로 좋아요가 눌러진 상태였다면 좋아요를 제거한다.
                    if (LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                }
                else {
                    alert('싫어요 실패')
                }

            })
        } else { //싫어요 눌러진 상태
            Axios.post('/api/video/like/unDislike', variable).then(res => {
                if (res.data.success) {
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)
                } else {
                    alert('싫어요 제거 실패')
                }
            })

        }
    }




    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                        theme={LikeAction === 'liked' ? "filled" : "outlined"}
                        onClick={onLike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>

            <span key="commet-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike"
                        theme={DislikeAction === 'disliked' ? "filled" : "outlined"}
                        onClick={onDislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>
        </div>
    )
}

export default LikeDislikes