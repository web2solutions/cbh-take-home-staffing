import { ShiftInMemoryDataRepository } from '@src/Domains/Shifts/Data Repository/ShiftInMemoryDataRepository';
import { Shift } from '@src/Domains/Shifts/Data Model/Shift';
import { seed } from '@tests/Domains/Shifts/Payloads/seed';

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
    const model = new Shift(seed[0]);
    const record = repo.create(model);
    expect(record).toHaveProperty('facilityId');
    expect(record).toHaveProperty('id');
    expect(record.id).toBe(seed[0].id);
    expect(record.facilityId).toBe(seed[0].facilityId);
  });
  it('create record without ID', () => {
    expect.hasAssertions();
    const r = seed[1];
    delete r.id;
    const model = new Shift(r);
    const record = repo.create(model);
    expect(record).toHaveProperty('facilityId');
    expect(record).toHaveProperty('id');
    expect(record.id).toBeDefined();
    expect(record.facilityId).toBe(seed[1].facilityId);
  });
  it('getOneById', () => {
    expect.hasAssertions();
    const record = repo.getOneById(seed[0].id);
    expect(record.facilityId).toBe(seed[0].facilityId);
  });
  it('update record', () => {
    expect.hasAssertions();
    let record = repo.getOneById(seed[0].id);
    expect(record.facilityId).toBe(seed[0].facilityId);
    record.facilityId = 'Engineers seed[0]';
    repo.update(seed[0].id, new Shift(record));
    record = repo.getOneById(seed[0].id);
    expect(record.facilityId).toBe('Engineers seed[0]');
  });
  it('delete record', () => {
    expect.hasAssertions();
    const deleted = repo.delete(seed[0].id);
    expect(deleted).toBe(true);
    const record = repo.getOneById(seed[0].id);
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
    repo = new ShiftInMemoryDataRepository(1);
    const { records, page, pages } = repo.getAll(1);
    // eslint-disable-next-line no-console
    console.log({ records, page, pages });
    expect(records.length > 0).toBe(true);
    expect(page).toBe(1);
    expect(pages).toBe(2);
  });
});
