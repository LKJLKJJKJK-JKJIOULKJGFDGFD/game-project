import React, { useState, useEffect, useRef } from 'react';
import Ball from './components/Ball';
import Slider from './components/Slider';
import './App.css';

function App() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [missedBalls, setMissedBalls] = useState(0);
  const [balls, setBalls] = useState([{ id: 1, color: 'red' }]);
  
  // Use refs for continuous movement
  const ballsRef = useRef([{ 
    id: 1, 
    position: { x: 100, y: 0 }, 
    velocity: { x: 3, y: 3 },
    color: 'red'
  }]);
  const sliderRef = useRef(100);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const ballCountRef = useRef(1);

  const BALL_COLORS = ['red', 'green', 'blue', 'yellow', 'orange', 'violet'];
  
  const getRandomColor = () => {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'violet', 'pink', 'cyan', 'magenta'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleMouseMove = (e) => {
    const gameContainer = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - gameContainer.left;
    sliderRef.current = Math.max(0, Math.min(mouseX - 50, window.innerWidth - 100));
  };

  // Add new ball every 15 seconds
  useEffect(() => {
    if (gameOver) return;

    const addBallInterval = setInterval(() => {
      ballCountRef.current += 1;
      const newBall = {
        id: ballCountRef.current,
        position: { x: Math.random() * (window.innerWidth - 20), y: 0 },
        velocity: { x: 3, y: 3 },
        color: ballCountRef.current <= 6 ? BALL_COLORS[ballCountRef.current - 1] : getRandomColor()
      };
      ballsRef.current = [...ballsRef.current, newBall];
      setBalls(prev => [...prev, { id: newBall.id, color: newBall.color }]);
    }, 15000);

    return () => clearInterval(addBallInterval);
  }, [gameOver]);

  const updateGame = (time) => {
    if (previousTimeRef.current != undefined) {
      if (!gameOver) {
        const deltaTime = (time - previousTimeRef.current) / 16;
        
        // Update all balls
        ballsRef.current = ballsRef.current.map(ball => {
          let newX = ball.position.x + ball.velocity.x * deltaTime;
          let newY = ball.position.y + ball.velocity.y * deltaTime;

          // Wall collisions
          if (newX <= 0 || newX >= window.innerWidth - 20) {
            ball.velocity.x = -ball.velocity.x;
            newX = Math.max(0, Math.min(newX, window.innerWidth - 20));
          }

          // Ceiling collision
          if (newY <= 0) {
            ball.velocity.y = Math.abs(ball.velocity.y);
            newY = 0;
          }

          // Slider collision
          const sliderY = window.innerHeight - 30;
          if (newY + 20 >= sliderY && newY < sliderY + 10) {
            if (newX >= sliderRef.current - 20 && newX <= sliderRef.current + 100) {
              const hitPosition = (newX - sliderRef.current) / 100;
              const angle = -45 + hitPosition * 90;
              const speed = 5;
              
              ball.velocity.x = speed * Math.sin(angle * Math.PI / 180);
              ball.velocity.y = -speed * Math.cos(angle * Math.PI / 180);
              
              newY = sliderY - 20;
            }
          } else if (newY >= window.innerHeight - 20) {
            // Ball missed
            setMissedBalls(prev => {
              if (prev + 1 >= 3) setGameOver(true);
              return prev + 1;
            });
            return null;
          }

          return { ...ball, position: { x: newX, y: newY } };
        }).filter(ball => ball !== null);

        setScore(prev => prev + 1);
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updateGame);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameOver]);

  const resetGame = () => {
    ballsRef.current = [{
      id: 1,
      position: { x: 100, y: 0 },
      velocity: { x: 3, y: 3 },
      color: 'red'
    }];
    ballCountRef.current = 1;
    sliderRef.current = 100;
    setBalls([{ id: 1, color: 'red' }]);
    setScore(0);
    setMissedBalls(0);
    setGameOver(false);
  };

  return (
    <div className="App" onMouseMove={handleMouseMove} style={{ cursor: 'none' }}>
      <div className="game-container">
        <div className="score">Score: {score}</div>
        <div className="lives">Lives: {3 - missedBalls}</div>
        {gameOver && (
          <div className="game-over">
            Game Over! Final Score: {score}
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
        {ballsRef.current.map(ball => (
          <Ball key={ball.id} position={ball.position} color={ball.color} />
        ))}
        <Slider position={sliderRef.current} />
      </div>
    </div>
  );
}

export default App;