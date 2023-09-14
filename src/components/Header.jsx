import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import Card from './Card';


const Header = () => {

  return (
    <div className="header bg-white/10 p-5 min-h-[95%] min-w-[80%] rounded-lg shadow-2xl">
          <div className="game-action-icon w-[100%] p-5 flex justify-between">
            <PlayArrowIcon fontSize='large' className='text-yellow-600 cursor-pointer' />
            <div className="score-time flex justify-around gap-10 w-[30%] text-yellow-600 font-bold text-2xl">
            <p>Score</p>
             <p>Time</p>
            </div>
          
            
          </div>
          
        </div>
  )
}

export default Header
