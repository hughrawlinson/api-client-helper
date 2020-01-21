const api = require('../src/api');

describe('API', function() {
  it('Collates single endpoint into generated wrapper keys', () => {
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

    expect(generatedWrapper).toBeTruthy;
    const wrapperKeys = Object.keys(generatedWrapper);
    expect(wrapperKeys[0]).toEqual('listObjects');
    expect(wrapperKeys.length).toBe(1);
  });

  it('Collates multiple endpoints into generated wrapper keys', () => {
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

    expect(generatedWrapper).toBeTruthy();
    const wrapperKeys = Object.keys(generatedWrapper);
    expect(wrapperKeys[0]).toEqual('listObjects');
    expect(wrapperKeys[1]).toEqual('objectById');
  });

  it('Throws error if endpoint is not a function when one or more endpoints exist', () => {
    expect(() => {
      const apiGenerator = api(null, null, null, null);
      apiGenerator({
        endpoints: [null],
      });
    }).toThrowError('endpoint is not a function');
  });

  it('Properly constructs endpoint uri', () => {
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
      return expect(endpointConfig.uri).toEqual(testUri);
    };

    const apiGenerator = api(a => null, null, endpoint, null);
    apiGenerator(apiData);
  });
});
