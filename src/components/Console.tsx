import React from 'react';
import { useChallengeStore } from '../store/challengeStore';
import { Terminal, XCircle } from 'lucide-react';

export function Console() {
  const { consoleOutput, clearConsole } = useChallengeStore();

  const getOutputClass = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-400';
      case 'success':
        return 'text-green-400';
      default:
        return 'text-gray-300';
    }
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="h-64 bg-gray-900 border-t border-gray-700">
      <div className="p-2 border-b border-gray-700 flex justify-between items-center bg-gray-800">
        <div className="flex items-center gap-2">
          <Terminal size={16} className="text-gray-400" />
          <h3 className="text-sm font-semibold">Console Output</h3>
        </div>
        <button
          onClick={clearConsole}
          className="p-1 hover:bg-gray-700 rounded-md text-gray-400 hover:text-gray-200"
          title="Clear console"
        >
          <XCircle size={16} />
        </button>
      </div>
      <div className="p-4 font-mono text-sm overflow-y-auto h-[calc(100%-40px)] bg-gray-900">
        {consoleOutput.map(({ type, content, timestamp }, index) => (
          <div key={index} className={`mb-1 flex items-start gap-2 ${getOutputClass(type)}`}>
            <span className="text-gray-500 text-xs whitespace-nowrap">
              {formatTimestamp(timestamp)}
            </span>
            <span className="whitespace-pre-wrap break-words flex-1">{content}</span>
          </div>
        ))}
        {consoleOutput.length === 0 && (
          <div className="text-gray-500 italic">No output yet...</div>
        )}
      </div>
    </div>
  );
}