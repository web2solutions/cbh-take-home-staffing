import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';
import { InMemoryStore } from '@src/Infrastructure/Persistence/InMemory';
import { BaseRepo } from '@src/Infrastructure/Persistence/BaseRepo';
import { Paging } from '@src/Infrastructure/Persistence/Paging';

export class AgentInMemoryDataRepository extends BaseRepo<IAgent> {
  public store;
  public limit: number;
  constructor(limit?: number) {
    super(limit);
    // points to a collection or table
    this.store = InMemoryStore.Agent;
    this.limit = limit || 30;
  }

  public create(data: IAgent): IAgent {
    this.store.create(data.id, data.serialize());
    return data;
  }

  public update(id: string, data: IAgent): IAgent {
    this.store.update(id, data.serialize());
    return data;
  }

  public delete(id: string): boolean {
    return this.store.delete(id);
  }

  public getOneById(id: string): IAgent {
    return this.store.getOneById(id);
  }

  public getByName(name: string): IAgent {
    return this.store.getByName(name);
  }

  public getAll(page = 1): Paging<IAgent> {
    const result = this.store.getAll(page, this.limit);
    return result;
  }
}
