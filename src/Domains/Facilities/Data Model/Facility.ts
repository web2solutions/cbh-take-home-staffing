/* eslint-disable no-underscore-dangle */
import { UUID } from '@src/infra/utils/UUID';
import { IFacility } from '@src/Domains/Facilities/Data Entity/IFacility';

export class Facility implements IFacility {
  private _id: string;
  private _name: string;
  constructor({ name, id }: { name: string, id?: string }) {
    this._name = name;
    this._id = id ? UUID.parse(id).toString() : UUID.create().toString();
  }

  public get name(): string {
    return this._name;
  }

  public set name(name) {
    this._name = name;
  }

  public get id(): string {
    return this._id;
  }

  public serialize(): Record<string, unknown> {
    return {
      id: this._id,
      name: this._name,
    };
  }
}
