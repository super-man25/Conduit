import { modelURL } from '_constants';
import { handleResponse } from './api';

/**
 * Generic request
 *
 * @param {string} path - request path (no leading "/")
 * @param {Object} opts - options passed on to the fetch request
 */
export function request(path, opts = {}) {
  return fetch(`${modelURL}/${path}`, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    ...opts,
  }).then(handleResponse);
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
    ...opts,
  });
}
