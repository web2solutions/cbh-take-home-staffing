import { ShiftInMemoryDataRepository } from '@src/Domains/Shifts/Data Repository/ShiftInMemoryDataRepository';
import { IShift } from '@src/Domains/Shifts/Data Entity/IShift';

export const generateReport = async (facilityId: string): Promise<IShift[]> => {
  const repo = new ShiftInMemoryDataRepository();
  const records: IShift[] = repo.getShiftsByFacility(facilityId);
  // eslint-disable-next-line no-console
  console.log({ records });
  return Promise.resolve(records);
};
