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
  const partial = endpoint(Request, init);
  t.true(typeof partial === "function");
  t.notThrows(() => {
    partial(endpointConfig);
  });
});
