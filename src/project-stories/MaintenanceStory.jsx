import { useState } from 'react';
import { StoryFrame } from './StoryFrame.jsx';

const SCENARIOS = {
  steady: {
    label: 'Steady readings',
    values: [48, 50, 47, 51, 49, 50, 48, 49],
    trend: 'Useful-life trend stays stable',
    meaning: 'The recent window remains close to its earlier readings.',
    manualTitle: 'Stable signal check',
    manualText: 'Compare readings with the normal operating range before taking action.',
  },
  degrading: {
    label: 'Degrading readings',
    values: [40, 44, 48, 55, 63, 72, 83, 94],
    trend: 'Useful-life trend is shortening',
    meaning: 'The recent window moves away from the earlier pattern.',
    manualTitle: 'Degrading signal check',
    manualText: 'Inspect the sensor connection and compare the trend with the service procedure.',
  },
};

function SignalChart({ values, label }) {
  const points = values.map((value, index) => [24 + index * 62, 151 - value].join(',')).join(' ');
  return (
    <svg className="pm-signal-chart" viewBox="0 0 520 190" role="img" aria-label={'Illustrative OBD-II signal chart for ' + label.toLowerCase()}>
      <line x1="24" y1="32" x2="24" y2="154" className="pm-axis" />
      <line x1="24" y1="154" x2="490" y2="154" className="pm-axis" />
      {[50, 85, 120].map(y => <line key={y} x1="24" y1={y} x2="490" y2={y} className="pm-grid-line" />)}
      <rect x="330" y="32" width="128" height="122" className="pm-window" />
      <polyline points={points} className="pm-signal-line" />
      <circle cx="458" cy={151 - values[7]} r="4" className="pm-signal-dot" />
      <text x="335" y="47" className="pm-chart-label">RECENT WINDOW</text>
      <text x="24" y="178" className="pm-chart-label">EARLIER</text>
      <text x="420" y="178" className="pm-chart-label">NOW</text>
    </svg>
  );
}

export default function MaintenanceStory() {
  const [scenario, setScenario] = useState('steady');
  const [showEvidence, setShowEvidence] = useState(true);
  const example = SCENARIOS[scenario];

  return (
    <StoryFrame
      className="pm-story"
      problem="A machine sensor can show trouble without explaining what a mechanic should check."
      outcome="Forecast the useful-life trend from telemetry, then connect it to cited service guidance."
    >
      <div className="story-section-heading">
        <span>FOLLOW A SAMPLE SENSOR SIGNAL</span>
        <small>Illustrative OBD-II readings and manual record</small>
      </div>
      <div className="story-choices" role="group" aria-label="Choose a telemetry scenario">
        {Object.entries(SCENARIOS).map(([key, item]) => (
          <button type="button" key={key} aria-pressed={scenario === key} onClick={() => { setScenario(key); setShowEvidence(true); }}>{item.label}</button>
        ))}
      </div>

      <div className="pm-visual" key={scenario} aria-live="polite">
        <section className="story-card pm-chart-card">
          <span className="story-step-label">01 / SENSOR READINGS</span>
          <SignalChart values={example.values} label={example.label} />
          <small>Recent readings are grouped into a rolling window.</small>
        </section>
        <section className="story-card pm-trend-card">
          <span className="story-step-label">02 / LSTM FORECAST</span>
          <strong>{example.trend}</strong>
          <p>{example.meaning}</p>
          <small>Qualitative illustration of the remaining-useful-life forecast.</small>
        </section>
      </div>
      <div className="pm-evidence-bridge"><span>OBD-II DATA</span><span aria-hidden="true">→</span><span>ROLLING WINDOW + LSTM</span><span aria-hidden="true">→</span><span>FAISS MANUAL MATCH</span></div>
      <section className="story-card pm-evidence-card">
        <div className="pm-evidence-heading">
          <span className="story-step-label">03 / CITED SERVICE GUIDANCE</span>
          <button type="button" onClick={() => setShowEvidence(value => !value)} aria-expanded={showEvidence}>{showEvidence ? 'Hide evidence' : 'Show evidence'}</button>
        </div>
        {showEvidence && (
          <div className="pm-manual" aria-live="polite">
            <strong>{example.manualTitle}</strong>
            <p>“{example.manualText}”</p>
            <small>Source record: sample service manual / Diagnostics / Signal trend</small>
          </div>
        )}
      </section>
      <p className="story-footnote">The signal, trend, and excerpt demonstrate the product flow. They are not a live forecast or an actual OEM passage.</p>
    </StoryFrame>
  );
}
