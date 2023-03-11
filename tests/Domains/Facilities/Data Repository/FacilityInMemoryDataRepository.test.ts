import { FacilityInMemoryDataRepository } from '@src/Domains/Facilities/Data Repository/FacilityInMemoryDataRepository';
import { Facility } from '@src/Domains/Facilities/Data Model/Facility';
import { seed } from '@tests/Domains/Facilities/Payloads/seed';
import { UUID } from '@src/Infrastructure/Persistence/utils';

const Billing = {
  name: 'Billing Engineers',
  id: '13d84160-347f-43f4-b792-de2bf1acfc0e',
};

const BillingStaff = {
  name: 'Billing Staff',
};

describe('facility Data Repository', () => {
  let repo = null;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    repo = new FacilityInMemoryDataRepository();
    seed.forEach((record) => {
      const model = new Facility(record);
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
    const model = new Facility(Billing);
    const record = repo.create(model);
    expect(record).toHaveProperty('name');
    expect(record).toHaveProperty('id');
    expect(record.id).toBe(Billing.id);
    expect(record.name).toBe(Billing.name);
    expect(() => {
      repo.create(model);
    }).toThrow('Duplicated ID');
  });
  it('create record without ID', () => {
    expect.hasAssertions();
    const model = new Facility(BillingStaff);
    const record = repo.create(model);
    expect(record).toHaveProperty('name');
    expect(record).toHaveProperty('id');
    expect(record.id).toBeDefined();
    expect(record.name).toBe(BillingStaff.name);
  });
  it('getOneById', () => {
    expect.hasAssertions();
    const record = repo.getOneById(Billing.id);
    expect(record.name).toBe(Billing.name);
  });
  it('update record', () => {
    expect.hasAssertions();
    let record = repo.getOneById(Billing.id);
    expect(record.name).toBe(Billing.name);
    record.name = 'Engineers Billing';
    repo.update(Billing.id, new Facility(record));
    record = repo.getOneById(Billing.id);
    expect(record.name).toBe('Engineers Billing');
  });
  it('update record with no existing id must throw', () => {
    expect.hasAssertions();
    const record = repo.getOneById(Billing.id);
    record.id = UUID.create().toString();
    expect(() => {
      repo.update(record.id, new Facility(record));
    }).toThrow('Not Found');
  });
  it('delete record', () => {
    expect.hasAssertions();
    const deleted = repo.delete(Billing.id);
    expect(deleted).toBe(true);
    const record = repo.getOneById(Billing.id);
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
    repo = new FacilityInMemoryDataRepository(2);
    const { records, page, pages } = repo.getAll(2);
    expect(records.length > 0).toBe(true);
    expect(page).toBe(2);
    expect(pages).toBe(2);
  });
});
