
export class Result<T> {
  private constructor(public readonly ok: boolean, public readonly value?: T, public readonly error?: Error) {}
  static success<T>(v: T) { return new Result<T>(true, v); }
  static failure<T>(err: Error) { return new Result<T>(false, undefined, err); }
}
