const apiUrl = import.meta.env.VITE_APP_API_URL;
const apiPort = import.meta.env.VITE_APP_API_PORT;

const baseUrl = import.meta.env.VITE_APP_API_URL
  ? `${apiUrl}:${apiPort}`
  : `${window.location.protocol}//${window.location.host}`;

const convert = async (amount, from, to) => {
  const query = `amount=${amount}&from=${from}&to=${to}`;
  const response = await fetch(`${baseUrl}/convert?${query}`);
  const json = await response.json();

  return json;
};

export default {
  convert,
};
