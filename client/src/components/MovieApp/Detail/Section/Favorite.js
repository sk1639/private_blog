import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Button } from 'antd'


function Favorite(props) {
    const { movieId, userFrom } = props;
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRuntime = props.movieInfo.runtime

    let variables = {
        userFrom, movieId, movieTitle, moviePost, movieRuntime
    }

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {

        Axios.post('/api/movieApp/favoriteNumber', variables).then(res => {

            if (res.data.success) {
                console.log('좋아요갯수', res.data.favoriteNumber);
                setFavoriteNumber(res.data.favoriteNumber)
            } else {
                alert('숫자 정보를 가져오는데 실패했습니다.');
            }
        })

        Axios.post('/api/movieApp/favorited', variables).then(res => {

            if (res.data.success) {
                console.log('좋아요상태', res.data)
                setFavorited(res.data.favorited);
                console.log(Favorited);
            } else {
                alert('정보를 가져오는데 실패했습니다.');
            }
        })


    }, [])



    const onClickFavorite = () => {
        if (Favorited) {
            Axios.post('/api/movieApp/removeFromFavorite', variables).then(res => {
                if (res.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                }
            })
        } else {
            console.log(props.movieInfo);
            Axios.post('/api/movieApp/addToFavorite', variables).then(res => {
                if (res.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited)
                } else {
                    alert('Favorite 리스트에서 c 걸 실패했습니다.')
                }
            })
        }
    }


    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? 'Favorited' : 'Not Favorited'} | {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
