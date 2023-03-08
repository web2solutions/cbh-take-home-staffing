/* eslint-disable no-underscore-dangle */
import { IFacility } from '@src/Domains/Facilities/Data Entity/IFacility';
import { BaseModel } from '@src/Infrastructure/Persistence/BaseModel';

export class Facility extends BaseModel implements IFacility {
  private _name: string;

  constructor({ name, id }: { name: string, id?: string }) {
    super(id);
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name) {
    this._name = name;
  }

  public serialize(): Record<string, unknown> {
    return {
      id: this.id,
      name: this.name,
      ...this.baseSerialize(),
    };
  }
}
