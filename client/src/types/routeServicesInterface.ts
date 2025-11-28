export type GetFastestRouteResponse = { route: string[]; duration: number };

export default interface RouteServicesInterface {
  getRoute: (destination: string) => Promise<GetFastestRouteResponse>;
}
