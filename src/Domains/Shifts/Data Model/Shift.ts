/* eslint-disable no-underscore-dangle */
import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';
import { BaseModel } from '@src/Infrastructure/Persistence/BaseModel';

export class Shift extends BaseModel implements IShift {
  private _facilityId: string;
  private _agents: Record<string, unknown>[];
  private _startDate: Date;
  private _endDate?: Date;
  private _duration = 8 * 60 * 60 * 1000;

  constructor(
    { facilityId, agents, id }: { agents: Record<string, unknown>[], facilityId: string, id?: string }
  ) {
    super(id);
    this._facilityId = facilityId;
    Shift.hasDuplicatedId(agents);
    this.agents = agents;
    const now = new Date();
    this._startDate = now;
    this._endDate = new Date(now.getMilliseconds() + this._duration);
  }

  public get facilityId(): string {
    return this._facilityId;
  }

  public set facilityId(facilityId) {
    this._facilityId = facilityId;
  }

  public get startDate(): Date {
    return this._startDate;
  }

  public set endDate(endDate: Date) {
    this._endDate = endDate;
  }

  public get endDate(): Date {
    return this._endDate;
  }

  public get agents(): Record<string, unknown>[] {
    return [...this._agents];
  }

  public set agents(agents: Record<string, unknown>[]) {
    Shift.hasDuplicatedId(agents);
    this._agents = agents;
  }

  private static hasDuplicatedId(data: Record<string, unknown>[]): void {
    const set = new Set(data.map((record) => record.id));
    if (!(set.size === data.length)) {
      throw new Error('Duplicated ID');
    }
  }

  public serialize(): Record<string, unknown> {
    return {
      id: this.id,
      facilityId: this.facilityId,
      agents: this.agents,
      startDate: this.startDate,
      endDate: this.endDate,
      ...this.baseSerialize(),
    };
  }
}
