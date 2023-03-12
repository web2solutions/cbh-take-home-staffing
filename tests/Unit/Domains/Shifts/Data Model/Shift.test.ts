import { Shift } from '@src/Domains/Shifts/Data Model/Shift';
import { IShift } from '@src/Domains/Shifts//Data Entity/IShift';
import { UUID } from '@src/Infrastructure/Persistence/utils';

const FACILITYID = UUID.create().toString();

const AGENT1 = {
  id: UUID.create().toString(),
  name: 'Jose Eduardo',
};

describe('shift Data Model', () => {
  let createPayload;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    createPayload = {
      id: '13d84160-347f-43f4-b792-de2bf1acfc0e',
      agents: [AGENT1],
      facilityId: FACILITYID,
    };
  });

  it('public read API', () => {
    expect.hasAssertions();
    const model: IShift = new Shift(createPayload);
    expect(model).toHaveProperty('id');
    expect(model).toHaveProperty('facilityId');
    expect(model).toHaveProperty('agents');
    expect(model).toHaveProperty('startDate');
    expect(model).toHaveProperty('endDate');
    expect(model).toHaveProperty('createdAt');
    expect(model).toHaveProperty('updatedAt');
  });
  it('public write API', () => {
    expect.hasAssertions();
    const ID = UUID.create().toString();
    const model: IShift = new Shift({ ...createPayload, id: ID });
    const updatedFacilityId = UUID.create().toString();
    model.facilityId = updatedFacilityId;
    const now = new Date();
    model.updatedAt = now;
    model.endDate = now;

    const agent2 = {
      id: UUID.create().toString(),
      name: 'James Belush',
    };

    // model.agents.push(agent2);
    // expect(model.agents[1].name).toBe(agent2.name);

    expect(model.id).toBe(ID);

    expect(model.facilityId).toBe(updatedFacilityId);
    expect(model.updatedAt).toBe(now);
    expect(model.endDate).toBe(now);

    model.agents = [agent2];
    expect(model.agents[0].name).toBe(agent2.name);

    expect(() => {
      // eslint-disable-next-line no-new
      model.agents = [agent2, agent2];
    }).toThrow('Duplicated ID');
  });
  it('create new Model - facilityId must match', () => {
    expect.hasAssertions();
    const model: IShift = new Shift(createPayload);
    expect(model.facilityId).toBe(FACILITYID);
  });
  it('create new Model - duplicated Agent ID must throw', () => {
    expect.hasAssertions();
    const agent2 = {
      id: UUID.create().toString(),
      name: 'James Belush',
    };
    expect(() => {
      // eslint-disable-next-line no-new
      new Shift({ ...createPayload, agents: [agent2, agent2] });
    }).toThrow('Duplicated ID');
  });
  it('update existing Model - check id', () => {
    expect.hasAssertions();
    expect(() => {
      // eslint-disable-next-line no-new
      new Shift({ ...createPayload, id: 'xxxxxxxx' });
    }).toThrow('Invalid UUID');
  });
  it('serialize', () => {
    expect.hasAssertions();
    const model: IShift = new Shift(createPayload);
    let data = model.serialize();
    expect(data.facilityId).toBe(FACILITYID);
    expect(data.id).toBe(createPayload.id);
    const updatedFacilityId = UUID.create().toString();
    model.facilityId = updatedFacilityId;
    data = model.serialize();
    expect(data.id).toBe(createPayload.id);
    expect(data.facilityId).toBe(updatedFacilityId);
  });
});
