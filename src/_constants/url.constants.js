
export const FAKE_API = false;
const NODE_ENV = !FAKE_API ? process.env.NODE_ENV : 'fake';

console.log('~~~~~ NODE_ENV is ' + NODE_ENV + ' ~~~~~');

export const urlConstants = {
    LOCAL_API_URL: 'http://localhost:9000',
    FAKE_API_URL: 'http://localhost:3000/fake',
    QA_API_URL: 'http://qaapi.eventdynamic.com',
    PROD_API_URL: 'http://api.eventdynamic.com'
};

export const baseURL = NODE_ENV === 'development' ? urlConstants.LOCAL_API_URL : NODE_ENV === 'test' ? urlConstants.QA_API_URL : NODE_ENV === 'fake' ? urlConstants.FAKE_API_URL : urlConstants.PROD_API_URL;
