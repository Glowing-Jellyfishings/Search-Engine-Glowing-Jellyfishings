import { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const search = async () => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Mini Search Engine</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
        style={{ width: '300px', padding: '0.5rem' }}
      />
      <button onClick={search} style={{ marginLeft: '1rem' }}>Search</button>
      <ul>
        {results.map((r, i) => (
          <li key={i}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
            <p>{r.snippet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
