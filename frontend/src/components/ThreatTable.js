// import React from 'react';

// function ThreatTable({ threats }) {
//   if (threats.length === 0) {
//     return <p>No threats found.</p>;
//   }

//   return (
//     <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
//       <thead style={{ backgroundColor: '#f2f2f2' }}>
//         <tr>
//           <th>ID</th>
//           <th>Description</th>
//           <th>Category</th>
//           <th>Severity</th>
//         </tr>
//       </thead>
//       <tbody>
//         {threats.map((threat) => (
//           <tr key={threat.id}>
//             <td>{threat.id.slice(-6)}</td>
//             <td>{threat.cleaned_description}</td>
//             <td>{threat.threat_category}</td>
//             <td>{threat.severity_score}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default ThreatTable;


import React from 'react';

// function ThreatTable({ threats }) {
//   if (threats.length === 0) {
//     return <p>No threats found.</p>;
//   }

//   return (
//     <table style={tableStyle}>
//       <thead style={theadStyle}>
//         <tr>
//           <th style={thStyle}>ID</th>
//           <th style={thStyle}>Description</th>
//           <th style={thStyle}>Category</th>
//           <th style={thStyle}>Severity</th>
//         </tr>
//       </thead>
//       <tbody>
//         {threats.map((threat, index) => (
//           <tr key={threat.id} style={index % 2 === 0 ? rowStyleEven : rowStyleOdd}>
//             <td style={tdStyle}>{threat.id.slice(-6)}</td>
//             <td style={tdStyle}>{threat.cleaned_description}</td>
//             <td style={tdStyle}>{threat.threat_category}</td>
//             <td style={{ ...tdStyle, ...getSeverityStyle(threat.severity_score) }}>
//               {threat.severity_score}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
function ThreatTable({ threats, onRowClick }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left' }}>Threat ID</th>
        </tr>
      </thead>
      <tbody>
        {threats.map((threat) => (
          <tr
            key={threat.id}
            style={{ cursor: 'pointer', transition: '0.2s', backgroundColor: '#fff' }}
            onClick={() => onRowClick(threat.id)}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
          >
            <td>{threat.id.slice(-6)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}


// 🔧 Style objects
const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.05)',
};

const theadStyle = {
  backgroundColor: '#f0f0f0',
};

const thStyle = {
  padding: '12px',
  textAlign: 'left',
  fontWeight: 'bold',
  borderBottom: '1px solid #ddd',
};

const tdStyle = {
  padding: '12px',
  borderBottom: '1px solid #eee',
};

const rowStyleEven = {
  backgroundColor: '#fff',
};

const rowStyleOdd = {
  backgroundColor: '#f9f9f9',
};

// 🎨 Optional: severity-based coloring
const getSeverityStyle = (score) => {
  if (score >= 4) return { color: 'white', backgroundColor: '#d9534f', borderRadius: '5px', padding: '4px 8px', textAlign: 'center' };
  if (score === 3) return { color: 'black', backgroundColor: '#f0ad4e', borderRadius: '5px', padding: '4px 8px', textAlign: 'center' };
  return { color: 'black', backgroundColor: '#dff0d8', borderRadius: '5px', padding: '4px 8px', textAlign: 'center' };
};

export default ThreatTable;
