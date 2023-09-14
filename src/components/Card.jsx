import React from 'react'
import puzzle from '../images/puzzle2.jpg'
import './card.css'

const Card = ({card,handleChoice, flipped, gameStart, setGameStart,disabled}) => {
  
  const handleClick = () => {
  if(!disabled){
    handleChoice(card)
  }
  }


  return (
    <div className='card'>
      <div className={flipped ? 'flipped' : ''}>
      <img  src={card.src} alt="" className='size front'  style={{ transform: gameStart ? 'rotateY(0deg)' : '' }}  />
      <img src={puzzle} alt="" onClick={handleClick}  className='size back' style={{ visibility: gameStart ? 'hidden' : '' }}  />
      </div>
    </div>
  )
}

export default Card;
