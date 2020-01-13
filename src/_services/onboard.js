import { post } from '_helpers/api';

function onboardClient(data) {
  return post('clients/onboard', data);
}

export const onboardService = {
  onboardClient,
};
