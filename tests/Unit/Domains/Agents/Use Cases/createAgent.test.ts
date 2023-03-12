import { AgentInMemoryDataRepository } from '@src/Domains/Agents/Data Repository/AgentInMemoryDataRepository';
import { createAgent } from '@src/Domains/Agents/Use Cases/createAgent';
import { IComponentResponse } from '@src/Infrastructure/Utils';
import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';

const Obama = {
  name: 'Barack Obama',
} as unknown as IAgent;

describe('createAgent - Use Case', () => {
  let repo = null;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(() => {
    repo = new AgentInMemoryDataRepository();
  });
  it('component public API', async () => {
    expect.hasAssertions();
    const { error, data }: IComponentResponse = await createAgent(Obama, { repo });
    /* eslint-disable no-console */
    // console.log({ error, data });
    expect(error).toBeNull();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
  });
  it('duplicated ID must return an error', async () => {
    let agent2;
    expect.hasAssertions();
    {
      const { error, data }: IComponentResponse = await createAgent(Obama, { repo });
      expect(error).toBeNull();
      expect(data).toHaveProperty('id');
      expect(data).toHaveProperty('name');
      expect(data).toHaveProperty('createdAt');
      expect(data).toHaveProperty('updatedAt');
      agent2 = data as unknown as IAgent;
      agent2.name = 'New agent with same ID';
    }
    {
      const { error, data }: IComponentResponse = await createAgent(agent2, { repo });
      expect(data).toBe('');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Duplicated ID'); 
    }
  });
});