
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';
import InfoIcon from '@mui/icons-material/Info';

const PopUpModal = ({resumeGameHandler,refreshWindow}) => {
  return (
    <div className='flex justify-center items-center bg-black/40  fixed inset-0'>
        <div id='modal-container ' className='bg-white flex flex-col justify-center items-center min-w-[40%] min-h-[40%] p-5 rounded-2xl text-xl text-gray-500 px-10 py-10'>
            <span id='modal-memory-card'>MEMORY CARDS</span>
            <p className='text-center'> <InfoIcon className='text-cyan-600' /> Remember the cards. Once the cards are flipped over, find the matching cards.</p>
            <br />
            <p className='text-center'> <InfoIcon className='text-cyan-600' /> Remember the cards, even if the two cards you've turned are different. This way, you can match the cards more easily on the next move</p>
            <br />

            <div id='modal-button ' className='flex gap-5'>
            <div className="plat-icon text-white bg-green-500 rounded-md border-[2px] shadow-lg cursor-pointer" title='play' onClick={resumeGameHandler}>
                <PlayArrowIcon fontSize='large'/>
            </div>
          <div className="refresh-icon text-white bg-yellow-500 rounded-md border-[2px] shadow-lg cursor-pointer" title='refresh game' onClick={()=>window.location.reload()}>
            <RefreshIcon fontSize='large'/>
          </div>
            </div>
          </div>
      
    </div>
  )
}

export default PopUpModal
