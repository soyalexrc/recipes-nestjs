export interface GenericResult<T> {
  data: T;
  error: Error | null;
  message?: string;
}

export interface Error {}
