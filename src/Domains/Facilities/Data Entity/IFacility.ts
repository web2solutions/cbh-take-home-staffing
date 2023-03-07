export interface IFacility {
  id: string;
  name: string;
  serialize(): Record<string, unknown>;
}
