export enum operators {
  equal = 'equal',
}

export interface IFilter {
  atrributeName: string;
  operator: operators;
  value: unknown,
}

export interface ISearch {
  operator?: string;
  filters?: IFilter[];
}

export { UUID } from '@src/Infrastructure/Persistence/utils/UUID';
