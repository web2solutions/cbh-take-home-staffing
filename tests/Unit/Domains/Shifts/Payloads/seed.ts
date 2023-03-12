import { UUID } from '@src/Infrastructure/Persistence/utils';

const AGENT1 = {
  id: UUID.create().toString(),
  name: 'Jose Eduardo',
};
const AGENT2 = {
  id: UUID.create().toString(),
  name: 'James Belush',
};
const AGENT3 = {
  id: UUID.create().toString(),
  name: 'Joe Biden',
};
const AGENT4 = {
  id: UUID.create().toString(),
  name: 'Barack Obama',
};

export const seed = [
  {
    id: UUID.create().toString(),
    agents: [AGENT1, AGENT2],
    facilityId: UUID.create().toString(),
  },
  {
    id: UUID.create().toString(),
    agents: [AGENT3, AGENT4],
    facilityId: UUID.create().toString(),
  },
  {
    id: UUID.create().toString(),
    agents: [AGENT3, AGENT4],
    facilityId: UUID.create().toString(),
  },
  {
    id: UUID.create().toString(),
    agents: [AGENT3, AGENT4],
    facilityId: UUID.create().toString(),
  },
  {
    id: UUID.create().toString(),
    agents: [AGENT3, AGENT4],
    facilityId: UUID.create().toString(),
  },
];
