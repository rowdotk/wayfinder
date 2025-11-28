export type GetFastestRouteResponse = { route: string[]; duration: number };

export default interface SearchServicesInterface {
  getRoute: (destination: string) => Promise<GetFastestRouteResponse>;
}
