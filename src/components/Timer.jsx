import React, { useState, useRef, useEffect } from 'react';

const Timer = () => {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const timerRef = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setTimeInSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (time) => String(time).padStart(2, '0');

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div className="timer">
      <div className="timer-display">
        <span>{formatTime(minutes)}:{formatTime(seconds)}</span>
      </div>
      <div className="timer-buttons">
        <button 
          onClick={startTimer} 
          disabled={isRunning}
          aria-label="Start Timer"
        >
          ▶️
        </button>
        <button 
          onClick={stopTimer} 
          disabled={!isRunning}
          aria-label="Pause Timer"
        >
          ⏸️
        </button>
        <button 
          onClick={resetTimer}
          aria-label="Reset Timer"
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default Timer;