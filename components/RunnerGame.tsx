"use client";

import type React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

interface Obstacle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: "camera" | "equipment" | "rope";
}

interface LeaderboardEntry {
  email: string;
  score: number;
  timestamp: number;
}

// Update the game constants to be responsive
const getGameDimensions = () => {
  if (typeof window !== "undefined") {
    const width = Math.min(window.innerWidth - 32, 800); // 16px padding on each side
    const height = Math.min(width * 0.5, 400); // Maintain aspect ratio
    return { width, height };
  }
  return { width: 800, height: 400 };
};

const RunnerGame = ({ onBack }: { onBack: () => void }) => {
  const [gameState, setGameState] = useState<
    "start" | "playing" | "gameOver" | "leaderboard"
  >("start");
  const [score, setScore] = useState(0);
  const [playerY, setPlayerY] = useState(200);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameSpeed, setGameSpeed] = useState(2);
  const [isJumping, setIsJumping] = useState(false);
  const [email, setEmail] = useState("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [gameDimensions, setGameDimensions] = useState(getGameDimensions());

  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const obstacleIdRef = useRef(0);
  const { toast } = useToast();

  const GAME_HEIGHT = gameDimensions.height;
  const GAME_WIDTH = gameDimensions.width;
  const PLAYER_HEIGHT = Math.max(40, GAME_HEIGHT * 0.15);
  const PLAYER_WIDTH = Math.max(30, GAME_WIDTH * 0.05);
  const GROUND_Y = GAME_HEIGHT * 0.625;

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem("dharika-runway-leaderboard");
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setGameDimensions(getGameDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const jump = useCallback(() => {
    if (!isJumping && gameState === "playing") {
      setIsJumping(true);
      setPlayerY(GROUND_Y - 100);
      setTimeout(() => {
        setPlayerY(GROUND_Y);
        setIsJumping(false);
      }, 600);
    }
  }, [isJumping, gameState, GROUND_Y]);

  const createObstacle = useCallback(() => {
    const types: ("camera" | "equipment" | "rope")[] = [
      "camera",
      "equipment",
      "rope",
    ];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
      id: obstacleIdRef.current++,
      x: GAME_WIDTH,
      y: GROUND_Y - (type === "rope" ? 60 : 30),
      width: type === "rope" ? 20 : 40,
      height: type === "rope" ? 60 : 30,
      type,
    };
  }, [GAME_WIDTH, GROUND_Y]);

  const checkCollision = useCallback(
    (
      player: { x: number; y: number; width: number; height: number },
      obstacle: Obstacle
    ) => {
      return (
        player.x < obstacle.x + obstacle.width &&
        player.x + player.width > obstacle.x &&
        player.y < obstacle.y + obstacle.height &&
        player.y + player.height > obstacle.y
      );
    },
    []
  );

  const gameLoop = useCallback(() => {
    if (gameState !== "playing") return;

    setScore((prev) => prev + 1);
    setGameSpeed((prev) => Math.min(prev + 0.002, 6));

    setObstacles((prev) => {
      const newObstacles = prev
        .map((obstacle) => ({ ...obstacle, x: obstacle.x - gameSpeed }))
        .filter((obstacle) => obstacle.x + obstacle.width > 0);

      // Add new obstacles
      if (Math.random() < 0.02) {
        newObstacles.push(createObstacle());
      }

      // Check collisions
      const player = {
        x: 100,
        y: playerY,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      };
      const collision = newObstacles.some((obstacle) =>
        checkCollision(player, obstacle)
      );

      if (collision) {
        setGameState("gameOver");
        return prev;
      }

      return newObstacles;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [
    gameState,
    gameSpeed,
    playerY,
    PLAYER_WIDTH,
    PLAYER_HEIGHT,
    createObstacle,
    checkCollision,
  ]);

  useEffect(() => {
    if (gameState === "playing") {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState, gameLoop]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
    };

    if (gameState === "playing") {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jump, gameState]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setObstacles([]);
    setGameSpeed(2);
    setPlayerY(GROUND_Y);
    setIsJumping(false);
    obstacleIdRef.current = 0;
  };

  const submitScore = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast({
        title: "Please enter your email",
        description: "We need your email to add you to the leaderboard!",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Please enter a valid email",
        description: "Make sure your email is in the correct format.",
        variant: "destructive",
      });
      return;
    }

    const newEntry: LeaderboardEntry = {
      email,
      score,
      timestamp: Date.now(),
    };

    const updatedLeaderboard = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    setLeaderboard(updatedLeaderboard);
    localStorage.setItem(
      "dharika-runway-leaderboard",
      JSON.stringify(updatedLeaderboard)
    );
    setEmailSubmitted(true);

    toast({
      title: "Score submitted! 🏆",
      description: "You've been added to the Dharika Runway leaderboard!",
    });

    setTimeout(() => {
      setGameState("leaderboard");
    }, 1500);
  };

  const getObstacleEmoji = (type: string) => {
    switch (type) {
      case "camera":
        return "📸";
      case "equipment":
        return "⚡";
      case "rope":
        return "🪢";
      default:
        return "📸";
    }
  };

  if (gameState === "start") {
    return (
      <div className="bg-dharika-gradient min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-xs sm:max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl animate-scale-in">
          <div className="text-4xl sm:text-6xl mb-4 animate-bounce-gentle">
            👗
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-dharika-text mb-4 hover:text-dharika-gold transition-colors duration-300">
            Dharika Runway Runner
          </h2>
          <p className="text-dharika-text-light mb-6 leading-relaxed text-sm sm:text-base">
            Help our model navigate the runway! Jump over obstacles and see how
            far you can go. After the game, submit your email to join our
            exclusive leaderboard!
          </p>
          <div className="space-y-3 sm:space-y-4">
            <button
              onClick={startGame}
              className="w-full bg-dharika-text text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              🚀 Start Running
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-200 text-dharika-text px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-gray-300 transition-all duration-300 hover:scale-105 active:scale-95 text-sm sm:text-base"
            >
              ← Back to Site
            </button>
          </div>
          <p className="text-xs sm:text-sm text-dharika-text-light mt-4 animate-pulse">
            Press SPACE or ↑ to jump • Tap to jump on mobile
          </p>
        </div>
      </div>
    );
  }

  if (gameState === "leaderboard") {
    return (
      <div className="bg-dharika-gradient min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          <div className="w-16 h-16 text-dharika-gold mx-auto mb-4">🏆</div>
          <h2 className="text-3xl font-serif font-bold text-dharika-text mb-6">
            Leaderboard
          </h2>
          <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  {index < 3 && (
                    <div className="w-4 h-4 text-dharika-gold">⭐</div>
                  )}
                  <span className="font-medium">#{index + 1}</span>
                  <span className="text-sm text-dharika-text-light truncate max-w-32">
                    {entry.email.split("@")[0]}
                  </span>
                </div>
                <span className="font-bold text-dharika-text">
                  {entry.score}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-dharika-text text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-200 text-dharika-text px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition-all duration-300"
            >
              Back to Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "gameOver") {
    return (
      <div className="bg-dharika-gradient min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
          {emailSubmitted ? (
            <div className="animate-scale-in">
              <div className="w-16 h-16 text-dharika-gold mx-auto mb-4">🏆</div>
              <h2 className="text-3xl font-serif font-bold text-dharika-text mb-4">
                Score Submitted! 🎉
              </h2>
              <p className="text-lg text-dharika-text-light mb-6">
                Final Score:{" "}
                <span className="font-bold text-dharika-text">{score}</span>
              </p>
              <p className="text-dharika-text-light mb-6">
                You're now on the Dharika Runway leaderboard! Check back to see
                your ranking.
              </p>
            </div>
          ) : (
            <>
              <div className="text-6xl mb-4">💥</div>
              <h2 className="text-3xl font-serif font-bold text-dharika-text mb-4">
                Game Over!
              </h2>
              <p className="text-lg text-dharika-text-light mb-6">
                Final Score:{" "}
                <span className="font-bold text-dharika-text">{score}</span>
              </p>
              <p className="text-dharika-text-light mb-6">
                Submit your email to join the Dharika Runway leaderboard!
              </p>

              <form onSubmit={submitScore} className="space-y-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dharika-text-light w-5 h-5">
                    ✉️
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 border-2 border-dharika-sage/30 rounded-xl focus:border-dharika-gold focus:outline-none transition-all duration-300"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-dharika-text text-white px-6 py-3 rounded-xl font-medium hover:bg-opacity-90 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
                >
                  Join Leaderboard
                  <div className="w-5 h-5">→</div>
                </button>
              </form>
            </>
          )}

          <div className="mt-6 space-y-3">
            <button
              onClick={startGame}
              className="w-full bg-dharika-gold text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300"
            >
              Play Again
            </button>
            <button
              onClick={onBack}
              className="w-full bg-gray-200 text-dharika-text px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition-all duration-300"
            >
              Back to Site
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dharika-gradient min-h-screen flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-xl max-w-full">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="text-lg sm:text-xl font-bold text-dharika-text animate-pulse">
            Score: {score}
          </div>
          <button
            onClick={() => setGameState("gameOver")}
            className="text-dharika-text-light hover:text-dharika-text transition-colors text-sm sm:text-base px-2 py-1 rounded hover:bg-gray-100"
          >
            ⏸️ Pause
          </button>
        </div>

        <div
          ref={gameRef}
          className="relative bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg sm:rounded-xl overflow-hidden cursor-pointer border-2 border-dharika-sage/20 hover:border-dharika-gold/50 transition-colors duration-300"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
          onClick={jump}
          onTouchStart={(e) => {
            e.preventDefault();
            jump();
          }}
        >
          {/* Runway background with responsive elements */}
          <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-gray-200 to-transparent"></div>

          {/* Animated runway lines */}
          <div className="absolute bottom-0 w-full h-0.5 bg-gray-400 animate-pulse"></div>
          <div className="absolute bottom-4 w-full h-0.5 bg-gray-300 opacity-50"></div>

          {/* Player (Model) with responsive sizing */}
          <div
            className="absolute transition-all duration-150 ease-out flex items-center justify-center"
            style={{
              left: GAME_WIDTH * 0.125, // 12.5% from left
              top: playerY - PLAYER_HEIGHT,
              width: PLAYER_WIDTH,
              height: PLAYER_HEIGHT,
              transform: isJumping
                ? "rotate(-10deg) scale(1.1)"
                : "rotate(0deg) scale(1)",
              fontSize: `${Math.max(24, PLAYER_HEIGHT * 0.6)}px`,
            }}
          >
            👗
          </div>

          {/* Obstacles with responsive sizing */}
          {obstacles.map((obstacle) => (
            <div
              key={obstacle.id}
              className="absolute flex items-center justify-center animate-pulse"
              style={{
                left: obstacle.x,
                top: obstacle.y - obstacle.height,
                width: obstacle.width,
                height: obstacle.height,
                fontSize: `${Math.max(16, obstacle.height * 0.5)}px`,
              }}
            >
              {getObstacleEmoji(obstacle.type)}
            </div>
          ))}

          {/* Ground line */}
          <div
            className="absolute w-full border-t-2 border-dashed border-gray-400 animate-pulse"
            style={{ top: GROUND_Y }}
          ></div>

          {/* Speed indicator */}
          <div className="absolute top-2 left-2 text-xs sm:text-sm text-dharika-text-light bg-white/50 px-2 py-1 rounded">
            Speed: {gameSpeed.toFixed(1)}x
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-dharika-text-light mt-3 sm:mt-4 animate-pulse">
          <span className="hidden sm:inline">
            Click the game area or press SPACE/↑ to jump!
          </span>
          <span className="sm:hidden">Tap to jump!</span>
        </p>
      </div>
    </div>
  );
};

export default RunnerGame;
