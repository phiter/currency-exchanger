const fetch = require('node-fetch');
const money = require('money');
const { getOpenExchangeRatesConfig } = require('../app.config');

const { appId } = getOpenExchangeRatesConfig();

const getRates = async () => {
  const response = await fetch(`https://openexchangerates.org/api/latest.json?app_id=${appId}`);
  const json = await response.json();
  return json;
};

const convert = async (amount, from, to) => {
  const { base, rates } = await getRates();

  money.rates = rates;
  money.base = base;

  return money.convert(Number(amount), { from, to });
};

module.exports = {
  getRates,
  convert,
};
