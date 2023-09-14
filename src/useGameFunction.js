import React, { useState, useEffect } from "react";
import cardData from "./Card-flip.json";
import { MessageOutlined } from "@mui/icons-material";
export default function useFunction() {
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

  const handleChoice = (card) => {
    firstSelection ? setsecondSelection(card) : setfirstSelection(card);
  };

  const refreshWindow = () => window.location.reload(true);

  const pauseTimer = () => setIsPaused(true);
  const resumeTimer = () => setIsPaused(false);

  //after complete first quiz go the second quiz
  useEffect(() => {
    if (clickCount === 5) {
      setGameEnd(true);
   

      setIndex(index + 1);
    }
  }, [clickCount]);

  //seting the time limit for game
  useEffect(() => {
    if (!gameStart && !isPaused) {
      const timerId = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [gameStart, isPaused]);

  //restart the game when time limit is over
  useEffect(() => {
    if (timer === 0) {
      window.location.reload();
    }
  }, [timer]);

  //quiz start after 8 sec
  useEffect(() => {
    shuffleCards(images);
    setTimeout(() => {
      setGameStart(false);
    }, 8000);
  }, []);

  // function for card suffling using math function
  const images = cardData["Card-Flip"][index].imageSet;
  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.8)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
  };

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

  //initial matched image phase
  const resetTurn = () => {
    setfirstSelection(null);
    setsecondSelection(null);
    setDisabled(false);
  };

  //counting-time game start withing 3 sec
  useEffect(() => {
    const countingTime = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(countingTime);
  }, []);

  return {
    setIsPaused,
    disabled,
    pauseTimer,
    resumeTimer,
    shuffleCards,
    handleChoice,
    refreshWindow,
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
  };
}
