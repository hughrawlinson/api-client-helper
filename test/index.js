/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint-env node, mocha */
import test from 'ava';
import api from '../src/api';

test('Collates single endpoint into generated wrapper keys', (t) => {
  const apiGenerator = api(null, null, null, null);

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
  const apiGenerator = api(null, null, null, null);

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
