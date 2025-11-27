export type GetFastestRouteResponse = { route: string[]; duration: number };

export default interface SearchServicesInterface {
  getRoute: (origin: string, destination: string) => Promise<GetFastestRouteResponse>;
}
