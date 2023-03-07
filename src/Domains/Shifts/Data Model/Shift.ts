/* eslint-disable no-underscore-dangle */
import { UUID } from '@src/infra/utils/UUID';
import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';
import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';

export class Shift implements IShift {
  private _id: string;
  private _facilityId: string;
  private _agents: IAgent[];
  private _startDate: number;
  private _endDate?: number;
  private _duration = 8 * 60 * 60 * 1000;
  constructor(
    { facilityId, agents, id }: { agents: IAgent[], facilityId: string, id?: string }
  ) {
    this._id = id ? UUID.parse(id).toString() : UUID.create().toString();
    this._facilityId = facilityId;
    this._agents = agents;
    this._startDate = (new Date()).getMilliseconds();
    this._endDate = this._startDate + this._duration;
  }

  public get id(): string {
    return this._id;
  }

  public get facilityId(): string {
    return this._facilityId;
  }

  public set facilityId(facilityId) {
    this._facilityId = facilityId;
  }

  public get startDate(): Date {
    return new Date(this._startDate);
  }

  public get endDate(): Date {
    return new Date(this._endDate);
  }

  public get agents(): IAgent[] {
    return this._agents;
  }

  public set agents(agents: IAgent[]) {
    this._agents = agents;
  }

  public serialize(): Record<string, unknown> {
    return {
      id: this.id,
      facilityId: this.facilityId,
      agents: this.agents,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}
