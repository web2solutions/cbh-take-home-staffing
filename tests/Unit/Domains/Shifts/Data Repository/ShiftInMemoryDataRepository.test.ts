/* eslint-disable no-console */
import { ShiftInMemoryDataRepository } from '@src/Domains/Shifts/Data Repository/ShiftInMemoryDataRepository';
import { Shift } from '@src/Domains/Shifts/Data Model/Shift';
import { seed } from '@tests/Unit/Domains/Shifts/Payloads/seed';
import { UUID, operators } from '@src/Infrastructure/Persistence/utils';

describe('shift Data Repository', () => {
  let repo = null;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    repo = new ShiftInMemoryDataRepository();
    seed.forEach((record) => {
      const model = new Shift(record);
      repo.create(model);
    });
  });
  it('component public API', () => {
    expect.hasAssertions();
    expect(repo).toHaveProperty('create');
    expect(repo).toHaveProperty('update');
    expect(repo).toHaveProperty('delete');
    expect(repo).toHaveProperty('getOneById');
    expect(repo).toHaveProperty('getAll');
  });
  it('create record with ID', () => {
    expect.hasAssertions();
    const newId = UUID.create().toString();
    const newFacilityId = UUID.create().toString();
    const model = new Shift({
      ...seed[1],
      id: newId,
      facilityId: newFacilityId,
    });
    const record = repo.create(model);
    expect(record).toHaveProperty('facilityId');
    expect(record).toHaveProperty('id');
    expect(record.id).toBe(newId);
    expect(record.facilityId).toBe(newFacilityId);
    expect(() => {
      repo.create(model);
    }).toThrow('Duplicated ID');
  });
  it('create record without ID', () => {
    expect.hasAssertions();
    const r = seed[2];
    delete r.id;
    r.facilityId = UUID.create().toString();
    const model = new Shift(r);
    const record = repo.create(model);
    expect(record).toHaveProperty('facilityId');
    expect(record).toHaveProperty('id');
    expect(record.id).toBeDefined();
    expect(record.facilityId).toBe(seed[2].facilityId);
  });
  it('getOneById', () => {
    expect.hasAssertions();
    const record = repo.getOneById(seed[1].id);
    expect(record.facilityId).toBe(seed[1].facilityId);
  });
  it('update record', () => {
    expect.hasAssertions();
    let record = repo.getOneById(seed[1].id);
    expect(record.facilityId).toBe(seed[1].facilityId);
    const newFacilityId = UUID.create().toString();
    record.facilityId = newFacilityId;
    repo.update(seed[1].id, new Shift(record));
    record = repo.getOneById(seed[1].id);
    expect(record.facilityId).toBe(newFacilityId);
  });
  it('update record with no existing id must throw', () => {
    expect.hasAssertions();
    const record = repo.getOneById(seed[1].id);
    record.id = UUID.create().toString();
    expect(() => {
      repo.update(record.id, new Shift(record));
    }).toThrow('Not Found');
  });
  it('delete record', () => {
    expect.hasAssertions();
    const deleted = repo.delete(seed[1].id);
    expect(deleted).toBe(true);
    const record = repo.getOneById(seed[1].id);
    expect(record).toBeUndefined();
  });
  it('getAll records', () => {
    expect.hasAssertions();
    const { records, page, pages } = repo.getAll(1);
    expect(records.length > 0).toBe(true);
    expect(page).toBe(1);
    expect(pages).toBe(1);
  });
  it('getAll records - passing a page number greater than total number of pages must throw', () => {
    expect.hasAssertions();
    expect(() => {
      repo.getAll(2);
    }).toThrow('page number must be less than the number of total pages');
  });
  it('getAll records - passing a page number less than 1 must throw', () => {
    expect.hasAssertions();
    expect(() => {
      repo.getAll(0);
    }).toThrow('page must be greater than 0');
  });
  it('getAll records - passing an undefined page number must return first page', () => {
    expect.hasAssertions();
    const { records, page, pages } = repo.getAll();
    expect(records.length > 0).toBe(true);
    expect(page).toBe(1);
    expect(pages).toBe(1);
  });
  it('set limit', () => {
    expect.hasAssertions();
    const repo2 = new ShiftInMemoryDataRepository(1);
    {
      const { records, page, pages } = repo2.getAll(1);
      expect(records.length > 0).toBe(true);
      expect(page).toBe(1);
      expect(pages).toBe(6);
    }
    {
      const { records, page, pages } = repo2.getAll(2);
      expect(records.length > 0).toBe(true);
      expect(page).toBe(2);
      expect(pages).toBe(6);
    }
    {
      const { records, page, pages } = repo2.getAll(3);
      expect(records.length > 0).toBe(true);
      expect(page).toBe(3);
      expect(pages).toBe(6);
    }
  });
  it('getShiftsByFacility records', () => {
    expect.hasAssertions();
    const records = repo.getShiftsByFacility(seed[0].facilityId);
    // console.log('getShiftsByFacility records', records);
    expect(records.length > 0).toBe(true);
  });
  it('search records with OR operator', () => {
    expect.hasAssertions();
    const records = repo.search(
      {
        operator: 'OR',
        filters: [{
          atrributeName: 'facilityId',
          operator: operators.equal,
          value: seed[0].facilityId,
        }, {
          atrributeName: 'facilityId',
          operator: operators.equal,
          value: seed[4].facilityId,
        }],
      }
    );
    // console.log('search records with OR operator', records);
    expect(records.length > 0).toBe(true);
  });
  it('search records with no filters and no operator', () => {
    expect.hasAssertions();
    const records = repo.search();
    // console.log('search records with no filters and no operator', records);
    expect(records.length > 0).toBe(true);
  });
});
