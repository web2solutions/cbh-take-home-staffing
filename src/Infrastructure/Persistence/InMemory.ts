import { AgentStoreAPI } from '@src/Infrastructure/Persistence/InMemoryDatabase/AgentStoreAPI';
import { FacilityStoreAPI } from '@src/Infrastructure/Persistence/InMemoryDatabase/FacilityStoreAPI';
import { ShiftStoreAPI } from '@src/Infrastructure/Persistence/InMemoryDatabase/ShiftStoreAPI';
import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';
import { IFacility } from '@src/Domains/Facilities/Data Entity/IFacility';
import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';
import { IMapStore } from '@src/Infrastructure/Persistence/InMemoryDatabase/IMapStore';

export const InMemoryStore = ((): Record<string, IMapStore<IAgent | IFacility | IShift>> => {
  const stores: Record<string, IMapStore<IAgent | IFacility | IShift>> = {
    Agent: AgentStoreAPI as IMapStore<IAgent>,
    Facility: FacilityStoreAPI as IMapStore<IFacility>,
    Shift: ShiftStoreAPI as IMapStore<IShift>,
  };
  return stores;
})();
