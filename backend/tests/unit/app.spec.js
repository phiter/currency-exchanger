const fetch = require('node-fetch');
const request = require('supertest');
const app = require('../../app');

jest.mock('node-fetch');

const openExchangeRatesMock = () => ({
  base: 'USD',
  rates: {
    BRL: 5,
    USD: 1,
    JPY: 100,
    EUR: 0.90,
  },
});

describe('Api', () => {
  describe('conversion route', () => {
    it('should return 400 if no parameters are provided', async () => {
      const response = await request(app).get('/convert');

      expect(response.statusCode).toBe(400);
    });

    it('should return conversion result if parameters are provided', async () => {
      const from = 'USD';
      const to = 'EUR';
      const amount = 5;

      fetch.mockReturnValue(Promise.resolve({
        json: () => openExchangeRatesMock(),
      }));

      const response = await request(app)
        .get(`/convert?from=${from}&to=${to}&amount=${amount}`);

      // Amount times mocked EURO value
      const expectedResult = amount * 0.90;

      expect(response.statusCode).toBe(200);
      expect(response.body.result).toBe(expectedResult);
    });
  });
});
