import { AgentInMemoryDataRepository } from '@src/Domains/Agents/Data Repository/AgentInMemoryDataRepository';
import { Agent } from '@src/Domains/Agents/Data Model/Agent';
import { seed } from '@tests/Unit/Domains/Agents/Payloads/seed';
import { UUID } from '@src/Infrastructure/Persistence/utils';

const Joe = {
  name: 'Joe Biden',
  id: '13d84160-347f-43f4-b792-de2bf1acfc0e',
};

const Obama = {
  name: 'Barack Obama',
};

describe('agent Data Repository', () => {
  let repo = null;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    repo = new AgentInMemoryDataRepository();
    seed.forEach((record) => {
      const model = new Agent(record);
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
    expect(repo).toHaveProperty('getByName');
  });
  it('create record with ID', () => {
    expect.hasAssertions();
    const model = new Agent(Joe);
    const record = repo.create(model);
    expect(record).toHaveProperty('name');
    expect(record).toHaveProperty('id');
    expect(record.id).toBe(Joe.id);
    expect(record.name).toBe(Joe.name);
    expect(() => {
      repo.create(model);
    }).toThrow('Duplicated ID');
    expect(() => {
      const model2 = new Agent({ ...Joe, id: UUID.create().toString() });
      repo.create(model2);
    }).toThrow('name already in use');
  });
  it('create record without ID', () => {
    expect.hasAssertions();
    const model = new Agent(Obama);
    const record = repo.create(model);
    expect(record).toHaveProperty('name');
    expect(record).toHaveProperty('id');
    expect(record.id).toBeDefined();
    expect(record.name).toBe(Obama.name);
  });
  it('getOneById', () => {
    expect.hasAssertions();
    const record = repo.getOneById(Joe.id);
    expect(record.name).toBe(Joe.name);
  });
  it('getByName', () => {
    expect.hasAssertions();
    const record = repo.getByName(Joe.name);
    expect(record.name).toBe(Joe.name);
    expect(() => {
      repo.getByName('Bill Gates');
    }).toThrow('Not Found');
  });
  it('update record', () => {
    expect.hasAssertions();
    let record = repo.getOneById(Joe.id);
    expect(record.name).toBe(Joe.name);
    record.name = 'Biden Joe';
    repo.update(Joe.id, new Agent(record));
    record = repo.getOneById(Joe.id);
    expect(record.name).toBe('Biden Joe');
  });
  it('update record with no existing id must throw', () => {
    expect.hasAssertions();
    const record = repo.getOneById(Joe.id);
    record.id = UUID.create().toString();
    expect(() => {
      repo.update(record.id, new Agent(record));
    }).toThrow('Not Found');
  });
  it('delete record', () => {
    expect.hasAssertions();
    const deleted = repo.delete(Joe.id);
    expect(deleted).toBe(true);
    const record = repo.getOneById(Joe.id);
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
    repo = new AgentInMemoryDataRepository(2);
    const { records, page, pages } = repo.getAll(2);
    expect(records.length > 0).toBe(true);
    expect(page).toBe(2);
    expect(pages).toBe(2);
  });
});
