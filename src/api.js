const api = (fetchProvider,
  RequestProvider,
  endpoint) =>
  apiConfig => apiConfig.endpoints.map(endpointConfig => ({
    [endpointConfig.name]: (params) => {
      fetchProvider(endpoint(RequestProvider, Object.assign({
        uri: apiConfig.baseUri,
      }, endpointConfig)(params)));
    },
  }));

module.exports = api;
