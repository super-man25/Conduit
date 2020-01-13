import { get, put } from '_helpers/api';

function getClient(clientId) {
  return get(`clients/${clientId}`);
}

function getClientList() {
  return get(`clients`);
}

function updateClient(client) {
  return put(`clients/${client.id}`, client);
}

function setActiveClient(id) {
  return put(`clients/${id}/setActive`);
}

export const clientService = {
  getClient,
  getClientList,
  setActiveClient,
  updateClient,
};
