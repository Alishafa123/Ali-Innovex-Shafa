import { useState } from 'react';
import './App.css';

function App() {
  const [originalURL, setOriginalURL] = useState('');
  const [shortURL, setShortURL] = useState('');

  const handleCreate = () => console.log('Create:', originalURL);
  const handleRetrieve = () => console.log('Retrieve:', shortURL);
  const handleUpdate = () => console.log('Update:', shortURL);
  const handleDelete = () => console.log('Delete:', shortURL);
  const handleStats = () => console.log('Stats:', shortURL);

  return (
    <div className="App">
      <h1>URL Shortener 4.0</h1>

      <input
        type="text"
        placeholder="Original URL"
        value={originalURL}
        onChange={(e) => setOriginalURL(e.target.value)}
      />

      <input
        type="text"
        placeholder="Short URL"
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
    </div>
  );
}

export default App;
