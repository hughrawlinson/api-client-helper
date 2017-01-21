/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env node, mocha */
import test from 'ava';
import api from '../src/api';

test('Collates single endpoint into generated wrapper keys', (t) => {
  const endpoint = (_, _2) => endpointConfig => ({
    [endpointConfig.name]: _ => null,
  });
  const apiGenerator = api(a => a, null, endpoint, null);

  const generatedWrapper = apiGenerator({
    baseUri: 'https://api.example.com/v1',
    endpoints: [{
      name: 'listObjects',
      uri: '/objects',
    }],
  });

  t.truthy(generatedWrapper);
  const wrapperKeys = Object.keys(generatedWrapper);
  t.true(wrapperKeys[0] === 'listObjects');
  t.is(wrapperKeys.length, 1);
});

test('Collates multiple endpoints into generated wrapper keys', (t) => {
  const endpoint = (_, _2) => endpointConfig => ({
    [endpointConfig.name]: _ => null,
  });
  const apiGenerator = api(a => a, null, endpoint, null);

  const generatedWrapper = apiGenerator({
    baseUri: 'https://api.example.com/v1',
    endpoints: [{
      name: 'listObjects',
      uri: '/objects',
    }, {
      name: 'objectById',
      uri: '/objects/{id}',
    }],
  });

  t.truthy(generatedWrapper);
  const wrapperKeys = Object.keys(generatedWrapper);
  t.true(wrapperKeys[0] === 'listObjects');
  t.true(wrapperKeys[1] === 'objectById');
});

test('Throws error if endpoint is not a function when one or more endpoints exist', (t) => {
  const error = t.throws(() => {
    const apiGenerator = api(null, null, null, null);
    apiGenerator({
      endpoints: [null],
    });
  }, TypeError);

  t.is(error.message, 'endpoint is not a function');
});

test('Properly constructs endpoint uri', (t) => {
  const baseUri = 'https://api.example.com/v1';
  const uri = '/resource';
  const testUri = `${baseUri}${uri}`;
  const apiData = {
    baseUri,
    endpoints: [{
      uri,
    }],
  };

  const endpoint = (_, __) => endpointConfig => {
    return t.true(endpointConfig.uri === testUri);
  };

  const apiGenerator = api(a => null, null, endpoint, null);
  apiGenerator(apiData);
});
