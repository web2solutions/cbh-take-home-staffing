import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';
import { Paging } from '@src/Infrastructure/Persistence/Paging';
import { IMapStore } from '@src/Infrastructure/Persistence/InMemoryDatabase/IMapStore';

const shiftStore = new Map<string, unknown>();

export const ShiftStoreAPI = {
  delete: shiftStore.delete.bind(shiftStore),
  // entries: shiftStore.entries.bind(shiftStore),
  getOneById: shiftStore.get.bind(shiftStore),
  values: shiftStore.values.bind(shiftStore),
  // size: (): number => shiftStore.size,
  // [Symbol.iterator]: shiftStore[Symbol.iterator].bind(shiftStore),
  // [Symbol.toStringTag]: shiftStore[Symbol.toStringTag],
  // forEach: shiftStore.forEach.bind(shiftStore),
  // clear: shiftStore.clear.bind(shiftStore),
  // has: shiftStore.has.bind(shiftStore),
  // keys: shiftStore.keys.bind(shiftStore),
  // set: shiftStore.set.bind(shiftStore),
  create: (key, value): IShift => {
    const object = value as IShift;
    if (shiftStore.has(key)) {
      throw new Error('Duplicated ID');
    }
    shiftStore.set(key, object);
    return value;
  },
  update: (key, value): IShift => {
    const oldRecord = shiftStore.get(key);
    if (!oldRecord) {
      throw new Error('Not Found');
    }
    const object = value as IShift;

    shiftStore.set(key, object);
    return value;
  },

  getAll: (page, limit) : Paging<IShift> => {
    if (page < 1) {
      throw new Error('page must be greater than 0');
    }
    const records = [];
    let pages = 1;
    const count = shiftStore.size;
    pages = Math.ceil(count / limit);
    if (page > pages) {
      throw new Error('page number must be less than the number of total pages');
    }
    const startAt = (page * limit) - limit;
    let iterated = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of shiftStore.values()) {
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
} as IMapStore<IShift>;
