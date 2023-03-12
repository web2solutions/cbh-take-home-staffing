import { Facility } from '@src/Domains/Facilities/Data Model/Facility';
import { IFacility } from '@src/Domains/Facilities//Data Entity/IFacility';
import { createPayload } from '@tests/Unit/Domains/Facilities/Payloads/create';
import { updatePayload } from '@tests/Unit/Domains/Facilities/Payloads/update';

describe('facility Data Model', () => {
  it('public read API', () => {
    expect.hasAssertions();
    const model: IFacility = new Facility(createPayload);
    expect(model).toHaveProperty('id');
    expect(model).toHaveProperty('name');
    expect(model).toHaveProperty('createdAt');
    expect(model).toHaveProperty('updatedAt');
  });
  it('public write API', () => {
    expect.hasAssertions();
    const model: IFacility = new Facility(createPayload);
    const updatedName = 'Recruiting - Engineers';
    model.name = updatedName;
    const now = new Date();
    model.updatedAt = now;
    expect(model.name).toBe(updatedName);
    expect(model.updatedAt).toBe(now);
  });
  it('create new Model - name must match', () => {
    expect.hasAssertions();
    const model: IFacility = new Facility(createPayload);
    expect(model.name).toBe('Recruiting');
  });
  it('update existing Model - check id', () => {
    expect.hasAssertions();
    expect(() => {
      // eslint-disable-next-line no-new
      new Facility({ ...updatePayload, id: 'xxxxxxxx' });
    }).toThrow('Invalid UUID');
  });
  it('update existing Model - name must match', () => {
    expect.hasAssertions();
    const model: IFacility = new Facility(updatePayload);
    const updatedName = 'Recruiting - Engineers';
    model.name = updatedName;
    expect(model.name).toBe(updatedName);
    expect(model.id).toBe(updatePayload.id);
  });
  it('serialize', () => {
    expect.hasAssertions();
    const model: IFacility = new Facility(updatePayload);
    let data = model.serialize();
    expect(data.name).toBe('Recruiting');
    expect(data.id).toBe(updatePayload.id);
    const updatedName = 'Recruiting - Engineers';
    model.name = updatedName;
    data = model.serialize();
    expect(data.id).toBe(updatePayload.id);
    expect(data.name).toBe(updatedName);
  });
});
