// @flow
import type { EDClient } from '_models';

type State = {
  clientList: { clients: [EDClient] }
};

export const getClients = (state: State) => state.clientList.clients;

export default { getClients };
