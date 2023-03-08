export interface IShift {
  id: string;
  facilityId: string;
  agents: Record<string, unknown>[];
  startDate: Date;
  endDate?: Date;
  serialize(): Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
