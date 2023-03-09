import { ShiftInMemoryDataRepository } from '@src/Domains/Shifts/Data Repository/ShiftInMemoryDataRepository';
import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';
import { Shift } from '@src/Domains/Shifts/Data Model/Shift';

export const create = async (rawData: Record<string, unknown>): Promise<IShift> => {
  const model: IShift = new Shift(rawData as unknown as IShift);
  const repo = new ShiftInMemoryDataRepository();
  const data = repo.create(model);
  return Promise.resolve(data);
};
