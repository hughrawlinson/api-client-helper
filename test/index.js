/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env node, mocha */
import test from 'ava';
import endpoint from '../src/endpoint';

test('endpoint returns correctly partially applied function', (t) => {
  const endpointConfig = {
    uri: 'http://example.com',
  };
  const init = () => {};
  const Request = (uriOpt, initOpt) => {
    t.true(uriOpt === endpointConfig.uri);
    t.true(initOpt.toString() === init.toString());
  };
  endpoint(Request, init)(endpointConfig);
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
