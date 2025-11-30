export type GetFastestRouteResponse = { route: string[]; duration: number };

export default interface RouteServicesInterface {
  getRoute: (spaceship: string, destination: string) => Promise<GetFastestRouteResponse>;
}
