import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { challenges } from '../data/challenges';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  code: string;
  testCases: Array<{
    input: string;
    output: string;
  }>;
  hints: string[];
  timeComplexity?: string;
  spaceComplexity?: string;
}

interface ChallengeStore {
  challenges: Challenge[];
  currentChallenge: Challenge | null;
  userProgress: Record<string, { 
    code: string; 
    completed: boolean;
    timeSpent: number;
    attempts: number;
    lastAttempt: number;
    notes: string;
  }>;
  theme: 'vs-dark' | 'light';
  fontSize: number;
  showHints: boolean;
  consoleOutput: Array<{ type: 'info' | 'error' | 'success'; content: string; timestamp: number }>;
  setCurrentChallenge: (challenge: Challenge) => void;
  updateCode: (code: string) => void;
  addConsoleOutput: (output: { type: 'info' | 'error' | 'success'; content: string }) => void;
  clearConsole: () => void;
  markChallengeCompleted: (challengeId: string) => void;
  toggleTheme: () => void;
  setFontSize: (size: number) => void;
  toggleHints: () => void;
  updateNotes: (challengeId: string, notes: string) => void;
  incrementAttempts: (challengeId: string) => void;
  updateTimeSpent: (challengeId: string, seconds: number) => void;
}

export const useChallengeStore = create<ChallengeStore>()(
  persist(
    (set) => ({
      challenges,
      currentChallenge: challenges[0],
      userProgress: {},
      theme: 'vs-dark',
      fontSize: 14,
      showHints: false,
      consoleOutput: [],
      setCurrentChallenge: (challenge) => 
        set((state) => ({ 
          currentChallenge: challenge,
          code: state.userProgress[challenge.id]?.code || challenge.code
        })),
      updateCode: (code) => 
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [state.currentChallenge!.id]: {
              ...state.userProgress[state.currentChallenge!.id],
              code
            }
          }
        })),
      addConsoleOutput: (output) =>
        set((state) => ({
          consoleOutput: [
            ...state.consoleOutput,
            { ...output, timestamp: Date.now() }
          ].slice(-100)
        })),
      clearConsole: () => set({ consoleOutput: [] }),
      markChallengeCompleted: (challengeId) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [challengeId]: {
              ...state.userProgress[challengeId],
              completed: true,
              lastAttempt: Date.now()
            }
          }
        })),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'vs-dark' ? 'light' : 'vs-dark'
        })),
      setFontSize: (fontSize) => set({ fontSize }),
      toggleHints: () => set((state) => ({ showHints: !state.showHints })),
      updateNotes: (challengeId, notes) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [challengeId]: {
              ...state.userProgress[challengeId],
              notes
            }
          }
        })),
      incrementAttempts: (challengeId) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [challengeId]: {
              ...state.userProgress[challengeId],
              attempts: (state.userProgress[challengeId]?.attempts || 0) + 1
            }
          }
        })),
      updateTimeSpent: (challengeId, seconds) =>
        set((state) => ({
          userProgress: {
            ...state.userProgress,
            [challengeId]: {
              ...state.userProgress[challengeId],
              timeSpent: (state.userProgress[challengeId]?.timeSpent || 0) + seconds
            }
          }
        }))
    }),
    {
      name: 'coding-challenge-storage',
      partialize: (state) => ({
        userProgress: state.userProgress,
        theme: state.theme,
        fontSize: state.fontSize
      })
    }
  )
);