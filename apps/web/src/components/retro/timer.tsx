"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
}

export function Timer({ duration, onComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16">
        {/* Background circle */}
        <svg className="h-16 w-16 -rotate-90" viewBox="0 0 36 36">
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="#2a2a3a"
            strokeWidth="3"
          />
          <path
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="3"
            strokeDasharray={`${progress}, 100`}
          />
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#ff00ff" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <Button size="sm" onClick={() => setIsRunning(true)}>
            Start
          </Button>
        ) : (
          <Button size="sm" variant="secondary" onClick={() => setIsRunning(false)}>
            Pause
          </Button>
        )}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(duration);
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
