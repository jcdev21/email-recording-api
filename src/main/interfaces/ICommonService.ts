export interface ICommonService {
  list(): Promise<unknown>;
  readById(id: string): Promise<unknown>;
  store(payload: never): Promise<unknown>;
}
