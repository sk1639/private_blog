import React from 'react'
import { Col, Popover } from 'antd'

function GridCards(props) {
    console.log(props.image)



    //메인페이지에서 불러왔을 경우
    if (props.MainPage) {
        return (
            <div>
                <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                        <a href={`/movie/detail_${props.movieId}`} >
                            <img style={{ width: '100%', height: '400px' }} src={props.image} alt={props.movieName} />
                        </a>
                    </div>
                </Col>
            </div>
        )
    } else { // 그 외에서 컴포넌트를 불러왔을 경우
        const content = (<div>
            Actor : {props.cast.original_name}<br />
            Charactor : {props.cast.character}
        </div>)

        return (
            <div>
                <div>
                    <Col lg={6} md={8} xs={24}>
                        <div style={{ position: 'relative' }}>
                            <Popover content={content} title="Actor Info" trigger="hover" placement="rightTop">
                                <img style={{ width: '100%', height: '400px' }} src={props.image} alt={props.cast.characterName} />
                            </Popover>
                        </div>
                    </Col>
                </div>
            </div>
        )
    }

}

export default GridCards
