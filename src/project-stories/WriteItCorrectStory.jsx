import { useState } from 'react';
import { FlowArrow, StoryFrame } from './StoryFrame.jsx';

const EXAMPLES = {
  fix: {
    label: 'Fix a grammar issue',
    before: ['The report ', 'contain', ' three errors.'],
    replacement: 'contains',
    reason: 'The singular subject needs “contains.”',
    action: 'Precise fix',
  },
  rewrite: {
    label: 'Rewrite selected text',
    before: ['', 'Send the draft ASAP.', ''],
    replacement: 'Please send the draft as soon as possible.',
    reason: 'A more formal tone, with the same request.',
    action: 'Formal rewrite',
  },
};

export default function WriteItCorrectStory() {
  const [mode, setMode] = useState('fix');
  const [applied, setApplied] = useState(false);
  const example = EXAMPLES[mode];

  const selectMode = next => {
    setMode(next);
    setApplied(false);
  };

  return (
    <StoryFrame
      className="wic-story"
      problem="A writing mistake sits inside the page you are already using."
      outcome="The extension suggests a targeted change and applies it in that same editor."
    >
      <div className="story-section-heading">
        <span>TRY IT IN A SAMPLE EDITOR</span>
        <small>Illustrative text · no external request</small>
      </div>
      <div className="story-choices" role="group" aria-label="Choose a writing action">
        {Object.entries(EXAMPLES).map(([key, item]) => (
          <button type="button" key={key} aria-pressed={mode === key} onClick={() => selectMode(key)}>{item.label}</button>
        ))}
      </div>

      <div className="wic-explainer" key={mode}>
        <section className="story-card wic-editor-card">
          <span className="story-step-label">01 / TEXT ON THE PAGE</span>
          <div className="wic-browser-bar"><span aria-hidden="true">● ● ●</span> SAMPLE WEB EDITOR</div>
          <p>{example.before[0]}<mark>{example.before[1]}</mark>{example.before[2]}</p>
          <small>The highlighted span is the only part selected for change.</small>
        </section>
        <FlowArrow label="suggest" />
        <section className="story-card wic-suggestion-card">
          <span className="story-step-label">02 / EXTENSION SUGGESTION</span>
          <span className="wic-action-type">{example.action}</span>
          <div className="wic-replacement">
            <del>{example.before[1]}</del>
            <span aria-hidden="true">→</span>
            <ins>{example.replacement}</ins>
          </div>
          <small>{example.reason}</small>
          <button type="button" className="story-primary" onClick={() => setApplied(true)} disabled={applied}>
            {applied ? 'Applied in editor ✓' : 'Apply this change →'}
          </button>
        </section>
        <FlowArrow label="apply" />
        <section className={applied ? 'story-card wic-result-card is-applied' : 'story-card wic-result-card'}>
          <span className="story-step-label">03 / SAME EDITOR</span>
          <div className="wic-browser-bar"><span aria-hidden="true">● ● ●</span> SAMPLE WEB EDITOR</div>
          <p>{example.before[0]}<mark className={applied ? '' : 'is-original'}>{applied ? example.replacement : example.before[1]}</mark>{example.before[2]}</p>
          <small aria-live="polite">{applied ? 'Change applied; surrounding text stays in place.' : 'Text is unchanged. Click Apply to update this editor.'}</small>
        </section>
      </div>
      <p className="story-footnote">The extension checks that a suggestion still matches the current text before applying it.</p>
    </StoryFrame>
  );
}
