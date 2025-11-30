export type Route = { id: number; origin: string; destination: string; travel_time: number; isChecked?: boolean };

export type GetFastestRouteRequest = { spaceship: string; arrival: string };

export type GetFastestRouteResponse = { route: string[]; duration: number };

export type PlannedRoute = GetFastestRouteResponse & { remainingFuelDays: number };

export type Spaceship = { autonomy: number; departure: string; routes_db: string };

export interface RouteServicesInterface {
  getFastestRoute: (spaceship: string, destination: string) => Promise<GetFastestRouteResponse>;
}
