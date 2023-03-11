import { AgentInMemoryDataRepository } from '@src/Domains/Agents/Data Repository/AgentInMemoryDataRepository';
import { createAgent } from '@src/Domains/Agents/Use Cases/createAgent';
import { updateAgent } from '@src/Domains/Agents/Use Cases/updateAgent';
import { IComponentResponse } from '@src/Infrastructure/Utils';
import { IAgent } from '@src/Domains/Agents/Data Entity/IAgent';
import { UUID } from '@src/Infrastructure/Persistence/utils';

const Obama = {
  name: 'Barack Obama',
} as unknown as IAgent;

describe('updateAgent - Use Case', () => {
  let repo = null;
  let record;
  // eslint-disable-next-line jest/no-hooks
  beforeAll(async () => {
    repo = new AgentInMemoryDataRepository();
    const { data }: IComponentResponse = await createAgent(Obama, { repo });
    record = data;
  });
  it('component public API', async () => {
    expect.hasAssertions();
    record.name = 'Judah';
    const response: IComponentResponse = await updateAgent(record.id, record, { repo });
    expect(response.error).toBeNull();
    const data = response.data as unknown as IAgent;
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('name');
    expect(data).toHaveProperty('createdAt');
    expect(data).toHaveProperty('updatedAt');
    expect(data.name).toBe(record.name);
  });
  it('non existing ID must return an error', async () => {
    expect.hasAssertions();
    {
      const { error, data }: IComponentResponse = await updateAgent(UUID.create().toString(), record, { repo });
      expect(data).toBe('');
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('Not Found');
    }
  });
});
