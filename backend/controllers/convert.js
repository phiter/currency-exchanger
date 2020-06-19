const openExchangeApi = require('../services/openexchangerates');

const convert = async (req, res) => {
  const { from, to, amount } = req.query;
  // Could use a validation plugin later
  if (from === undefined || to === undefined || amount === undefined) {
    return res.status(400).send('Query is missing parameters.');
  }

  const result = await openExchangeApi.convert(amount, from, to);

  return res.status(200).json({ result });
};

module.exports = convert;
