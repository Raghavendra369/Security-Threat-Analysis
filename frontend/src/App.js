import React, { useEffect, useState } from 'react';
import { api } from './api';

import ThreatStats from './components/ThreatStats';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import ThreatTable from './components/ThreatTable';
import ThreatModal from './components/ThreatModal';
import ThreatAnalyzer from './components/ThreatAnalyzer';

function App() {
  const [threats, setThreats] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [selectedThreatId, setSelectedThreatId] = useState(null);

  const limit = 10;

  // Fetch threats based on search/category/page
  const fetchThreats = (search = searchText, categoryVal = category, pageVal = page) => {
    const params = { page: pageVal, limit };
    if (search) params.search = search;
    if (categoryVal) params.category = categoryVal;

    api.get('/threats', { params })
      .then((res) => setThreats(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchThreats();
  }, [searchText, category, page]);

  const handleSearch = (query) => {
    setSearchText(query.trim());
    setPage(1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(1, prev - 1));

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        ConSecure: Security Threat Analysis
      </h1>

      {/* Stats and Charts */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
        }}
      >
        <ThreatStats />
      </div>

      {/* Threat Category Analyzer */}
      <div
        style={{
          backgroundColor: '#f0f4f8',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 5px rgba(0,0,0  ,0.05)',
        }}
      >
        <ThreatAnalyzer />
      </div>

      {/* Search + Filter */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: '1rem',
        }}
      >
        <div style={{ flex: 2 }}>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div style={{ flex: 1 }}>
          <CategoryFilter
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </div>

      {/* Threat Table + Pagination */}
      <div
        style={{
          backgroundColor: '#fff',
          padding: '1.5rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}
      >
        {threats.length === 0 ? (
          <p
            style={{
              marginTop: '1rem',
              color: '#666',
              fontStyle: 'italic',
              textAlign: 'center',
            }}
          >
            No threats found.
          </p>
        ) : (
          <>
            <ThreatTable
  threats={threats}
  onRowClick={(id) => setSelectedThreatId(id)}
/>

<ThreatModal
  threatId={selectedThreatId}
  onClose={() => setSelectedThreatId(null)}
/>

            <div
              style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                gap: '1rem',
              }}
            >
              <button onClick={handlePrevPage} disabled={page === 1}>
                ← Prev
              </button>
              <span style={{ fontWeight: 'bold' }}>Page {page}</span>
              <button onClick={handleNextPage} disabled={threats.length < limit}>
                Next →
              </button>
              

            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
