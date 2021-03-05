import React, { useState, useEffect } from 'react'
import MovieLeftMenu from './Section/MovieLeftMenu'
import { Row, Button } from 'antd'
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config"
import GridCards from '../Common/GridCards';
import MainImage from '../Common/MainImage';


function MovieMainPage() {
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    const [Mode, setMode] = useState('home')


    useEffect(() => {
        //api
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=1`;
        fetchMovies(endPoint, true);
    }, [])

    const fetchMovies = (endPoint, fromLoadMoreItem) => {
        fetch(endPoint).then(res => res.json())
            .then(
                res => {
                    console.log(res.results)
                    setMainMovieImage(MainMovieImage || res.results[0]);
                    setMovies([...Movies, ...res.results]);
                    setCurrentPage(res.page)
                    console.log('Movies', Movies)
                })
    }

    const loadMoreItems = () => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en_US&page=${CurrentPage + 1}`;
        fetchMovies(endPoint)
    }

    const LoadContent = () => {
        if (Mode === 'home') {
            return (
                <>
                    {MainMovieImage && <MainImage
                        image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                        title={MainMovieImage.original_title}
                        text={MainMovieImage.overview}
                    />}
                    <div style={{ width: '90%', margin: '1rem auto' }}>

                        <h2>Movie by latest</h2>
                        <Row gutter={[16, 16]}>
                            {Movies && Movies.map((movie, index) => (
                                <GridCards key={movie.id} MainPage image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null} movieId={movie.id} movieName={movie.original_title} />
                            ))}
                        </Row>
                        <hr />


                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button onClick={loadMoreItems}> Load More</Button>
                        </div>
                    </div>
                </>
            )
        }

    }



    return (
        <>
            <div style={{ display: 'flex' }}>
                <div style={{ position: 'fixed' }}>
                    <MovieLeftMenu />
                </div>
                {/* fixed를 위한 영역가드 */}
                <div style={{ minWidth: '200px' }}>
                </div>
                <div style={{ width: '90%', margin: '10px 10px' }}>
                    <LoadContent />
                </div>
            </div>
        </>
    )
}

export default MovieMainPage
