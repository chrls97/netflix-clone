import React, { useEffect, useState } from 'react'
import './Player.css'
import back_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const {id} = useParams();
  const navigate = useNavigate();

  const [movieData, setmovieData] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWE2NjE2Yjg5ZjJiYmFiZDk5N2MyNDJiOWZmM2ZlMCIsIm5iZiI6MTc1MzQxNjg3MS4xNSwic3ViIjoiNjg4MzA0YTdhNTc0NmRjODU5MjQ1ZTI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.y4nKZjD5SsWzBGOZIdDrjJuKP7wWhYk0oOjc9aUX7zw'
    }
  };

  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(res => res.json())
    .then(res => setmovieData(res.results[0]))
    .catch(err => console.error(err));
  },[])



  return (
    <div className='player'>
      <img src={back_icon} onClick={()=>navigate('/')}/>
      <iframe frameborder="0" width="90%" height="90%" src={`https://www.youtube.com/embed/${movieData.key}`} title='Trailer' allowFullScreen></iframe>
      <div className='player-info'>
        <p>{movieData.published_at}</p>
        <p>{movieData.name}</p> 
        <p>{movieData.type}</p>
      </div>
    </div>
  )
}

export default Player
