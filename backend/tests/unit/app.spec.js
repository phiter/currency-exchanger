const request = require('supertest');
const app = require('../../app');

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

      const response = await request(app)
        .get(`/convert?from=${from}&to=${to}&amount=${amount}`);

      // Current mock returns amount * 2
      const expectedResult = amount * 2;

      expect(response.statusCode).toBe(200);
      expect(response.body.result).toBe(expectedResult);
    });
  });
});
