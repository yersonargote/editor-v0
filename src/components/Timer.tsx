import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { useChallengeStore } from '../store/challengeStore';

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const { currentChallenge, updateTimeSpent } = useChallengeStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    return () => {
      if (currentChallenge) {
        updateTimeSpent(currentChallenge.id, seconds);
      }
      clearInterval(interval);
    };
  }, [currentChallenge?.id]);

  useEffect(() => {
    setSeconds(0);
  }, [currentChallenge?.id]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-gray-400">
      <Clock size={16} />
      <span>{formatTime(seconds)}</span>
    </div>
  );
}