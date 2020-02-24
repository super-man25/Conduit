/* File commented out until better fetch-mocking approach is determined */
/* TODO: replace fetch-mock */

describe('', () => {
  it('', () => {});
});

// import fetchMock from 'fetch-mock';
// import { ApiError, request, get, post, put, del } from '_helpers/api';

// const path = 'path';
// const rawBody = '{ "some": "json" }';
// const body = { some: 'json' };

// afterEach(fetchMock.restore);

// describe('ApiError', () => {
//   const code = 400;
//   const message = 'message';
//   const error = new ApiError(code, message, body);

//   it('should be instanceof ApiError', () => {
//     expect(error).toBeInstanceOf(ApiError);
//   });

//   it('should have a code, message, and body', () => {
//     expect(error.code).toEqual(code);
//     expect(error.message).toEqual(message);
//     expect(error.body).toEqual(body);
//   });
// });

// describe('request', () => {
//   it('should make a request', () => {
//     const mock = fetchMock.mock({
//       matcher: `end:${path}`,
//       response: rawBody,
//       headers: {},
//     });

//     return request(path).then((data) => {
//       expect(mock.called()).toBe(true);
//       expect(data).toEqual(body);
//     });
//   });

//   it('should make a request with opts', () => {
//     const headers = {
//       'Content-Type': 'application/json',
//     };
//     const mock = fetchMock.mock({
//       matcher: `end:${path}`,
//       response: rawBody,
//       headers,
//     });

//     return request(path, { headers }).then((data) => {
//       expect(mock.called()).toBe(true);
//       expect(data).toEqual(body);
//     });
//   });

//   it('should throw ApiError if the response code is >= 400', () => {
//     const code = 400;
//     const mock = fetchMock.mock({
//       matcher: `end:${path}`,
//       response: {
//         status: code,
//         body: rawBody,
//       },
//     });

//     return request(path).catch((err) => {
//       expect(mock.called()).toBe(true);
//       expect(err).toBeInstanceOf(ApiError);
//       expect(err.code).toBe(400);
//       expect(err.body).toEqual(body);
//       expect(err.message).toEqual('Bad Request');
//     });
//   });
// });

// it('get should make a GET request', () => {
//   const params = {
//     some: 'test',
//     params: 'values',
//   };
//   const mock = fetchMock.mock({
//     matcher: `glob:*${path}*`,
//     method: 'GET',
//     query: params,
//     response: rawBody,
//   });

//   return get(path, params).then((data) => {
//     expect(mock.called()).toBe(true);
//     expect(data).toEqual(body);
//   });
// });

// it('post should make a POST request', () => {
//   const reqBody = { some: 'body' };
//   const mock = fetchMock.mock({
//     matcher: `end:${path}`,
//     method: 'POST',
//     response: rawBody,
//   });

//   return post(path, reqBody).then((data) => {
//     expect(mock.called()).toBe(true);
//     expect(data).toEqual(body);
//   });
// });

// it('put should make a PUT request', () => {
//   const reqBody = { some: 'body' };
//   const mock = fetchMock.mock({
//     matcher: `end:${path}`,
//     method: 'PUT',
//     response: rawBody,
//   });

//   return put(path, reqBody).then((data) => {
//     expect(mock.called()).toBe(true);
//     expect(data).toEqual(body);
//   });
// });

// it('del should make a DELETE request', () => {
//   const params = {
//     some: 'test',
//     params: 'values',
//   };
//   const mock = fetchMock.mock({
//     matcher: `glob:*${path}*`,
//     method: 'DELETE',
//     query: params,
//     response: rawBody,
//   });

//   return del(path, params).then((data) => {
//     expect(mock.called()).toBe(true);
//     expect(data).toEqual(body);
//   });
// });
