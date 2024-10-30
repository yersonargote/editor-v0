import React from 'react';
import { useChallengeStore } from '../store/challengeStore';
import { Timer } from './Timer';
import { Notes } from './Notes';
import { Lightbulb } from 'lucide-react';

export function ChallengeDescription() {
  const { currentChallenge, showHints, toggleHints, userProgress } = useChallengeStore();

  if (!currentChallenge) return null;

  const progress = userProgress[currentChallenge.id] || {};

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex-1 overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold">{currentChallenge.title}</h1>
          <Timer />
        </div>
        
        <div className="flex gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-sm ${
            currentChallenge.difficulty === 'Easy' ? 'bg-green-600' :
            currentChallenge.difficulty === 'Medium' ? 'bg-yellow-600' :
            'bg-red-600'
          }`}>
            {currentChallenge.difficulty}
          </span>
          {currentChallenge.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 rounded text-sm bg-gray-700">
              {tag}
            </span>
          ))}
        </div>

        {progress.attempts > 0 && (
          <div className="mb-4 text-sm text-gray-400">
            Attempts: {progress.attempts} | Time spent: {Math.floor(progress.timeSpent / 60)} min
          </div>
        )}

        <div className="prose prose-invert">
          <p>{currentChallenge.description}</p>
        </div>

        {currentChallenge.hints && (
          <div className="mt-6">
            <button
              onClick={toggleHints}
              className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400"
            >
              <Lightbulb size={16} />
              <span>{showHints ? 'Hide Hints' : 'Show Hints'}</span>
            </button>
            {showHints && (
              <ul className="mt-2 space-y-2 text-yellow-500">
                {currentChallenge.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Example Test Cases:</h3>
          {currentChallenge.testCases.map((testCase, index) => (
            <div key={index} className="bg-gray-700 p-4 rounded-lg mb-2">
              <div>
                <span className="text-gray-400">Input: </span>
                <code className="text-green-400">{testCase.input}</code>
              </div>
              <div>
                <span className="text-gray-400">Output: </span>
                <code className="text-blue-400">{testCase.output}</code>
              </div>
            </div>
          ))}
        </div>

        {currentChallenge.timeComplexity && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Complexity Analysis:</h3>
            <div className="bg-gray-700 p-4 rounded-lg">
              <div className="mb-2">
                <span className="text-gray-400">Time Complexity: </span>
                <code className="text-purple-400">{currentChallenge.timeComplexity}</code>
              </div>
              {currentChallenge.spaceComplexity && (
                <div>
                  <span className="text-gray-400">Space Complexity: </span>
                  <code className="text-purple-400">{currentChallenge.spaceComplexity}</code>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Notes />
    </div>
  );
}