export interface IRead<T> {
  findAll(): T[];
  find(item: T): T[];
  findOne(id: string): T;
}
