/* eslint-env node, mocha */
import assert from 'assert';
import api, { endpoint } from '../src';

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

test('returns a request object with the correct url', () => {
  const testUrl = 'http://api.example.com/v1/';
  const Request = (url) => {
    assert(url === testUrl);
  };
  endpoint(Request);
});
test('should append a trailing slash if one is missing in the given url', () => {
  const testUrl = 'http://api.example.com/v1';
  const Request = (url) => {
    assert(url === `${testUrl}/`);
  };
  endpoint(Request);
});
