'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { packages } from '@/lib/packages';
import { PackageCard } from './sections';

const filters = ['All Destinations', 'Mountain Escapes', 'Treks & Trails', 'Royal Rajasthan'];

export function PackageExplorer() {
  const [filter, setFilter] = useState(filters[0]);
  const [query, setQuery] = useState('');

  const results = packages.filter(
    (p) =>
      (filter === filters[0] || p.category === filter) &&
      `${p.name} ${p.region}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="explorer-controls">
        <div className="filters" aria-label="Filter packages">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
              className={f === filter ? 'selected' : ''}
            >
              {f}
            </button>
          ))}
        </div>
        <label className="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />
          <input
            aria-label="Search destinations"
            placeholder="Search destinations or regions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      <p className="result-count" aria-live="polite">
        {results.length} destination{results.length === 1 ? '' : 's'} to discover
      </p>

      <div className="package-grid">
        {results.map((p) => (
          <PackageCard key={p.slug} item={p} />
        ))}
      </div>

      {!results.length && (
        <div className="empty-results">
          <h3>A different adventure awaits.</h3>
          <p>We could not find matching places for &quot;{query}&quot;. Try exploring all our escapes.</p>
          <button
            type="button"
            className="button button-orange"
            onClick={() => {
              setFilter(filters[0]);
              setQuery('');
            }}
          >
            <span>Show All Destinations</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      )}
    </>
  );
}
