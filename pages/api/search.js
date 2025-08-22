import fetch from 'node-fetch';
import cheerio from 'cheerio';

const sitesToCrawl = [
  'https://example.com',
  'https://vercel.com',
  'https://developer.mozilla.org'
];

export default async function handler(req, res) {
  const query = req.query.q?.toLowerCase();
  const results = [];

  for (const site of sitesToCrawl) {
    try {
      const html = await fetch(site).then(r => r.text());
      const $ = cheerio.load(html);
      const text = $('body').text().toLowerCase();

      if (text.includes(query)) {
        results.push({
          url: site,
          title: $('title').text(),
          snippet: text.slice(text.indexOf(query), text.indexOf(query) + 200)
        });
      }
    } catch (err) {
      console.error(`Error crawling ${site}:`, err);
    }
  }

  res.status(200).json({ results });
}
