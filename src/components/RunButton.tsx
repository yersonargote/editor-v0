import React from 'react';
import { Play, Loader2 } from 'lucide-react';
import { useChallengeStore } from '../store/challengeStore';
import { fireConfetti } from '../utils/confetti';

export function RunButton() {
  const [isRunning, setIsRunning] = React.useState(false);
  const { code, addConsoleOutput, clearConsole, currentChallenge, markChallengeCompleted, incrementAttempts } = useChallengeStore();

  const runCode = async () => {
    if (!currentChallenge || isRunning) return;
    
    setIsRunning(true);
    clearConsole();
    incrementAttempts(currentChallenge.id);

    try {
      const userFunction = new Function(`return ${code}`)();
      let allTestsPassed = true;
      
      for (const [index, testCase] of currentChallenge.testCases.entries()) {
        try {
          const input = JSON.parse(`[${testCase.input}]`);
          const expected = JSON.parse(testCase.output);
          const result = userFunction(...input);
          const passed = JSON.stringify(result) === JSON.stringify(expected);
          
          addConsoleOutput({
            type: passed ? 'success' : 'error',
            content: `Test Case ${index + 1}:
  Input: ${testCase.input}
  Expected: ${testCase.output}
  Actual: ${JSON.stringify(result)}
  ${passed ? '✓ Passed' : '✗ Failed'}`
          });
          
          if (!passed) allTestsPassed = false;
        } catch (error) {
          allTestsPassed = false;
          addConsoleOutput({
            type: 'error',
            content: `Error in Test Case ${index + 1}: ${error.message}`
          });
        }
      }
      
      if (allTestsPassed) {
        markChallengeCompleted(currentChallenge.id);
        addConsoleOutput({
          type: 'success',
          content: '🎉 All test cases passed!'
        });
        fireConfetti();
      }
    } catch (error) {
      addConsoleOutput({
        type: 'error',
        content: `Compilation Error: ${error.message}`
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <button
      onClick={runCode}
      disabled={isRunning || !currentChallenge}
      className={`
        inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium
        transition-all duration-200 relative overflow-hidden
        ${isRunning ? 
          'bg-gray-600 cursor-not-allowed' : 
          'bg-green-600 hover:bg-green-700 active:bg-green-800'
        }
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isRunning ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Play size={18} />
      )}
      <span>{isRunning ? 'Running...' : 'Run Code'}</span>
    </button>
  );
}