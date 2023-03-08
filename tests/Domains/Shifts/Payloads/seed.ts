import { UUID } from '@src/Infrastructure/utils/UUID';

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

const FACILITY1ID = UUID.create().toString();
const FACILITY2ID = UUID.create().toString();

export const seed = [
  {
    id: UUID.create().toString(),
    agents: [AGENT1, AGENT2],
    facilityId: FACILITY1ID,
  },
  {
    id: UUID.create().toString(),
    agents: [AGENT3, AGENT4],
    facilityId: FACILITY2ID,
  },
];
