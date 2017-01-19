/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env node, mocha */
import test from 'ava';
import endpoint from '../src/endpoint';

test('happy ponies', () => {
  const fetch = () => null;
  api(null, null, {
    baseUri: 'http://api.example.com/v1',
    endpoints: [
      {
        endpoint: '/happy/ponies/{id}',
        method: 'GET',
        requiredParams: ['id'],
        optionalParams: ['lastSeenId'],
      }
    ]
  });
});

test.skip('returns a request object with the correct url', (t) => {
  const testUrl = 'http://api.example.com/v1/';
  const Request = (url) => {
    t.true(url === testUrl);
  };
  endpoint(Request);
});

test.skip('should append a trailing slash if one is missing in the given url', (t) => {
  const testUrl = 'http://api.example.com/v1';
  const Request = (url) => {
    t.true(url === `${testUrl}/`);
  };
  endpoint(Request);
});
