export class NextJSRouteTypesError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NextJSRouteTypesError";
  }
}
