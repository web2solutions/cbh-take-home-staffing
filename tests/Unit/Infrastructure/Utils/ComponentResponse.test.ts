import { ComponentResponse, IComponentResponse } from '@src/Infrastructure/Utils';

describe('infrastructure - DTO / ComponentResponse', () => {
  it('component API', () => {
    expect.hasAssertions();
    const response: IComponentResponse = new ComponentResponse({ error: null, data: '' });
    expect(response).toHaveProperty('error');
    expect(response).toHaveProperty('data');
    expect(response.error).toBeNull();
    expect(response.data).toBe('');
  });
  it('check constructor', () => {
    expect.hasAssertions();
    const response: IComponentResponse = new ComponentResponse({ data: { foo: 'bar' }, error: new Error('baz') });
    expect(response).toHaveProperty('error');
    expect(response).toHaveProperty('data');
    expect(response.error).toBeInstanceOf(Error);
    expect(response.data).toHaveProperty('foo');
  });
  it('check constructor - no params', () => {
    expect.hasAssertions();
    const response: IComponentResponse = new ComponentResponse();
    expect(response).toHaveProperty('error');
    expect(response).toHaveProperty('data');
    expect(response.error).toBeNull();
    expect(response.data).toBe('');
  });
});
