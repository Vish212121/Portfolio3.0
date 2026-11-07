export function StoryFrame({ problem, outcome, className = '', children }) {
  return (
    <div className={['story', className].filter(Boolean).join(' ')}>
      <div className="story-thesis">
        <div>
          <span className="story-label">THE PROBLEM</span>
          <p>{problem}</p>
        </div>
        <span className="story-thesis-arrow" aria-hidden="true">→</span>
        <div>
          <span className="story-label">THE IDEA</span>
          <p>{outcome}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

export function FlowArrow({ label }) {
  return <div className="story-flow-arrow" aria-hidden="true"><span>→</span>{label && <small>{label}</small>}</div>;
}
