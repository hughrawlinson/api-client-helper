const api = (fetchProvider,
    RequestProvider,
    endpoint,
    init) =>
  apiConfig => apiConfig.endpoints.map(endpointConfig =>
    fetchProvider(endpoint(RequestProvider, init)(Object.assign({},
      endpointConfig,
      {
        uri: `${apiConfig.baseUri}${endpointConfig.uri}`,
      })))
  ).reduce((obj, item) => Object.assign(obj, item), {});

module.exports = api;
