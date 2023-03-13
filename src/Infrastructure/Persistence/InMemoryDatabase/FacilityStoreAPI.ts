import { IFacility } from '@src/Domains/Facilities/Data Entity/IFacility';
import { Paging } from '@src/Infrastructure/Persistence/Paging';
import { IMapStore } from '@src/Infrastructure/Persistence/InMemoryDatabase/IMapStore';

const facilityStore = new Map<string, unknown>();
const facilityStoreIndexes = {
  name: new Map<string, unknown>(),
};
export const FacilityStoreAPI = {
  delete: facilityStore.delete.bind(facilityStore),
  // entries: facilityStore.entries.bind(facilityStore),
  getOneById: facilityStore.get.bind(facilityStore),
  values: facilityStore.values.bind(facilityStore),
  // size: (): number => facilityStore.size,
  // [Symbol.iterator]: facilityStore[Symbol.iterator].bind(facilityStore),
  // [Symbol.toStringTag]: facilityStore[Symbol.toStringTag],
  // forEach: facilityStore.forEach.bind(facilityStore),
  // clear: facilityStore.clear.bind(facilityStore),
  // has: facilityStore.has.bind(facilityStore),
  // keys: facilityStore.keys.bind(facilityStore),
  // set: facilityStore.set.bind(facilityStore),
  create: (key, value): IFacility => {
    const object = value as IFacility;
    if (facilityStore.has(key)) {
      throw new Error('Duplicated ID');
    }
    const strName = object.name.toString().toLowerCase();
    if (facilityStoreIndexes.name.has(strName)) {
      throw new Error('name already in use');
    }
    facilityStore.set(key, object);
    facilityStoreIndexes.name.set(strName, object);
    return value;
  },
  update: (key, value): IFacility => {
    const oldRecord = facilityStore.get(key);
    if (!oldRecord) {
      throw new Error('Not Found');
    }
    const strOldName = (oldRecord as IFacility).name.toString().toLowerCase();
    const object = value as IFacility;
    const strName = object.name.toString().toLowerCase();

    facilityStore.set(key, object);
    facilityStoreIndexes.name.delete(strOldName);
    facilityStoreIndexes.name.set(strName, object);
    return value;
  },
  getByName: (name): IFacility => {
    const strName = name.toString().toLowerCase();
    const data = facilityStoreIndexes.name.get(strName) as IFacility;
    if (!data) {
      throw new Error('Not Found');
    }
    return {
      ...data,
      id: data.id,
    };
  },
  getAll: (page, limit) : Paging<IFacility> => {
    if (page < 1) {
      throw new Error('page must be greater than 0');
    }
    const records = [];
    let pages = 1;
    const count = facilityStore.size;
    pages = Math.ceil(count / limit);
    if (page > pages) {
      throw new Error('page number must be less than the number of total pages');
    }
    const startAt = (page * limit) - limit;
    let iterated = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of facilityStore.values()) {
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
} as IMapStore<IFacility>;
