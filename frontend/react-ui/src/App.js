import { useState } from "react";
import "./App.css";

function App() {
  const [inputUrl, setInputUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async () => {
    if (!inputUrl.startsWith("http")) {
      alert("Please enter a valid URL.");
      return;
    }

  const res = await fetch("http://localhost:3000/shorten", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({url: inputUrl}),
  });

  const data = await res.json();
  if (data.short) setShortUrl(data.short);
  };

  return (
    <div className="app">
      <h1>URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL..."
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        />
        <button onClick={handleSubmit}>Shorten URL</button>
        {shortUrl && (
          <p>
            Short URL: {" "}
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </p>
        )}
    </div>
  )
}

export default App;