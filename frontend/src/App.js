import { useState } from 'react';
import './App.css';

function App() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [result, setResult] = useState('');

  const API_BASE = 'http://localhost:5000/shortens';

  const handleCreate = async () => {
    try {
      const res = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: originalURL }),
      });
      const data = await res.json();
      setShortURL(data.shortUrl); 
      setResult(`Shortened URL: ${data.shortUrl}`);
    } catch (err) {
      setResult('Error creating short URL');
    }
  };

  const handleRetrieve = async () => {
    try {
      const res = await fetch(`${API_BASE}/${shortURL}`);
      const data = await res.json();
  
      if (res.ok) {
        setResult(`Original URL: ${data.originalUrl}`);
      } else {
        setResult(data.error || 'URL not found');
      }
    } catch (err) {
      setResult('Error retrieving original URL');
    }
  };
  

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE}/${shortURL}`, {
        method: 'PUT',
      });
      const data = await res.json();
  
      if (res.ok) {
        setResult(`Updated to: ${data.newShortUrl}`);
        setShortURL(data.newShortUrl); // Update local state with new short URL
      } else {
        setResult(data.error || 'Failed to update short URL');
      }
    } catch (err) {
      setResult('Error updating short URL');
    }
  };
  

  const handleDelete = async () => {
    try {
      await fetch(`${API_BASE}/${shortURL}`, { method: 'DELETE' });
      setResult('Short URL deleted');
    } catch (err) {
      setResult('Error deleting short URL');
    }
  };

  const handleStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/${shortURL}/stats`);
      const data = await res.json();
  
      if (res.ok) {
        setResult(`Access count: ${data.clicks}`);
      } else {
        setResult(data.error || 'URL not found');
      }
    } catch (err) {
      setResult('Error fetching stats');
    }
  };
  

  return (
    <div className="App">
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Original URL"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />

      <input
        type="text"
        placeholder="Short URL ID"
        value={shortURL}
        onChange={(e) => setShortURL(e.target.value)}
      />

      <div>
        <button className="create" onClick={handleCreate}>Create</button>
        <button className="retrieve" onClick={handleRetrieve}>Retrieve</button>
        <button className="update" onClick={handleUpdate}>Update</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
        <button className="stats" onClick={handleStats}>Stats</button>
      </div>

      <p>{result}</p>
    </div>
  );
}

export default App;