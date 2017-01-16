/* eslint-env node */
/* import fetch, {
 *   Request,
 * } from 'node-fetch';*/

const init = (params, endpointConfig) => {
  // This function should take an endpoint configuration and parameters,
  // validate the parameters against the endpoint configuration, and return
  // a valid `init` object for the Request constructor
};

const endpoint = (RequestProvider, endpointConfig) => {
  // this function should take a configuration and return a function that will
  // take and validate parameters to the configuration before returning a
  // Request object
  return params => RequestProvider(
    endpointConfig.uri,
    init(params, endpointConfig)
  );
};

const api = (fetchProvider,
  RequestProvider,
  apiConfig) => apiConfig.endpoints.map(endpointConfig => ({
    [endpointConfig.name]: (params) => {
      fetchProvider(endpoint(RequestProvider, Object.assign({
        uri: apiConfig.baseUri,
      }, endpointConfig)(params)));
    },
  }));

export default api;
/* export default apiConfig => api(fetch, Request, apiConfig);*/
