import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';
import { Paging } from '@src/Infrastructure/Persistence/Paging';
import { IMapStore } from '@src/Infrastructure/Persistence/InMemoryDatabase/IMapStore';

const agentStore = new Map<string, unknown>();
const agentStoreIndexes = {
  name: new Map<string, unknown>(),
};
export const AgentStoreAPI = {
  delete: agentStore.delete.bind(agentStore),
  // entries: agentStore.entries.bind(agentStore),
  getOneById: agentStore.get.bind(agentStore),
  values: agentStore.values.bind(agentStore),
  // size: (): number => agentStore.size,
  // [Symbol.iterator]: agentStore[Symbol.iterator].bind(agentStore),
  // [Symbol.toStringTag]: agentStore[Symbol.toStringTag],
  // forEach: agentStore.forEach.bind(agentStore),
  // clear: agentStore.clear.bind(agentStore),
  // has: agentStore.has.bind(agentStore),
  // keys: agentStore.keys.bind(agentStore),
  // set: agentStore.set.bind(agentStore),
  create: (key, value): IAgent => {
    const object = value as IAgent;
    if (agentStore.has(key)) {
      throw new Error('Duplicated ID');
    }
    const strName = object.name.toString().toLowerCase();
    if (agentStoreIndexes.name.has(strName)) {
      throw new Error('name already in use');
    }
    agentStore.set(key, object);
    agentStoreIndexes.name.set(strName, object);
    return value;
  },
  update: (key, value): IAgent => {
    const oldRecord = agentStore.get(key);
    if (!oldRecord) {
      throw new Error('Not Found');
    }
    const strOldName = (oldRecord as IAgent).name.toString().toLowerCase();
    const object = value as IAgent;
    const strName = object.name.toString().toLowerCase();

    agentStore.set(key, object);
    agentStoreIndexes.name.delete(strOldName);
    agentStoreIndexes.name.set(strName, object);
    return value;
  },
  getByName: (name): IAgent => {
    const strName = name.toString().toLowerCase();
    const data = agentStoreIndexes.name.get(strName) as IAgent;
    if (!data) {
      throw new Error('Not Found');
    }
    return {
      ...data,
      id: data.id,
    };
  },
  getAll: (page, limit) : Paging<IAgent> => {
    if (page < 1) {
      throw new Error('page must be greater than 0');
    }
    const records = [];
    let pages = 1;
    const count = agentStore.size;
    pages = Math.ceil(count / limit);
    if (page > pages) {
      throw new Error('page number must be less than the number of total pages');
    }
    const startAt = (page * limit) - limit;
    let iterated = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of agentStore.values()) {
      // eslint-disable-next-line operator-assignment
      iterated = iterated + 1;
      if (iterated > startAt) {
        if (records.length < limit) {
          records.push(value);
        }
      }
    }

    return { records, pages, page };
  },
} as IMapStore<IAgent>;
