import React from 'react';

function CategoryFilter({ selectedCategory, onCategoryChange }) {
  const categories = ["All", "Phishing", "Malware", "DDoS", "Ransomware"]; // Add more as needed

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ marginRight: '0.5rem' }}>Filter by Category:</label>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        style={{ padding: '0.5rem' }}
      >
        {categories.map((cat) => (
          <option key={cat} value={cat === "All" ? "" : cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryFilter;
