export interface IWrite<T> {
  create(item: T): boolean;
  update(id: string, item: T): boolean;
  delete(id: string): boolean;
}
