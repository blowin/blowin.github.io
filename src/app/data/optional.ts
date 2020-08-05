export class Optional<T> {
  HasValue: boolean;
  Value: T;

  private constructor(hasValue: boolean, value: T) {
    this.HasValue = hasValue;
    this.Value = value;
  }

  public static None<T>(): Optional<T> {
    return new Optional<T>(false, null);
  }

  public static Some<T>(value: T): Optional<T> {
    return new Optional<T>(true, value);
  }
}

