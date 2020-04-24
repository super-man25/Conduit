import { get, put, post } from '_helpers/api';
import { denormalize } from './normalizers/client';

function getIntegrations(clientId) {
  return get(`clientIntegrations`);
}

function toggleIntegration(clientIntegrationId, payload) {
  return put(`clientIntegrations/${clientIntegrationId}/toggle`, payload);
}

function updateSecondaryPricingRule(body) {
  const { id, ...payload } = body;
  return denormalize(payload).then((validBody) => {
    return put(`clientIntegrations/${id}`, validBody).catch(
      handleResponseError
    );
  });
}

function disableClientIntegration(integrationId) {
  return post(`clientIntegrations/disable/${integrationId}`);
}

function handleResponseError(error) {
  console.error(error);
  switch (error.code) {
    default:
      error.toString = () => 'Error saving client integration';
  }
  throw error;
}

export const integrationService = {
  getIntegrations,
  toggleIntegration,
  updateSecondaryPricingRule,
  disableClientIntegration,
};
