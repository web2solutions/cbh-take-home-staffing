import { Paging } from '@src/Infrastructure/Persistence/Paging';

export interface IMapStore<T> {
  delete(id: string): boolean;
  getOneById(id: string): T;
  getByName?(name: string): T;
  create(key: string, value: T): T;
  update(key: string, value: T): T;
  getAll(page?: number, limit?: number) : Paging<T>
}
