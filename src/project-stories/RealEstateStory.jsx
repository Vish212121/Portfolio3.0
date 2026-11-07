import { useState } from 'react';
import { FlowArrow, StoryFrame } from './StoryFrame.jsx';

const LISTINGS = [
  { id: 'quay', name: 'Quay studio', location: 'Quay', type: 'Rent', area: 38, beds: 1 },
  { id: 'cedar', name: 'Cedar apartment', location: 'Central', type: 'Sale', area: 76, beds: 2 },
  { id: 'garden', name: 'Garden house', location: 'Garden', type: 'Sale', area: 96, beds: 3 },
];

const LOCATIONS = ['All', 'Quay', 'Central', 'Garden'];
const TYPES = ['All', 'Rent', 'Sale'];

export default function RealEstateStory() {
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [selectedId, setSelectedId] = useState('quay');
  const [requested, setRequested] = useState(false);
  const matches = LISTINGS.filter(item => (location === 'All' || item.location === location) && (type === 'All' || item.type === type));
  const listing = matches.find(item => item.id === selectedId) || matches[0] || null;

  const chooseLocation = next => {
    setLocation(next);
    setRequested(false);
  };
  const chooseType = next => {
    setType(next);
    setRequested(false);
  };

  return (
    <StoryFrame
      className="re-story"
      problem="Property seekers need to find relevant listings and understand the details behind an estimate."
      outcome="Filter published properties, inspect one, then send its attributes to a price prediction service."
    >
      <div className="story-section-heading">
        <span>EXPLORE A SAMPLE PROPERTY SEARCH</span>
        <small>Illustrative listings · no live prices</small>
      </div>
      <div className="re-journey">
        <section className="story-card re-search">
          <span className="story-step-label">01 / NEXT.JS SEARCH</span>
          <strong>Find a property</strong>
          <span className="re-filter-name">Location</span>
          <div className="re-filter-options" role="group" aria-label="Filter by location">
            {LOCATIONS.map(item => <button type="button" key={item} aria-pressed={location === item} onClick={() => chooseLocation(item)}>{item}</button>)}
          </div>
          <span className="re-filter-name">Type</span>
          <div className="re-filter-options" role="group" aria-label="Filter by property type">
            {TYPES.map(item => <button type="button" key={item} aria-pressed={type === item} onClick={() => chooseType(item)}>{item}</button>)}
          </div>
        </section>
        <FlowArrow label="query" />
        <section className="story-card re-listings">
          <span className="story-step-label">02 / SANITY CMS LISTINGS</span>
          <strong>{matches.length} matching {matches.length === 1 ? 'property' : 'properties'}</strong>
          <div className="re-listing-options" aria-label="Choose a sample listing">
            {matches.length ? matches.map(item => (
              <button type="button" key={item.id} aria-pressed={listing?.id === item.id} onClick={() => { setSelectedId(item.id); setRequested(false); }}>
                <strong>{item.name}</strong><small>{item.location} · {item.type.toLowerCase()}</small>
              </button>
            )) : <p>No sample listing matches these filters.</p>}
          </div>
        </section>
        <FlowArrow label="inspect" />
        <section className="story-card re-estimate">
          <span className="story-step-label">03 / PYTHON ML SERVICE</span>
          {listing ? (
            <>
              <strong>Estimate from listing details</strong>
              <div className="re-attributes">
                <span>Property <b>{listing.name}</b></span>
                <span>Area <b>{listing.area} m²</b></span>
                <span>Bedrooms <b>{listing.beds}</b></span>
                <span>Type <b>{listing.type}</b></span>
              </div>
              <button type="button" className="story-primary" onClick={() => setRequested(true)}>Send attributes →</button>
              <small aria-live="polite">{requested ? 'Example request prepared. A real price would come from the ML service.' : 'The service uses property attributes to predict a price.'}</small>
            </>
          ) : <p>Choose filters with a matching listing to inspect an estimate request.</p>}
        </section>
      </div>
    </StoryFrame>
  );
}
