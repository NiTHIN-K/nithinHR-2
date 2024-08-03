const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

let cachedData = { field1: '', field2: '' };

app.use(cors());
app.use(bodyParser.json());

app.post('/api/cacheData', (req, res) => {
  cachedData = req.body;
  console.log('Data cached:', cachedData);
  res.json({ status: 'success', data: cachedData });
});

app.get('/api/getData', (req, res) => {
  res.json(cachedData);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});