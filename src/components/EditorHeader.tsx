import React from 'react';
import { RunButton } from './RunButton';
import { EditorSettings } from './EditorSettings';

export function EditorHeader() {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur supports-[backdrop-filter]:bg-gray-800/50">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Code Editor</h2>
        <RunButton />
      </div>
      <EditorSettings />
    </div>
  );
}