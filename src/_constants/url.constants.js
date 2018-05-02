let baseurl;

if (process.env.REACT_APP_ED_API_URL) {
  baseurl = process.env.REACT_APP_ED_API_URL;
} else {
  baseurl = 'http://localhost:9000';
}

export const baseURL = baseurl;
