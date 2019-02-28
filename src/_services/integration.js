import { get, put } from '_helpers/api';

function getIntegrations(clientId) {
  return get(`clientIntegrations`);
}

function toggleIntegration(clientIntegrationId, payload) {
  return put(`clientIntegrations/${clientIntegrationId}/toggle`, payload);
}

function updateSecondaryPricingRule(clientIntegrationId, payload) {
  return put(`clientIntegrations/${clientIntegrationId}`, payload);
}

export const integrationService = {
  getIntegrations,
  toggleIntegration,
  updateSecondaryPricingRule
};
