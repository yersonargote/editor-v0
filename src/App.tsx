import React, { useEffect } from 'react';
import Split from 'react-split';
import { CodeEditor } from './components/Editor';
import { Console } from './components/Console';
import { ChallengeDescription } from './components/ChallengeDescription';
import { ChallengeList } from './components/ChallengeList';
import { EditorHeader } from './components/EditorHeader';

function App() {
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      if (event.message === 'ResizeObserver loop completed with undelivered notifications.') {
        event.stopImmediatePropagation();
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ChallengeList />
      
      <div className="flex-1 flex flex-col">
        <Split
          className="flex-1"
          direction="horizontal"
          sizes={[40, 60]}
          minSize={300}
          snapOffset={0}
          gutterSize={6}
          style={{ display: 'flex', height: 'calc(100vh - 300px)' }}
        >
          <div className="h-full overflow-auto bg-gray-800">
            <ChallengeDescription />
          </div>
          
          <div className="h-full flex flex-col">
            <EditorHeader />
            <div className="flex-1 relative">
              <CodeEditor />
            </div>
          </div>
        </Split>
        <Console />
      </div>
    </div>
  );
}

export default App;