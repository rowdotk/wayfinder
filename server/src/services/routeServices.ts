import {
  GetFastestRouteResponse,
  PlannedRoute,
  Route,
  RouteServicesInterface,
  Spaceship,
} from '../types/routeServicesInterface';
import { DBServices } from './dbServices';
import { toTitleCase } from '../helpers/stringFormatting';

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
    spaceship: Spaceship,
    routes: Route[],
    plannedRoute?: PlannedRoute,
    fastestRoute?: PlannedRoute
  ): PlannedRoute | undefined => {
    try {
      if (!plannedRoute) {
        plannedRoute = { route: [origin], duration: 0, remainingFuelDays: spaceship.autonomy };
      }

      const currentLocation = plannedRoute.route.at(-1);
      if (!currentLocation) {
        throw new Error('Current location not found.');
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
          newPlannedRoute.remainingFuelDays = spaceship.autonomy;
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
          spaceship,
          copiedRoutes,
          newPlannedRoute,
          fastestRoute
        );
      }
      return fastestRoute;
    } catch (error) {
      console.error(`routeServices::planRoute::error ${error}`);
      throw new Error(`${error}`);
    }
  };

  public getFastestRoute = async (
    origin: string,
    destination: string,
    spaceship: Spaceship
  ): Promise<GetFastestRouteResponse> => {
    try {
      const formattedOrigin = toTitleCase(origin);
      const formattedDestination = toTitleCase(destination);

      if (formattedOrigin === formattedDestination) {
        throw new Error(`Already here, you are.`);
      }

      const db = await this.dbServices.openDB(spaceship.routes_db);
      const routes = await db.all('SELECT * FROM routes');

      const result = this.planRoute(
        formattedOrigin,
        formattedDestination,
        spaceship,
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
        throw new Error(`Between ${formattedOrigin} and ${formattedDestination}, a way exists not.`);
      }

      return { route: result.route, duration: result.duration };
    } catch (error) {
      console.error(`routeServices::getFastestRoute::error ${error}`);
      throw new Error(`${error}`);
    }
  };
}
