export type GetFastestRouteRequest = { arrival: string };

export type Route = { id: number; origin: string; destination: string; travel_time: number; isChecked?: boolean };

export type PlannedRoute = { route: string[]; duration: number; remainingFuelDays: number };

export type SpaceShip = { autonomy: number; departure: string; routes_db: string };

export interface RouteServicesInterface {
  checkIfReachable: (destination: string, routes: Route[]) => boolean;
  shouldAbandonRoute: (route: PlannedRoute, fastestRoute: PlannedRoute) => boolean;
  getFastestRoute: (
    origin: string,
    destination: string,
    spaceShip: SpaceShip,
    routes: Route[],
    plannedRoute?: PlannedRoute,
    fastestRoute?: PlannedRoute | undefined
  ) => PlannedRoute;
}
