import { useState } from 'react';
import { FlowArrow, StoryFrame } from './StoryFrame.jsx';

const EXAMPLES = {
  impact: {
    label: 'Dependency impact',
    question: 'If auth.py changes, what else should I check?',
    nodes: [
      ['auth.py', 'changed file'],
      ['imported by', 'graph relation'],
      ['api/routes.py', 'dependent file'],
    ],
    answer: 'In this sample snapshot, api/routes.py imports auth.py. That route is a place to review after the change.',
    evidence: 'files/auth.py → imports → files/api/routes.py',
  },
  history: {
    label: 'File history',
    question: 'How has auth.py changed?',
    nodes: [
      ['auth.py', 'file'],
      ['changed in', 'graph relation'],
      ['commit a13f', 'commit'],
    ],
    answer: 'Follow auth.py to the commits that changed it, then inspect the linked diff before drawing a conclusion.',
    evidence: 'files/auth.py → changed_in → commits/a13f',
  },
  review: {
    label: 'Reviewer activity',
    question: 'Who reviewed the auth.py change?',
    nodes: [
      ['commit a13f', 'change'],
      ['reviewed by', 'graph relation'],
      ['reviewer', 'contributor'],
    ],
    answer: 'The change can be connected to review activity and its source record in the same repository snapshot.',
    evidence: 'commits/a13f → reviewed_by → contributors/reviewer',
  },
};

export default function RepoBrainStory() {
  const [mode, setMode] = useState('impact');
  const example = EXAMPLES[mode];

  return (
    <StoryFrame
      className="rb-story"
      problem="A codebase answer is hard to trust when you cannot see where it came from."
      outcome="Ask a question, trace the repository relationship, and keep the source evidence with the answer."
    >
      <div className="story-section-heading">
        <span>TRY A SAMPLE QUESTION</span>
        <small>Example repository · snapshot S1</small>
      </div>
      <div className="story-choices" role="group" aria-label="Choose a RepoBrain question">
        {Object.entries(EXAMPLES).map(([key, item]) => (
          <button type="button" key={key} aria-pressed={key === mode} onClick={() => setMode(key)}>{item.label}</button>
        ))}
      </div>

      <div className="rb-explainer" key={mode} aria-live="polite">
        <section className="story-card rb-question-card">
          <span className="story-step-label">01 / ASK</span>
          <strong>{example.question}</strong>
          <small>Natural-language engineering question</small>
        </section>
        <FlowArrow label="trace" />
        <section className="story-card rb-graph-card">
          <span className="story-step-label">02 / FOLLOW THE GRAPH</span>
          <div className="rb-graph-path">
            {example.nodes.map(([name, kind], index) => (
              <div className="rb-path-part" key={name}>
                {index > 0 && <span className="rb-path-connector" aria-hidden="true">→</span>}
                <div className={index === 1 ? 'rb-relation' : 'rb-node'}>
                  <strong>{name}</strong>
                  <small>{kind}</small>
                </div>
              </div>
            ))}
          </div>
          <small>FalkorDB stores files, commits, people, and their relationships.</small>
        </section>
        <FlowArrow label="explain" />
        <section className="story-card rb-answer-card">
          <span className="story-step-label">03 / ANSWER WITH EVIDENCE</span>
          <p>{example.answer}</p>
        </section>
      </div>
      <div className="story-evidence">
        <span>SOURCE RECEIPT</span>
        <code>{example.evidence}</code>
        <small>Illustrative path and relationship. RepoBrain links answers to source URLs and snapshot context.</small>
      </div>
    </StoryFrame>
  );
}
