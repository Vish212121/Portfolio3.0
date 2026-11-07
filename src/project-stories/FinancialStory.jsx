import { useState } from 'react';
import { StoryFrame } from './StoryFrame.jsx';

const HEADLINES = [
  {
    headline: 'Revenue rises as demand improves',
    tokens: ['revenue', 'rises', 'demand', 'improves'],
    label: 'Positive',
    signal: 'Growth language points toward a positive example.',
  },
  {
    headline: 'Company schedules quarterly meeting',
    tokens: ['company', 'schedules', 'quarterly', 'meeting'],
    label: 'Neutral',
    signal: 'The headline states an event without a clear gain or loss.',
  },
  {
    headline: 'Profit falls after supply disruption',
    tokens: ['profit', 'falls', 'supply', 'disruption'],
    label: 'Negative',
    signal: 'Decline and disruption point toward a negative example.',
  },
];

export default function FinancialStory() {
  const [selected, setSelected] = useState(0);
  const sample = HEADLINES[selected];

  return (
    <StoryFrame
      className="fn-story"
      problem="A stream of financial headlines is too large to read and compare by hand."
      outcome="Turn each headline into a sentiment signal that can be studied alongside stock trends."
    >
      <div className="story-section-heading">
        <span>FOLLOW ONE HEADLINE</span>
        <small>Choose an illustrative example</small>
      </div>
      <div className="story-choices fn-headline-choices" role="group" aria-label="Choose a financial headline">
        {HEADLINES.map((item, index) => (
          <button type="button" key={item.headline} aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.headline}</button>
        ))}
      </div>

      <div className="fn-news-slip" aria-live="polite">
        <span>INPUT / NEWS HEADLINE</span>
        <strong>“{sample.headline}”</strong>
      </div>

      <div className="fn-pipeline" key={selected}>
        <section className="story-card fn-stage">
          <span className="story-step-label">01 / CLEAN TEXT</span>
          <strong>Keep meaningful words</strong>
          <div className="fn-tokens">{sample.tokens.map(token => <span key={token}>{token}</span>)}</div>
          <small>Normalize and tokenize the headline.</small>
        </section>
        <section className="story-card fn-stage">
          <span className="story-step-label">02 / GLOVE</span>
          <strong>Words become vectors</strong>
          <div className="fn-vector" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /></div>
          <small>Represent word meaning with 300-dimensional embeddings.</small>
        </section>
        <section className="story-card fn-stage">
          <span className="story-step-label">03 / CNN + BILSTM</span>
          <strong>Read pattern and context</strong>
          <div className="fn-model"><span>word patterns</span><span aria-hidden="true">→</span><span>both directions</span></div>
          <small>The model interprets the sequence.</small>
        </section>
        <section className="story-card fn-stage fn-result-stage">
          <span className="story-step-label">04 / SENTIMENT</span>
          <strong className={'fn-sentiment fn-' + sample.label.toLowerCase()}>{sample.label}</strong>
          <small>{sample.signal}</small>
        </section>
      </div>
      <p className="story-footnote">The categories above explain the pipeline with sample headlines. They are illustrative labels, not live model predictions or confidence scores.</p>
    </StoryFrame>
  );
}
