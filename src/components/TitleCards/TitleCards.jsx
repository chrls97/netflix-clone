import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';
import Player from '../../pages/Player/Player';

const TitleCards = ({title, category}) => {

  const cardsRef = useRef(null);
  const [apiData, setApiData] =useState([]);


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWE2NjE2Yjg5ZjJiYmFiZDk5N2MyNDJiOWZmM2ZlMCIsIm5iZiI6MTc1MzQxNjg3MS4xNSwic3ViIjoiNjg4MzA0YTdhNTc0NmRjODU5MjQ1ZTI1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.y4nKZjD5SsWzBGOZIdDrjJuKP7wWhYk0oOjc9aUX7zw'
    }
  };

  const handleWheel = (event) =>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel);
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`http://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
