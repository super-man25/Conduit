let base_url;
if (process.env.REACT_APP_ED_API_URL) {
  base_url = process.env.REACT_APP_ED_API_URL;
} else {
  base_url = 'http://localhost:9000';
}
export const baseURL = base_url;
