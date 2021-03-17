import React, { useEffect, useState } from 'react'
import MovieLeftMenu from '../Main/Section/MovieLeftMenu'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from '../Common/MainImage';
import MovieInfo from './Section/MovieInfo';
import { Row, Button } from 'antd'
import GridCards from '../Common/GridCards';
import Favorite from './Section/Favorite';
import emptyImage from '../../images/generic-avatar.png'

function MovieDetail(props) {
    //url 파라미터로 받아온 movieId
    let movieId = props.match.params.movieId
    const [Casts, setCasts] = useState([])
    const [Movie, setMovie] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endPointInfo)
            .then(res => res.json())
            .then(res => {
                setMovie(res);
            })

        fetch(endPointCrew)
            .then(res => res.json())
            .then(res => {
                console.log('responesCrew', res)
                setCasts(res.cast);
            })


    }, [])


    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    }


    return (
        <>
            <div style={{ display: 'flex' }}>
                <MovieLeftMenu />
                <div style={{ width: '90%', margin: '10px 10px' }}>
                    {/* Header */}
                    <MainImage
                        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                        title={Movie.original_title}
                        text={Movie.overview}

                    />
                    {/* Body */}
                    <div style={{ width: '85%', margin: '1rem auto' }}>
                        {/* favorite */}
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                        </div>
                        {/* MovieInfo */}
                        <MovieInfo movie={Movie} />
                        {/* actorInfo */}
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                            <Button onClick={toggleActorView}>Toggle Actor View</Button>
                        </div>
                        {ActorToggle &&
                            <Row gutter={[16, 16]}>
                                {Casts && Casts.map((cast, index) => (
                                    <React.Fragment key={index}>
                                        <GridCards
                                            image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : emptyImage}
                                            cast={cast}
                                        >
                                        </GridCards>
                                    </React.Fragment>
                                ))}

                            </Row>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieDetail
