export interface IBaseUseCase<T> {
  execute(...args: any[]): Promise<T>;
}
