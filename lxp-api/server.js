const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5602;

app.use(cors({
  origin: (origin, cb)=> cb(null, true),
  credentials: false
}));
app.use(express.json({ limit: '2mb' }));

function extractKeywords(text) {
  text = (text||'').toLowerCase();
  const tokens = text.match(/[a-zA-ZåäöÄÅÖ0-9]+/g) || [];
  const stop = new Set(['the','and','for','with','a','an','to','of','in','on','at','by','is','are','as','or']);
  return Array.from(new Set(tokens.filter(t=>!stop.has(t) && t.length>2))).slice(0,12);
}

function analyzeToLxp(text){
  const t = (text||'').toLowerCase();
  const keys = [];
  if (/(battery|accu|cell|energy)/.test(t)) keys.push('ENERGY_STORAGE');
  if (/(mechanical|mech|r\&d|rnd|product development)/.test(t)) keys.push('MECHANICAL_RND');
  if (!keys.length) keys.push('GENERAL');
  const reasons = extractKeywords(text).map(k=>`keyword:${k}`);
  return { key: keys[0], reasons };
}

app.get('/api/health', (req,res)=>{
  res.json({ ok: true, ts: Date.now() });
});

app.get('/api/analyze', (req,res)=>{
  const q = req.query.q || '';
  const out = analyzeToLxp(q);
  res.set('Content-Type','application/json');
  res.json({ key: out.key, reasons: out.reasons, source: 'lxp-api-local' });
});

app.post('/api/analyze-candidates', (req,res)=>{
  const { candidates = [], lxpKey = '', keywords = [] } = req.body || {};
  const result = {};
  for (const c of candidates){
    const base = ((c.text||'') + ' ' + (Array.isArray(keywords)? keywords.join(' '): '')).trim();
    const a = analyzeToLxp(base);
    result[c.id] = { code: a.key, reasons: a.reasons.slice(0,5) };
  }
  res.set('Content-Type','application/json');
  res.json({ result });
});

app.use((req,res)=>{
  res.status(404).json({ error: 'Not Found', path: req.path });
});

app.listen(PORT, ()=>{
  console.log(`lxp-api listening on http://127.0.0.1:${PORT}`);
});
