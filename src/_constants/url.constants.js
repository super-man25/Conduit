export const FAKE_API = false;
const NODE_ENV = !FAKE_API ? process.env.NODE_ENV : 'fake';

// console.log(`~~~~~ NODE_ENV is ${ NODE_ENV } ~~~~~`);

let base_url;
if (process.env.REACT_APP_ED_API_URL) {
  base_url = process.env.REACT_APP_ED_API_URL;
} else {
  base_url = 'http://localhost:9000';
}

// console.log(`~~~~~ API is ${ base_url } ~~~~~`);

export const baseURL = base_url;
