import { PlannedRoute, Route, RouteServicesInterface, SpaceShip } from '../types';

export class RouteServices implements RouteServicesInterface {
  constructor(private readonly routes: Route[]) {}

  checkIfReachable = (destination: string, routes: Route[]): boolean => {
    return routes.some((route) => route.destination === destination);
  };

  shouldAbandonRoute = (route: PlannedRoute, fastestRoute: PlannedRoute | undefined): boolean => {
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

  getFastestRoute = (
    origin: string,
    destination: string,
    spaceShip: SpaceShip,
    routes: Route[],
    plannedRoute?: PlannedRoute,
    fastestRoute?: PlannedRoute
  ): PlannedRoute => {
    if (!this.checkIfReachable(destination, routes)) {
      throw new Error(`Destination ${destination} is not reachable`);
    }

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
      fastestRoute = this.getFastestRoute(
        currentLocation,
        destination,
        spaceShip,
        copiedRoutes,
        newPlannedRoute,
        fastestRoute
      );
    }
    if (!fastestRoute) {
      throw new Error('No route was found');
    }

    return fastestRoute;
  };
}
