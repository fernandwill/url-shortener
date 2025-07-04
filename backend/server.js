const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;
const DB_FILE = "urls.json";

app.use(cors());
app.use(express.json());

if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]",
    "utf-8"
);

const loadUrls = () => {
    const raw = fs.readFileSync(DB_FILE, "utf-8").trim();
    return raw ? JSON.parse(raw) : {};
}

const saveUrls = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// Generate 6-chars random ID
const generateID = () => Math.random().toString(36).slice(2, 8);

// POST /shorten -> return short URL
app.post("/shorten", (req, res) => {
    const { url } = req.body;
    if (!url.startsWith("http"))
        return res.status(400).json({error: "Invalid URL."});
    
    const db = loadUrls();
    const code = generateID();
    db[code] = url;
    saveUrls(db);

    res.json({short: `http://localhost:${PORT}/${code}`});
});

// GET /:code -> redirect to URL
app.get("/:code", (req, res) => {
    const db = loadUrls();
    const original = db[req.params.code];
    if (!original) 
        return res.status(404).send("Not found");
    res.redirect(original);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

