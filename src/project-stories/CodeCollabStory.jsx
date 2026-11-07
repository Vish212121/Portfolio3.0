import { useState } from 'react';
import { StoryFrame } from './StoryFrame.jsx';

export default function CodeCollabStory() {
  const [hasFunction, setHasFunction] = useState(false);
  const [hasCall, setHasCall] = useState(false);
  const [ran, setRan] = useState(false);
  const [lastEditor, setLastEditor] = useState(null);

  const lines = ['// Interview task: add two numbers'];
  if (hasFunction) lines.push('const sum = (a, b) => a + b;   // A');
  if (hasCall) lines.push('console.log(sum(2, 3));        // B');
  const code = lines.join('\n');

  const addFunction = () => {
    setHasFunction(true);
    setLastEditor('A');
    setRan(false);
  };
  const addCall = () => {
    setHasCall(true);
    setLastEditor('B');
    setRan(false);
  };
  const reset = () => {
    setHasFunction(false);
    setHasCall(false);
    setRan(false);
    setLastEditor(null);
  };

  return (
    <StoryFrame
      className="cc-story"
      problem="An interviewer and a candidate need to work in the same coding session."
      outcome="Each edit appears for both people, and they can run the shared code together."
    >
      <div className="story-section-heading">
        <span>BUILD ONE SHARED PROGRAM</span>
        <small>Illustrative interview session</small>
      </div>
      <div className="cc-controls">
        <button type="button" onClick={addFunction} disabled={hasFunction}>A adds the function</button>
        <button type="button" onClick={addCall} disabled={hasCall}>B adds the test call</button>
        <button type="button" className="cc-reset" onClick={reset}>Reset example</button>
      </div>

      <div className="cc-session" aria-live="polite">
        <section className={lastEditor === 'A' ? 'cc-client is-editing' : 'cc-client'}>
          <div className="cc-client-header"><strong>CLIENT A</strong><span>INTERVIEWER</span></div>
          <pre>{code}</pre>
        </section>
        <div className="cc-sync-bridge">
          <span aria-hidden="true">↔</span>
          <strong>ONE SHARED DOCUMENT</strong>
          <small>Yjs syncs edits through the session</small>
        </div>
        <section className={lastEditor === 'B' ? 'cc-client is-editing' : 'cc-client'}>
          <div className="cc-client-header"><strong>CLIENT B</strong><span>CANDIDATE</span></div>
          <pre>{code}</pre>
        </section>
      </div>
      <p className="cc-sync-note">{lastEditor ? 'Client ' + lastEditor + ' edited the document. Both clients now show the same code.' : 'Choose an edit above. Watch it appear in both editors.'}</p>

      <div className="cc-execution">
        <div className="cc-execution-path">
          <span>SHARED CODE</span><span aria-hidden="true">→</span><span>SERVER EXECUTION</span><span aria-hidden="true">→</span><span>BOTH CLIENTS SEE OUTPUT</span>
        </div>
        <div className="cc-run-row">
          <button type="button" className="story-primary" onClick={() => setRan(true)} disabled={!hasFunction || !hasCall}>Run shared code →</button>
          <div className="cc-output" aria-live="polite">
            <small>OUTPUT · ILLUSTRATIVE</small>
            <strong>{ran ? '5' : hasFunction && hasCall ? 'Ready to run' : 'Add both edits to run'}</strong>
          </div>
        </div>
      </div>
    </StoryFrame>
  );
}
