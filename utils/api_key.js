const checkAPIKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');

  if (apiKey === 'CIMBNiaga') {
    next(); // Lanjut ke handler endpoint
  } else {
    res.status(401).json({ status: 401, message: 'Unauthorized', data: null});
  }
};

module.exports = {
  checkAPIKey,
};