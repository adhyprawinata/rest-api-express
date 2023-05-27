const fs = require('fs');
const path = require('path');

// Middleware untuk mencatat permintaan dan respons dalam file teks
const logger = (req, res, next) => {
  const logData = {
    timestamp: new Date(),
    method: req.method,
    url: req.url,
    requestBody: req.body,
    responseStatus: null,
    responseBody: null,
  };

  const logFilePath = path.join(__dirname, '../logs/access.log');

  // Melakukan log permintaan ke file
  fs.appendFile(logFilePath, JSON.stringify(logData) + '\n', (err) => {
    if (err) {
      console.error('Error writing to log file: ', err);
    }
  });

  // Menyimpan referensi fungsi res.send() asli untuk log respons
  const originalSend = res.send;
  
  // Mengganti fungsi res.send() dengan fungsi custom
  res.send = (body) => {
    logData.responseStatus = res.statusCode;
    logData.responseBody = body;

    // Melakukan log respons ke file
    fs.appendFile(logFilePath, JSON.stringify(logData) + '\n', (err) => {
      if (err) {
        console.error('Error writing to log file: ', err);
      }
    });

    // Memanggil fungsi res.send() asli
    originalSend.call(res, body);
  };

  next();
};

module.exports = logger;