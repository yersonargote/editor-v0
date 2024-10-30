import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { useChallengeStore } from '../store/challengeStore';
import { EditorSettings } from './EditorSettings';

export function CodeEditor() {
  const { code, updateCode, theme, fontSize } = useChallengeStore();
  const editorRef = useRef(null);

  useEffect(() => {
    const handler = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  return (
    <div className="h-full w-full" style={{ minHeight: '300px' }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme={theme}
        value={code}
        onChange={(value) => updateCode(value || '')}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          wrappingStrategy: 'advanced',
          suggest: {
            showKeywords: true,
            showSnippets: true,
          },
          quickSuggestions: true,
        }}
      />
    </div>
  );
}