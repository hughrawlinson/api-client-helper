const endpoint = (requestProvider, init) => endpointConfig =>
  // this function should take a configuration and return a function that will
  // take and validate parameters to the configuration before returning a
  // Request object
  params => requestProvider(
    endpointConfig.uri,
    init(params, endpointConfig)
  );

module.exports = endpoint;
