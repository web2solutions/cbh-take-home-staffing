export interface IAgent {
  id: string;
  name: string;
  serialize(): Record<string, unknown>;
}
