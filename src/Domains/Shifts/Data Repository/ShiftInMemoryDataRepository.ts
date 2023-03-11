/* eslint-disable no-loop-func */
import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';
import { Shift } from '@src/Domains/Shifts/Data Model/Shift';
import { InMemoryStore } from '@src/Infrastructure/Persistence/InMemory';
import { BaseRepo } from '@src/Infrastructure/Persistence/BaseRepo';
import { Paging } from '@src/Infrastructure/Persistence/Paging';
import { operators, ISearch } from '@src/Infrastructure/Persistence/utils';

export class ShiftInMemoryDataRepository extends BaseRepo<IShift> {
  public store;
  public limit: number;

  constructor(limit?: number) {
    super(limit);
    this.store = InMemoryStore.Shift;
    this.limit = limit || 30;
  }

  private hasDuplicatedId(id: string): void {
    if (this.getOneById(id)) {
      throw new Error('Duplicated ID');
    }
  }

  public create(data: IShift): IShift {
    this.hasDuplicatedId(data.id);
    this.store.set(data.id, data.serialize());
    return data;
  }

  public update(id: string, data: IShift): IShift {
    if (!this.getOneById(id)) {
      throw new Error('Not Found');
    }
    this.store.set(id, data.serialize());
    return data;
  }

  public delete(id: string): boolean {
    return this.store.delete(id);
  }

  public getOneById(id: string): IShift {
    return this.store.get(id);
  }

  public getAll(page = 1): Paging<IShift> {
    if (page < 1) {
      throw new Error('page must be greater than 0');
    }
    const records = [];
    let pages = 1;
    const count = this.store.size;
    pages = Math.ceil(count / this.limit);
    if (page > pages) {
      throw new Error('page number must be less than the number of total pages');
    }

    const startAt = (page * this.limit) - this.limit;
    let iterated = 0;
    // eslint-disable-next-line no-restricted-syntax
    for (const value of this.store.values()) {
      // eslint-disable-next-line operator-assignment
      iterated = iterated + 1;
      if (iterated > startAt) {
        if (records.length < this.limit) {
          records.push(new Shift(value));
        }
      }
    }
    return { records, page, pages };
  }

  public search(query?: ISearch): IShift[] {
    const { operator = 'AND', filters = [] } = query || {};
    const records: IShift[] = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const value of this.store.values()) {
      let filtersSatisfied = 0;
      // eslint-disable-next-line operator-assignment
      filters.forEach((filter) => {
        const attributeValue = value[filter.atrributeName];
        if (filter.operator === operators.equal) {
          if (attributeValue === filter.value) {
            // eslint-disable-next-line operator-assignment
            filtersSatisfied = filtersSatisfied + 1;
          }
        }
      });
      const model = new Shift(value);
      if (filters.length > 0) {
        if (operator === 'AND' && filtersSatisfied === filters.length) {
          records.push(model);
        }
        if (operator === 'OR' && filtersSatisfied > 0) {
          records.push(model);
        }
      } else {
        records.push(model);
      }
    }
    return records;
  }

  public getShiftsByFacility(facilityId: string): IShift[] {
    // is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
    const records = this.search({
      filters: [
        {
          atrributeName: 'facilityId',
          operator: operators.equal,
          value: facilityId,
        },
      ],
    });
    return records;
  }
}
