import React, { createContext, useContext, useEffect, useState } from "react";
import cardData from "../Card-flip.json";

const gameContext = createContext();

const GameProvider = ({ children }) => {
  const [index, setIndex] = useState(0);
  const [cards, setCards] = useState([]);
  const [firstSelection, setfirstSelection] = useState(null);
  const [secondSelection, setsecondSelection] = useState(null);
  const [matchedPair, setMatchedPair] = useState(0);
  const [gameStart, setGameStart] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(90);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [gameEnd, setGameEnd] = useState(false);
  const [count, setCount] = useState(5);
  const [clickCount, setClickCount] = useState(0);
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
    if (!gameStart && !isPaused) {
      const time = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(time);
    }
  }, [gameStart, isPaused]);

  // function for card suffling using math function
  const images = cardData["Card-Flip"][index].imageSet;
  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.8)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
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
        setScore((prev) => prev + 5);
        setClickCount(clickCount + 1);
        setMatchedPair(matchedPair + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstSelection.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
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
    if (clickCount === 5) {
      shuffleCards();
      setGameStart(true);
    }
  }, [clickCount === 5 && clickCount, gameEnd]);

  //gameStart
  useEffect(() => {
    setTimeout(() => {
      setGameStart(false);
    }, 10000);
  }, [gameEnd]);

  //initial matched image phase
  const resetTurn = () => {
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
        clickCount,
        setClickCount,
        cards,
        setCards,
        firstSelection,
        setfirstSelection,
        secondSelection,
        setsecondSelection,
        gameStart,
        setGameStart,
        matchedPair,
        score,
        setScore,
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
