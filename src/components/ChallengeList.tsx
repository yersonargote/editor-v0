import React from 'react';
import { useChallengeStore } from '../store/challengeStore';
import { CheckCircle2 } from 'lucide-react';

export function ChallengeList() {
  const { challenges, currentChallenge, setCurrentChallenge, userProgress } = useChallengeStore();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Hard':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="w-72 bg-gray-900 p-4 overflow-y-auto border-r border-gray-700">
      <h2 className="text-xl font-bold mb-4">Challenges</h2>
      <div className="space-y-2">
        {challenges.map((challenge) => {
          const isCompleted = userProgress[challenge.id]?.completed;
          
          return (
            <button
              key={challenge.id}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentChallenge?.id === challenge.id
                  ? 'bg-blue-600'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => setCurrentChallenge(challenge)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{challenge.title}</span>
                {isCompleted && (
                  <CheckCircle2 size={16} className="text-green-400" />
                )}
              </div>
              <div className="text-sm mt-1 flex items-center gap-2">
                <span className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </span>
                <span className="text-gray-400">·</span>
                <span className="text-gray-400">{challenge.tags.join(', ')}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}