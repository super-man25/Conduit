import { get, put } from '_helpers/api';

function getClient(clientId) {
  return get(`clients/${clientId}`);
}

function updateClient(client) {
  return put(`clients/${client.id}`, client);
}

export const clientService = {
  getClient,
  updateClient
};
