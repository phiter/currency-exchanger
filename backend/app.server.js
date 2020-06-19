const app = require('./app.js');
const { getServerConfig } = require('./app.config');

const { host, port } = getServerConfig();

app.listen(port, host, undefined, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on http://${host}:${port}`);
});
