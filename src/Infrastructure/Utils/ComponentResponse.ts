import { IComponentResponse } from '@src/Infrastructure/Utils';

export class ComponentResponse implements IComponentResponse {
  public error: Error | null;
  public data: string | Record<string, unknown>;

  constructor(conf?: IComponentResponse) {
    const { error, data } = conf || { error: null, data: '' };
    this.data = data;
    this.error = error;
  }
}
