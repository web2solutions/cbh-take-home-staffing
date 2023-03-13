import { AgentInMemoryDataRepository } from '@src/Domains/Agents/Data Repository/AgentInMemoryDataRepository';
import { createAgent } from '@src/Domains/Agents/Use Cases/createAgent';
import { IComponentResponse } from '@src/Infrastructure/Utils';
import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';

const James = {
  name: 'James',
} as unknown as IAgent;

const Steve = {
  name: 'Steve',
} as unknown as IAgent;

describe('createAgent - Use Case', () => {
  let repo = null;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    repo = new AgentInMemoryDataRepository();
  });
  it('component public API', async () => {
    expect.hasAssertions();
    const { error, data }: IComponentResponse = await createAgent(James, { repo });
    expect(error).toBeNull();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
  });
  it('duplicated ID must return an error', async () => {
    expect.hasAssertions();
    let agent2;
    {
      const { error, data }: IComponentResponse = await createAgent(Steve, { repo });
      expect(error).toBeNull();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('createdAt');
      expect(data).toHaveProperty('updatedAt');
      agent2 = data as unknown as IAgent;
      agent2.name = 'New agent with same ID';
    }
    {
      // agent2 has same ID as Steve but a different name
      const { error, data }: IComponentResponse = await createAgent(agent2, { repo });
      expect(data).toBe('');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Duplicated ID');
    }
  });
  it('duplicated name must return an error', async () => {
    expect.hasAssertions();
    // James will assume a new ID but will throw due that name is already in use
    const { error, data }: IComponentResponse = await createAgent(James, { repo });
    expect(data).toBe('');
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('name already in use');
  });
});
