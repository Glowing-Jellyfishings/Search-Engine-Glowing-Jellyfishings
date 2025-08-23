const express = require("express");
const Fuse = require("fuse.js");
const { getAllPages } = require("../db");

let fuse;

getAllPages(pages => {
  fuse = new Fuse(pages, {
    keys: ["title", "text"],
    threshold: 0.3
  });
});

module.exports = (req, res) => {
  if (req.method === "GET" && req.url.startsWith("/search")) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const query = url.searchParams.get("q") || "";
    if (!fuse) return res.json([]);
    const results = fuse.search(query).map(r => ({
      title: r.item.title,
      url: r.item.url,
      snippet: r.item.text.slice(0, 200) + "..."
    }));
    res.json(results);
  } else {
    res.status(404).send("Not Found");
  }
};
