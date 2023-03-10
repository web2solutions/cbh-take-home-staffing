export interface IComponentResponse {
  error: Error | null;
  data: string | Record<string, unknown>;
}
