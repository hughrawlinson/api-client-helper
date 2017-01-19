const api = (fetchProvider,
    RequestProvider,
    endpoint,
    init) =>
  apiConfig => apiConfig.endpoints.map(endpointConfig => ({
    [endpointConfig.name]: (params) => {
      fetchProvider(endpoint(RequestProvider, init)(Object.assign({
        uri: apiConfig.baseUri,
      }, endpointConfig)(params)));
    },
  }));

module.exports = api;
