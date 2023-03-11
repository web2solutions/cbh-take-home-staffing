/* eslint-disable no-underscore-dangle */
import { UUID } from '@src/Infrastructure/Persistence/utils';
import { BaseModel } from '@src/Infrastructure/Persistence/BaseModel';

class TestableBaseModel extends BaseModel {}

describe('infrastructure/Persistence BaseModel', () => {
  describe('component public API', () => {
    const model = new TestableBaseModel();
    it('check getters', () => {
      expect.hasAssertions();
      expect(model).toHaveProperty('id');
      expect(model).toHaveProperty('createdAt');
      expect(model).toHaveProperty('updatedAt');
      expect(model).toHaveProperty('baseSerialize');
      expect(model.createdAt).toBeInstanceOf(Date);
      expect(model.updatedAt).toBeInstanceOf(Date);
      expect(typeof model.id).toBe('string');
      const serialized = model.baseSerialize();
      expect(serialized).toHaveProperty('createdAt');
      expect(serialized).toHaveProperty('updatedAt');
    });
    it('check setters', () => {
      expect.hasAssertions();
      const newDate = new Date();
      model.updatedAt = newDate;
      expect(model.updatedAt).toBe(newDate);
      expect(model.updatedAt).toBeInstanceOf(Date);
    });
  });
  describe('testing the constructor', () => {
    it('testing constructor with no params', () => {
      expect.hasAssertions();
      const model = new TestableBaseModel();
      expect(model).toHaveProperty('id');
      expect(model).toHaveProperty('createdAt');
      expect(model).toHaveProperty('updatedAt');
      expect(model).toHaveProperty('baseSerialize');
      expect(model.createdAt).toBeInstanceOf(Date);
      expect(model.updatedAt).toBeInstanceOf(Date);
    });
    it('must throw if pass invalid id(UUID)', () => {
      expect.hasAssertions();
      expect(() => {
        // eslint-disable-next-line no-new
        new TestableBaseModel('invalid');
      }).toThrow('Invalid UUID');
    });
    it('valid ID must match', () => {
      expect.hasAssertions();
      const validID = UUID.create().toString();
      const model = new TestableBaseModel(validID);
      expect(model).toHaveProperty('id');
      expect(model).toHaveProperty('createdAt');
      expect(model).toHaveProperty('updatedAt');
      expect(model).toHaveProperty('baseSerialize');
      expect(model.createdAt).toBeInstanceOf(Date);
      expect(model.updatedAt).toBeInstanceOf(Date);

      expect(model.id).toBe(validID);
    });
  });
});
