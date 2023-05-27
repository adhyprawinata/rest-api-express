const express = require('express');
const bodyParser = require('body-parser');
const routing = require('./routes/routes');
const logger = require('./utils/logger');

const app = express();

app.use(bodyParser.json());

// Middleware logger untuk mencatat permintaan dan respons
app.use(logger);

// Routing
app.use(routing);

// Middleware untuk menangani endpoint yang tidak ditemukan (404 Not Found)
app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'Page not found', data: null });
});

// Menjalankan server pada port 3000
app.listen(3000, () => {
  console.log('Server running on port 3000');
});