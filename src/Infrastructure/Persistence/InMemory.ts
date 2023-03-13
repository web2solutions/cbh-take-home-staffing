import { AgentStoreAPI } from '@src/Infrastructure/Persistence/InMemoryDatabase/AgentStoreAPI';
import { FacilityStoreAPI } from '@src/Infrastructure/Persistence/InMemoryDatabase/FacilityStoreAPI';
import { ShiftStoreAPI } from '@src/Infrastructure/Persistence/InMemoryDatabase/ShiftStoreAPI';

export const InMemoryStore = ((): Record<string, Map<string, unknown> | Record<string, unknown>> => {
  const stores: Record<string, Map<string, unknown> | Record<string, unknown>> = {
    Agent: AgentStoreAPI,
    Facility: FacilityStoreAPI,
    Shift: ShiftStoreAPI,
  };
  return stores;
})();
