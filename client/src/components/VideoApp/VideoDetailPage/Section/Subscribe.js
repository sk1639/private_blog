import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Subscribe(props) {
    const [Subscribed, setSubscribed] = useState(false);
    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    //userTo 게시자
    //userFrom 사용자
    useEffect(() => {
        let variable = { userTo: props.userTo }

        //구독자 수 정보
        axios.post('/api/video/subscribe/subscribeNumber', variable).then(res => {
            if (res.data.success) {
                setSubscribeNumber(res.data.subscribeNumber)
            } else {
                alert('구독자 정보를 가져오는데 실패하였습니다.')
            }
        })

        let subscribeVariable = { userTo: props.userTo, userFrom: props.userFrom }
        //사용자의 구독정보
        axios.post('/api/video/subscribe/subscribed', subscribeVariable).then(res => {
            if (res.data.success) {
                setSubscribed(res.data.subscribed)
            } else {
                alert('구독 정보를 가져오는데 실패하였습니다.')
            }
        })

    }, [])


    const onSubscribe = (e) => {
        let subscribeVariable = { userTo: props.userTo, userFrom: props.userFrom }

        if (Subscribed) {
            axios.post('/api/video/subscribe/unSubscribed', subscribeVariable).then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    setSubscribeNumber(SubscribeNumber - 1)
                    setSubscribed(!Subscribed)
                } else {
                    alert('구독 취소에 실패하였습니다.')
                }
            })

        } else {
            axios.post('/api/video/subscribe/subscribe', subscribeVariable).then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    setSubscribeNumber(SubscribeNumber + 1)
                    setSubscribed(!Subscribed)
                }
                else {
                    alert('구독에 실패하였습니다.')
                }
            })

        }

    }

    return (
        <div>
            <button
                style={{ backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px', color: 'white', padding: '10px 16px', fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase' }}
                onClick={onSubscribe}
            >
                {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}

            </button>
        </div>
    )
}

export default Subscribe
