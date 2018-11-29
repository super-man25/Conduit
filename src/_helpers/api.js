import { baseURL } from '_constants';
import { stringify } from 'querystring';

/**
 * API Error - compatible with instanceof
 */
export class ApiError {
  constructor(code, message, body) {
    this.code = code;
    this.message = message;
    this.body = body;
  }
}
Object.setPrototypeOf(ApiError, Error);

/**
 * Handle response from a request (expect json)
 * @private
 *
 * @param {Object} response - Fetch response object
 */
export function handleResponse(response) {
  const statusCode = response.status;
  if (statusCode < 400) {
    return response.json();
  }

  return response
    .json()
    .catch(() => null)
    .then((body) => {
      throw new ApiError(statusCode, response.statusText, body);
    });
}

/**
 * Generic request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} opts - options passed on to the fetch request
 */
export function request(path, opts = {}) {
  return fetch(`${baseURL}/${path}`, {
    credentials: 'include',
    mode: 'cors',
    ...opts
  }).then(handleResponse);
}

/**
 * GET request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} params - request params in object form
 * @param {Object} opts - options passed on to the fetch request
 */
export function get(path, params = {}, opts = {}) {
  const search = stringify(params);
  return request(`${path}?${search}`, {
    method: 'GET',
    ...opts
  });
}

/**
 * POST request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} body - requesty body
 * @param {Object} opts - options passed on to the fetch request
 */
export function post(path, body = {}, opts = {}) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(body),
    ...opts
  });
}

/**
 * PUT request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} body - requesty body
 * @param {Object} opts - options passed on to the fetch request
 */
export function put(path, body = {}, opts = {}) {
  return request(path, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...opts
  });
}

/**
 * DELETE request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} params - request params in object form
 * @param {Object} opts - options passed on to the fetch request
 */
export function del(path, params = {}, opts = {}) {
  const search = stringify(params);
  return request(`${path}?${search}`, {
    method: 'DELETE',
    ...opts
  });
}
