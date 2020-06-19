const getServerConfig = () => {
  const host = '0.0.0.0';
  const port = 8080;
  return { host, port };
};

const getOpenExchangeRatesConfig = () => {
  const appId = process.env.OPEN_EXCHANGE_RATES_APP_ID;
  return { appId };
};

module.exports.getServerConfig = getServerConfig;
module.exports.getOpenExchangeRatesConfig = getOpenExchangeRatesConfig;
