const endpoint = require('../src/endpoint');

describe('endpoint', function() {
  it('returns correctly partially applied function', () => {
    const endpointConfig = {
      uri: 'http://example.com',
    };
    const init = () => {};
    const Request = (uriOpt, initOpt) => {
      expect(uriOpt).toEqual(endpointConfig.uri);
      expect(initOpt.toString()).toEqual(init.toString());
    };
    const partial = endpoint(Request, init);
    expect(typeof partial).toEqual("function");
    partial(endpointConfig);
  });
})
