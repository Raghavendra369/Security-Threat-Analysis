// import React, { useEffect, useState } from 'react';
// import { api } from '../api';

// function ThreatStats() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     api.get('/threats/stats')
//       .then(res => setStats(res.data))
//       .catch(err => console.error('Failed to fetch stats:', err));
//   }, []);

//   if (!stats) return <p>Loading stats...</p>;

//   return (
//     <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
//       <div style={cardStyle}>
//         <h3>Total Threats</h3>
//         <p>{stats.total}</p>
//       </div>

//       <div style={cardStyle}>
//         <h3>By Category</h3>
//         {Object.entries(stats.by_category).map(([cat, count]) => (
//           <p key={cat}><strong>{cat}</strong>: {count}</p>
//         ))}
//       </div>

//       <div style={cardStyle}>
//         <h3>By Severity</h3>
//         {Object.entries(stats.by_severity).map(([sev, count]) => (
//           <p key={sev}><strong>Severity {sev}</strong>: {count}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// const cardStyle = {
//   flex: '1',
//   minWidth: '200px',
//   backgroundColor: '#f2f2f2',
//   padding: '1rem',
//   borderRadius: '8px',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// };

// export default ThreatStats;



import React, { useEffect, useState } from 'react';
import { api } from '../api';
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF4C4C'];

function ThreatStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/threats/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  if (!stats) return <p>Loading stats...</p>;

  // Prepare chart data
  // const categoryData = Object.entries(stats.by_category).map(([key, value]) => ({
  //   name: key,
  //   value
  // }));

  const categoryData = Object.entries(stats.by_category)
  .sort((a, b) => a[0].localeCompare(b[0]))  // 🔁 Alphabetical order
  .map(([key, value]) => ({
    name: key,
    value
  }));


  const severityData = Object.entries(stats.by_severity).map(([key, value]) => ({
    severity: `Severity ${key}`,
    count: value
  }));

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Threat Stats</h2>

      {/* Total count card */}
      <div style={cardStyle}>
        <h3>Total Threats</h3>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{stats.total}</p>
      </div>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        {/* Pie Chart */}
        <div style={chartContainer}>
          <h4>Threats by Category</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={categoryData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={chartContainer}>
          <h4>Threats by Severity</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={severityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="severity" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#FF8042" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#f4f4f4',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  maxWidth: '200px'
};

const chartContainer = {
  flex: '1 1 400px',
  minWidth: '300px',
};

export default ThreatStats;

