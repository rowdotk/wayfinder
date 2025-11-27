import {
  GetFastestRouteResponse,
  PlannedRoute,
  Route,
  RouteServicesInterface,
  SpaceShip,
} from '../types/routeServicesInterface';
import { DBServices } from './dbServices';

export class RouteServices implements RouteServicesInterface {
  private dbServices: DBServices;

  constructor(dbServices: DBServices) {
    this.dbServices = dbServices;
  }

  private shouldAbandonRoute = (route: PlannedRoute, fastestRoute: PlannedRoute | undefined): boolean => {
    if (!fastestRoute) {
      return false;
    }
    if (route.duration > fastestRoute.duration) {
      return true;
    }
    if (route.duration === fastestRoute.duration) {
      return route.route.length >= fastestRoute.route.length;
    }
    return false;
  };

  private planRoute = (
    origin: string,
    destination: string,
    spaceShip: SpaceShip,
    routes: Route[],
    plannedRoute?: PlannedRoute,
    fastestRoute?: PlannedRoute
  ): PlannedRoute | undefined => {
    if (!plannedRoute) {
      plannedRoute = { route: [origin], duration: 0, remainingFuelDays: spaceShip.autonomy };
    }

    const currentLocation = plannedRoute.route.at(-1);
    if (!currentLocation) {
      throw new Error('Current location not found');
    }

    // find all routes that passes through currentLocation, sort by travel_time to minimize loop count (since we implemented shouldAbandonRoute())
    const connectingRoutes = routes
      .filter((route) => {
        return (
          !route.isChecked &&
          ([currentLocation].includes(route.origin) || [currentLocation].includes(route.destination))
        );
      })
      .sort((a, b) => a.travel_time - b.travel_time);

    // if we run into a dead end, we move on to the next route
    if (connectingRoutes.length === 0) {
      return;
    }

    for (const connectingRoute of connectingRoutes) {
      const copiedRoutes = structuredClone(routes);
      const newPlannedRoute = { ...plannedRoute };

      // check if we have enough fuel to reach the destination
      if (newPlannedRoute.remainingFuelDays < connectingRoute.travel_time) {
        newPlannedRoute.duration += 1;
        newPlannedRoute.remainingFuelDays = spaceShip.autonomy;
      }

      // add the connecting route to the planned route
      newPlannedRoute.route = [
        ...newPlannedRoute.route,
        connectingRoute.origin === currentLocation ? connectingRoute.destination : connectingRoute.origin,
      ];
      newPlannedRoute.duration += connectingRoute.travel_time;
      newPlannedRoute.remainingFuelDays -= connectingRoute.travel_time;

      // mark the connecting route as checked
      const checkedRoute = copiedRoutes.find((route) => route.id === connectingRoute.id);
      if (!checkedRoute) {
        throw new Error(`Route ${connectingRoute.id} not found`);
      }
      checkedRoute.isChecked = true;

      // abandon route if it is less efficient than fastestRoute
      if (this.shouldAbandonRoute(newPlannedRoute, fastestRoute)) {
        continue;
      }

      // check if arrived
      if (newPlannedRoute.route.at(-1) === destination) {
        fastestRoute = newPlannedRoute;
        continue;
      }

      // if haven't arrived, nor abandoned, continue searching
      fastestRoute = this.planRoute(
        currentLocation,
        destination,
        spaceShip,
        copiedRoutes,
        newPlannedRoute,
        fastestRoute
      );
    }
    return fastestRoute;
  };

  public getFastestRoute = async (
    origin: string,
    destination: string,
    spaceShip: SpaceShip
  ): Promise<GetFastestRouteResponse> => {
    const db = await this.dbServices.openDB(spaceShip.routes_db);
    const routes = await db.all('SELECT * FROM routes');

    const result = this.planRoute(
      origin,
      destination,
      spaceShip,
      routes.map((route, index) => {
        return {
          id: index + 1,
          origin: route.origin,
          destination: route.destination,
          travel_time: route.travel_time,
        };
      })
    );

    if (!result) {
      throw new Error(`No route was found from ${origin} to ${destination}`);
    }

    return { route: result.route, duration: result.duration };
  };
}
