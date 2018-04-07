export const FAKE_API = false;
const NODE_ENV = !FAKE_API ? process.env.NODE_ENV : 'fake';

console.log('~~~~~ NODE_ENV is ' + NODE_ENV + ' ~~~~~');

export const urlConstants = {
    LOCAL_API_URL: 'http://localhost:9000',
    FAKE_API_URL: 'http://localhost:3000/fake',
    QA_API_URL: 'http://qaapi.eventdynamic.com',
    PROD_API_URL: 'http://api.eventdynamic.com'
};

let base_url;

switch (NODE_ENV) {
  case 'development': 
    base_url = urlConstants.LOCAL_API_URL;
    break;
  case 'test': 
    base_url = urlConstants.QA_API_URL;
    break; 
  case 'fake':
    base_url = urlConstants.FAKE_API_URL;
    break;
  default: 
    base_url = urlConstants.PROD_API_URL;
}

export const baseURL = base_url;
