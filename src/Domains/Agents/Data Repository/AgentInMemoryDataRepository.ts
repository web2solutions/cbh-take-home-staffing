import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';
import { InMemoryStore } from '@src/Infrastructure/Persistence/InMemory';
import { BaseRepo } from '@src/Infrastructure/Persistence/BaseRepo';
import { Paging } from '@src/Infrastructure/Persistence/Paging';

export class AgentInMemoryDataRepository extends BaseRepo<IAgent> {
  public store;
  public limit: number;
  constructor(limit?: number) {
    super(limit);
    this.store = InMemoryStore.Agent;
    this.limit = limit || 30;
  }

  public create(data: IAgent): IAgent {
    this.store.set(data.id, data.serialize());
    return data;
  }

  public update(id: string, data: IAgent): IAgent {
    this.store.set(id, data.serialize());
    return data;
  }

  public delete(id: string): boolean {
    return this.store.delete(id);
  }

  public getOneById(id: string): IAgent {
    return this.store.get(id);
  }

  public getAll(page = 1): Paging<IAgent> {
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
          records.push(value);
        }
      }
    }
    return { records, page, pages };
  }
}
