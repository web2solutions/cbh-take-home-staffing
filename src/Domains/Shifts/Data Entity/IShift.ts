import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';

export interface IShift {
  id: string;
  facilityId: string;
  agents: IAgent[];
  startDate: Date;
  endDate?: Date;
  serialize(): Record<string, unknown>;
}
