const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = 'https://allapiproject.zone.id/api/gacha';

const HEADERS = {
  Accept: 'application/json',
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
};

app.use(express.static(path.join(__dirname, 'public')));

// Proxy: GET /api/numbers
app.get('/api/numbers', async (req, res) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/numbers`, { headers: HEADERS });
    res.json(data);
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Proxy: GET /api/otps
app.get('/api/otps', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const { data } = await axios.get(`${BASE_URL}/otps`, { params: { limit }, headers: HEADERS });
    res.json(data);
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ GachaSIM berjalan di http://localhost:${PORT}`);
});
