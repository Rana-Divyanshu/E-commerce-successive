"use client";
import React, { useState } from "react";
import styles from "../../styles/game.module.css";
import Image from "next/image";

const RollTheDice = () => {
  const [scores, setScores] = useState([0, 0]);
  const [currentScore, setCurrentScore] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [playing, setPlaying] = useState(true);

  const resetGame = () => {
    setScores([0, 0]);
    setCurrentScore(0);
    setActivePlayer(0);
    setPlaying(true);
  };

  const switchPlayer = () => {
    setCurrentScore(0);
    setActivePlayer((prev) => (prev === 0 ? 1 : 0));
  };

  const rollDice = () => {
    if (playing) {
      const dice = Math.floor(Math.random() * 6) + 1;

      if (dice !== 1) {
        setCurrentScore((prev) => prev + dice);
      } else {
        switchPlayer();
      }
    }
  };

  const holdScore = () => {
    if (playing) {
      const newScores = [...scores];
      newScores[activePlayer] += currentScore;
      setScores(newScores);

      if (newScores[activePlayer] >= 100) {
        setPlaying(false);
      } else {
        switchPlayer();
      }
    }
  };

  return (
    <div className={styles.mainBody}>
      <main className={styles.main}>
        <section
          className={`${styles.player} ${
            activePlayer === 0 ? styles["player--active"] : ""
          } ${!playing && activePlayer === 0 ? styles["player--winner"] : ""}`}
        >
          <h2 className={styles.name}>Player 1</h2>
          <p className={styles.score}>{scores[0]}</p>
          <div className={styles.current}>
            <p className={styles["current-label"]}>Current</p>
            <p className={styles["current-score"]}>
              {activePlayer === 0 ? currentScore : 0}
            </p>
          </div>
        </section>
        <section
          className={`${styles.player} ${
            activePlayer === 1 ? styles["player--active"] : ""
          } ${!playing && activePlayer === 1 ? styles["player--winner"] : ""}`}
        >
          <h2 className={styles.name}>Player 2</h2>
          <p className={styles.score}>{scores[1]}</p>
          <div className={styles.current}>
            <p className={styles["current-label"]}>Current</p>
            <p className={styles["current-score"]}>
              {activePlayer === 1 ? currentScore : 0}
            </p>
          </div>
        </section>
        {playing && (
          <Image
            src={`/dices/dice-${Math.floor(Math.random() * 6) + 1}.png`}
            alt="Playing dice"
            height={100}
            width={100}
            className={styles.dice}
            priority
          />
        )}
        <button
          className={`${styles.btn} ${styles["btn--new"]} ${styles["game-btns"]}`}
          onClick={resetGame}
        >
          <span>🔄</span> New game
        </button>
        <button
          className={`${styles.btn} ${styles["btn--roll"]} ${styles["game-btns"]}`}
          onClick={rollDice}
        >
          <span>🎲</span> Roll dice
        </button>
        <button
          className={`${styles.btn} ${styles["btn--hold"]} ${styles["game-btns"]}`}
          onClick={holdScore}
        >
          <span>📥</span> Hold
        </button>
      </main>
    </div>
  );
};

export default RollTheDice;
