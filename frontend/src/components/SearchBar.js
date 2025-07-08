import React, { useState } from 'react';

function SearchBar({ onSearch, initialValue = '' }) {
  const [input, setInput] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search threats..."
        style={{ padding: '0.5rem', width: '60%' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Search
      </button>
    </form>
  );
}

export default SearchBar;
