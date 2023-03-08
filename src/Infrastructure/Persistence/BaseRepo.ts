/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
import { Paging } from '@src/Infrastructure/Persistence/Paging';
import { InMemoryStore } from '@src/Infrastructure/Persistence/InMemory';

export abstract class BaseRepo<T> {
  public store;
  public limit: number;
  constructor(limit?: number) {
    this.store = InMemoryStore.Agent;
    this.limit = limit || 30;
  }

  public create(data: T): T {
    throw new Error('Not implemented');
  }

  public update(id: string, data: T): T {
    throw new Error('Not implemented');
  }

  public delete(id: string): boolean {
    throw new Error('Not implemented');
  }

  public getOneById(id: string): T {
    throw new Error('Not implemented');
  }

  public getAll(page = 1): Paging {
    throw new Error('Not implemented');
  }
}
