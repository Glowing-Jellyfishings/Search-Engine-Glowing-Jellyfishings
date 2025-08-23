const express = require("express");
const Fuse = require("fuse.js");
const fs = require("fs");

const app = express();
const PORT = 9992;

app.use(express.static("public"));
app.use(express.json());

let fuse;
let pages = [];
try {
  pages = JSON.parse(fs.readFileSync("./output/search.db", "utf-8"));
} catch (e) {
  console.warn("Could not read ./output/search.db, starting with empty DB.");
}
fuse = new Fuse(pages, {
  keys: ["title", "text"],
  threshold: 0.3
});

app.get("/search", (req, res) => {
  const query = req.query.q || "";
  if (!fuse) return res.json([]);
  const results = fuse.search(query).map(r => ({
    title: r.item.title,
    url: r.item.url,
    snippet: r.item.text.slice(0, 200) + "..."
  }));
  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Search engine running at http://localhost:${PORT}`);
});
