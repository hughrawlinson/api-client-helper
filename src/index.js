/* eslint-env node */
/* import fetch, {
 *   Request,
 * } from 'node-fetch';*/
const fetch = require('node-fetch');
const api = require('./api');
const endpoint = require('./endpoint');
const init = require('./init');

module.exports = apiConfig => api(fetch, fetch.Request, endpoint, init)(apiConfig);

