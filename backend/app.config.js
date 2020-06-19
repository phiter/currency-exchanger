const getServerConfig = () => {
  const host = '0.0.0.0';
  const port = 8080;
  return { host, port };
};

module.exports.getServerConfig = getServerConfig;
