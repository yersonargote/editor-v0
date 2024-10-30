import React from 'react';
import { FileText } from 'lucide-react';
import { useChallengeStore } from '../store/challengeStore';

export function Notes() {
  const { currentChallenge, userProgress, updateNotes } = useChallengeStore();

  if (!currentChallenge) return null;

  const notes = userProgress[currentChallenge.id]?.notes || '';

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex items-center gap-2 mb-2">
        <FileText size={16} />
        <h3 className="font-semibold">Personal Notes</h3>
      </div>
      <textarea
        value={notes}
        onChange={(e) => updateNotes(currentChallenge.id, e.target.value)}
        placeholder="Add your notes here..."
        className="w-full h-32 bg-gray-800 border border-gray-700 rounded-md p-2 text-sm resize-none"
      />
    </div>
  );
}