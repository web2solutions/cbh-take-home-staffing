import { Agent } from '@src/Domains/Agents/Data Model/Agent';
import { IAgent } from '@src/Domains/Agents//Data Entity/IAgent';
import { createPayload } from '@tests/Unit/Domains/Agents/Payloads/create';
import { updatePayload } from '@tests/Unit/Domains/Agents/Payloads/update';

describe('agent Data Model', () => {
  it('public read API', () => {
    expect.hasAssertions();
    const model: IAgent = new Agent(createPayload);
    expect(model).toHaveProperty('id');
    expect(model).toHaveProperty('name');
    expect(model).toHaveProperty('createdAt');
    expect(model).toHaveProperty('updatedAt');
  });
  it('public write API', () => {
    expect.hasAssertions();
    const model: IAgent = new Agent(createPayload);
    const updatedName = 'James Santana';
    model.name = updatedName;
    const now = new Date();
    model.updatedAt = now;
    expect(model.name).toBe(updatedName);
    expect(model.updatedAt).toBe(now);
  });
  it('create new Model - name must match', () => {
    expect.hasAssertions();
    const model: IAgent = new Agent(createPayload);
    expect(model.name).toBe('Jose Eduardo');
  });
  it('update existing Model - check id', () => {
    expect.hasAssertions();
    expect(() => {
      // eslint-disable-next-line no-new
      new Agent({ ...updatePayload, id: 'xxxxxxxx' });
    }).toThrow('Invalid UUID');
  });
  it('update existing Model - name must match', () => {
    expect.hasAssertions();
    const model: IAgent = new Agent(updatePayload);
    const updatedName = 'James Santana';
    model.name = updatedName;
    expect(model.name).toBe(updatedName);
    expect(model.id).toBe(updatePayload.id);
  });
  it('serialize', () => {
    expect.hasAssertions();
    const model: IAgent = new Agent(updatePayload);
    let data = model.serialize();
    expect(data.name).toBe('Jose Eduardo');
    expect(data.id).toBe(updatePayload.id);
    const updatedName = 'James Santana';
    model.name = updatedName;
    data = model.serialize();
    expect(data.name).toBe(updatedName);
    expect(data.id).toBe(updatePayload.id);
  });
});
