const assert = require('assert');
const request = require('supertest');
const api = require('./server');

const { app } = api;

describe('The /api API - some starter tests', () => {
  it('returns Hello!', (done) => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect((response) => {
        console.log(response);
        assert.strictEqual(response.text, 'Hello!');
      })
      .expect(200, done);
  });
});
