import { useState } from "react";
import "./App.css";
import PauseIcon from "@mui/icons-material/Pause";
import Card from "./components/Card";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PopUpModal from "./components/PopUpModal/PopUpModal";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import { useGlobaleGames } from "./context/gameContext";

function App() {
  const [messageOpen,setMessageOpen] = useState(false)
 
  const {
    setIsPaused,
    handleChoice,
   setModalIsOpen,
    timer,
    disabled,
    gameCards,
    firstSelection,
    secondSelection,
    gameStart,
    matchedPair,
    setGameStart,
    gameScore,
    modalIsOpen,
    count,
   
  } = useGlobaleGames();

  function handlePlayGame() {
    setModalIsOpen(true);
    setIsPaused(true)
  }

  function resumeGameHandler() {
    setModalIsOpen(false);
    setIsPaused(false)
  }

  return (
    <>
      <div className="container rounded-lg bg-white min-w-[80vw] min-h-[100vh]">
        
        <div className="home h-full w-full bg-white-900 flex justify-center items-center flex-col">
          
          <div className="w-full flex justify-between gap-10 items-end px-5 py-5">
            <div
              className="pause-icon cursor-pointer text-gray-600"
              onClick={handlePlayGame}
            >
              {modalIsOpen ? (
                <PlayArrowIcon fontSize="large" />
              ) : (
                <PauseIcon fontSize="large" />
              )}
            </div>
            <div className="text-2xl text-gray-600  font-bold">
            {
              gameCards.length<=10 ? <p>Level 1</p>:<p>Level 2</p>
            }
            </div>
            

            <div className="flex gap-10 text-gray-600">
              <p className="text-2xl text-brown-200  font-bold">
                Score: {gameScore}
              </p>
              <p className="text-2xl text-brown-200  font-bold">
                Timer: {timer}
              </p>
            </div>
          </div>
          <p className="text-center text-xl text-gray-600">Match the gameCards</p>
          <p className="text-xl text-green-800">Matched Pair {matchedPair}</p>

          {
            matchedPair === 5 ? <p className=" text-green-700"> <BeenhereIcon/> you won the first game</p>:''
          }
          {
            matchedPair === 11 ? <p className=" text-green-700"> <BeenhereIcon/>you won the second game</p>:''
          }

          
          <br />

          {count > 0 ? (
            <div className=" h-full w-full message flex flex-col justify-center items-center inset-0 ">
              <p className="text-brown-200 text-5xl font-bold ">
                Remember the card{" "}
              </p>
              <p className="text-6xl font-extrabold" id="count-three-second">
                {count}
              </p>
            </div>
          ) : (
            <div className="gameCards  max-w-[50vw] min-h-[100%] flex flex-wrap justify-center gap-5 cursor-pointer">
              {gameCards.map((card) => (
                <Card
                  card={card}
                  flipped={
                    card === firstSelection ||
                    card === secondSelection ||
                    card.matched
                  }
                  gameStart={gameStart}
                  handleChoice={handleChoice}
                  setGameStart={setGameStart}
                  disabled ={disabled}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {modalIsOpen && (
        <PopUpModal
          resumeGameHandler={resumeGameHandler}
              
        />
      )}
    </>
  );
}

export default App;
