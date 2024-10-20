export class NullInjectableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NullInjectableError";
  }
}