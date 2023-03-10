import { Paging } from '@src/Infrastructure/Persistence/Paging';
import { InMemoryStore } from '@src/Infrastructure/Persistence/InMemory';

export abstract class BaseRepo<T> {
  public store;
  public limit: number;
  constructor(limit?: number) {
    this.store = InMemoryStore.Agent;
    this.limit = limit || 30;
  }

  public abstract create(data: T): T;
  public abstract update(id: string, data: T): T;
  public abstract delete(id: string): boolean;
  public abstract getOneById(id: string): T;
  public abstract getAll(page: number): Paging<T>;
}
