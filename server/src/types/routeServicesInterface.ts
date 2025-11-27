export type Route = { id: number; origin: string; destination: string; travel_time: number; isChecked?: boolean };

export type GetFastestRouteRequest = { arrival: string };

export type GetFastestRouteResponse = { route: string[]; duration: number };

export type PlannedRoute = GetFastestRouteResponse & { remainingFuelDays: number };

export type SpaceShip = { autonomy: number; departure: string; routes_db: string };

export interface RouteServicesInterface {
  getFastestRoute: (origin: string, destination: string, spaceShip: SpaceShip) => Promise<GetFastestRouteResponse>;
}
