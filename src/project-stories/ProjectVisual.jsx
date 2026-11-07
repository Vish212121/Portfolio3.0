import RepoBrainStory from './RepoBrainStory.jsx';
import WriteItCorrectStory from './WriteItCorrectStory.jsx';
import CodeCollabStory from './CodeCollabStory.jsx';
import FinancialStory from './FinancialStory.jsx';
import RealEstateStory from './RealEstateStory.jsx';
import MaintenanceStory from './MaintenanceStory.jsx';
import './stories.css';
import './project-visual.css';

const FIGURES = {
  repobrain: {
    title: 'RepoBrain',
    lead: 'From codebase question to source-backed answer.',
    Component: RepoBrainStory,
  },
  'write-it-correct': {
    title: 'Write It Correct',
    lead: 'A writing suggestion applied to the exact text in your editor.',
    Component: WriteItCorrectStory,
  },
  codecollab: {
    title: 'CodeCollab',
    lead: 'Two participants, one live document, one execution result.',
    Component: CodeCollabStory,
  },
  'financial-news-sentiment': {
    title: 'Financial News Sentiment',
    lead: 'See how a financial headline becomes a sentiment signal.',
    Component: FinancialStory,
  },
  'real-estate-platform': {
    title: 'Real Estate Platform',
    lead: 'Search a listing and send its details to a price estimate service.',
    Component: RealEstateStory,
  },
  'rag-predictive-maintenance': {
    title: 'Predictive Maintenance',
    lead: 'Connect sensor trends to a useful-life forecast and manual evidence.',
    Component: MaintenanceStory,
  },
};

export default function ProjectVisual({ slug, index }) {
  const figure = FIGURES[slug];
  if (!figure) return null;
  const { Component } = figure;

  return (
    <section className="project-visual" data-project={slug} aria-label={`${figure.title} visual explanation`}>
      <div className="project-visual-card">
        <header className="project-visual-heading">
          <div className="project-visual-heading-line">
            <span>PROJECT {String(index + 1).padStart(2, '0')} / VISUAL EXPLANATION</span>
            <strong>{figure.title}</strong>
          </div>
          <p>{figure.lead}</p>
        </header>
        <div className="project-visual-content"><Component /></div>
      </div>
    </section>
  );
}
