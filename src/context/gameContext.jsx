import React, { createContext, useContext, useEffect, useState } from "react";
import cardData from "../Card-flip.json";

const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [gameCards, setGameCards] = useState([]);
  const [firstSelection, setfirstSelection] = useState(null);
  const [secondSelection, setsecondSelection] = useState(null);
  const [matchedPair, setMatchedPair] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [gameScore, setGameScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [count, setCount] = useState(5);
  const [isPaused, setIsPaused] = useState(false);
  const [disabled, setDisabled] = useState(false);

  //counting-time game start with 5 sec
  useEffect(() => {
    const countingTime = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countingTime);
  }, []);

  //seting the time limit for game
  useEffect(() => {
    let timerId;
  
    if (!gameStart && !isPaused && timer > 0) {
      timerId = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
  
    return () => {
      clearTimeout(timerId);
    };
  }, [gameStart, isPaused, timer]);
  

  // function for card suffling using math function
  const images = cardData["Card-Flip"][index].imageSet;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  const shuffleCards = () => {
    const shuffledCards = [...images, ...images].map((card) => ({ ...card, id: Math.random() }));
    shuffleArray(shuffledCards);
    setGameCards(shuffledCards);
  };
  
  // function that decides the selected choice is first or second
  const handleChoice = (card) => {
    firstSelection ? setsecondSelection(card) : setfirstSelection(card);
  };

  //comparing two selection clicked by user
  useEffect(() => {
    if (firstSelection && secondSelection) {
      setDisabled(true);
      if (firstSelection.src === secondSelection.src) {
        setGameScore((prev) => prev + 5);
        setMatchedPair(matchedPair + 1);
        setGameCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstSelection.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetCardTurn();
      } else {
        setTimeout(() => {
          resetCardTurn();
        }, 700);
      }
    }
  }, [firstSelection, secondSelection]);

  //after completetion of first quiz increase the index by one  for next quiz image set to the second quiz
  useEffect(() => {
    if (matchedPair === 5) {
      setGameEnd(true);
      setIndex(index + 1);
    }
  }, [matchedPair]);

  //restart the game when time limit is over
  useEffect(() => {
    if (timer === 0) {
      window.location.reload();
    }
  }, [timer]);

  //quiz start after 8 sec
  useEffect(() => {
    shuffleCards();
    setTimeout(() => {
      setGameStart(false);
    }, 8000);
  }, []);

  // start the second quiz after first is completed
  useEffect(() => {
    if (matchedPair === 5) {
    setTimeout(()=>{
      shuffleCards();
    },2000)
      setGameStart(true);
    }
  }, [matchedPair === 5 && matchedPair, gameEnd]);

  //gameStart
  useEffect(() => {
    setTimeout(() => {
      setGameStart(false);
    }, 10000);
  }, [gameEnd]);

  //initial matched image phase
  const resetCardTurn = () => {
    setfirstSelection(null);
    setsecondSelection(null);
    setDisabled(false);
  };

  return (
    <gameContext.Provider
      value={{
        setIsPaused,
        disabled,
        shuffleCards,
        handleChoice,
        index,
        setIndex,
        modalIsOpen,
        setModalIsOpen,
        gameEnd,
        setGameEnd,
        count,
        setCount,
        gameCards,
        setGameCards,
        firstSelection,
        setfirstSelection,
        secondSelection,
        setsecondSelection,
        gameStart,
        setGameStart,
        matchedPair,
        gameScore,
        setGameScore,
        timer,
        setTimer,
      }}
    >
      {children}
    </gameContext.Provider>
  );
};

const useGlobaleGames = () => useContext(gameContext);

export { GameProvider, useGlobaleGames };
