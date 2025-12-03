/**
 * Result type for handling success/failure in a type-safe way
 * Inspired by functional programming patterns
 */

export class Result<T, E = Error> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value?: T,
    private readonly _error?: E
  ) {}

  static ok<T>(value: T): Result<T> {
    return new Result<T>(true, value, undefined);
  }

  static fail<E = Error>(error: E): Result<never, E> {
    return new Result<never, E>(false, undefined, error);
  }

  get isSuccess(): boolean {
    return this._isSuccess;
  }

  get isFailure(): boolean {
    return !this._isSuccess;
  }

  getValue(): T {
    if (!this._isSuccess) {
      throw new Error('Cannot get value from a failed result');
    }
    return this._value!;
  }

  getError(): E {
    if (this._isSuccess) {
      throw new Error('Cannot get error from a successful result');
    }
    return this._error!;
  }

  /**
   * Map the value if successful
   */
  map<U>(fn: (value: T) => U): Result<U, E> {
    if (this.isSuccess) {
      return Result.ok(fn(this.getValue())) as Result<U, E>;
    }
    return Result.fail(this.getError());
  }

  /**
   * Chain operations that return Results
   */
  flatMap<U>(fn: (value: T) => Result<U, E>): Result<U, E> {
    if (this.isSuccess) {
      return fn(this.getValue());
    }
    return Result.fail(this.getError());
  }

  /**
   * Get value or default
   */
  getOrElse(defaultValue: T): T {
    return this.isSuccess ? this.getValue() : defaultValue;
  }

  /**
   * Match on success/failure
   */
  match<U>(patterns: { onSuccess: (value: T) => U; onFailure: (error: E) => U }): U {
    return this.isSuccess
      ? patterns.onSuccess(this.getValue())
      : patterns.onFailure(this.getError());
  }
}

/**
 * Async version of Result
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;
