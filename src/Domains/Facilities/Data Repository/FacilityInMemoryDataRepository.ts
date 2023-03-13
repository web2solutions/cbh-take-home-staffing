import { IFacility } from '@src/Domains/Facilities/Data Entity/IFacility';
import { InMemoryStore } from '@src/Infrastructure/Persistence/InMemory';
import { BaseRepo } from '@src/Infrastructure/Persistence/BaseRepo';
import { Paging } from '@src/Infrastructure/Persistence/Paging';

export class FacilityInMemoryDataRepository extends BaseRepo<IFacility> {
  public store;
  public limit: number;

  constructor(limit?: number) {
    super(limit);
    this.store = InMemoryStore.Facility;
    this.limit = limit || 30;
  }

  public create(data: IFacility): IFacility {
    this.store.create(data.id, data.serialize());
    return data;
  }

  public update(id: string, data: IFacility): IFacility {
    this.store.update(id, data.serialize());
    return data;
  }

  public delete(id: string): boolean {
    return this.store.delete(id);
  }

  public getOneById(id: string): IFacility {
    return this.store.getOneById(id);
  }

  public getByName(name: string): IFacility {
    return this.store.getByName(name);
  }

  public getAll(page = 1): Paging<IFacility> {
    const result = this.store.getAll(page, this.limit);
    return result;
  }
}
