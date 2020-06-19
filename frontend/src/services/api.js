const apiUrl = process.env.VUE_APP_API_URL;
const apiPort = process.env.VUE_APP_API_PORT;

const baseUrl = `${apiUrl}:${apiPort}`;

const convert = async (amount, from, to) => {
  const query = `amount=${amount}&from=${from}&to=${to}`;
  const response = await fetch(`${baseUrl}/convert?${query}`);
  const json = await response.json();

  return json;
};

export default {
  convert,
};
