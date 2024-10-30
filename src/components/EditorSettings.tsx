import React from 'react';
import { Settings, Sun, Moon } from 'lucide-react';
import { useChallengeStore } from '../store/challengeStore';

export function EditorSettings() {
  const { theme, fontSize, toggleTheme, setFontSize } = useChallengeStore();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggleTheme}
        className="p-2 hover:bg-gray-700 rounded-md"
        title={theme === 'vs-dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {theme === 'vs-dark' ? <Sun size={16} /> : <Moon size={16} />}
      </button>
      
      <div className="flex items-center gap-2">
        <Settings size={16} />
        <select
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          className="bg-gray-700 rounded px-2 py-1 text-sm"
        >
          {[12, 14, 16, 18, 20].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}