/* eslint-disable no-underscore-dangle */
import { UUID } from '@src/Infrastructure/Persistence/utils';

export abstract class BaseModel {
  private _createdAt: Date;
  private _updatedAt: Date;
  private _id: string;

  constructor(id?: string) {
    this._id = id ? UUID.parse(id).toString() : UUID.create().toString();
    const now = new Date();
    this._createdAt = now;
    this._updatedAt = now;
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(updatedAt: Date) {
    this._updatedAt = updatedAt;
  }

  public baseSerialize(): Record<string, unknown> {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
