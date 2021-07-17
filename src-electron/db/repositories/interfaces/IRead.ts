export interface IRead<T> {
  findAll(): T[];
  findOne(id: string): T;
}
