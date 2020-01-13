// Selectors

export const getClient = (state) => state.client;

export const getClientId = (state) => state.auth.model.clientId;

export default {
  getClient,
  getClientId,
};
