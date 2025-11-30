import {
  GetFastestRouteResponse,
  PlannedRoute,
  Route,
  RouteServicesInterface,
  Spaceship,
} from '../types/routeServicesInterface';
import { DBServices } from './dbServices';
import { toTitleCase } from '../helpers/stringFormatting';
import millenniumFalcon from '../constants/millennium-falcon.json';

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
      // initialize plannedRoute
      if (!plannedRoute) {
        plannedRoute = { route: [origin], duration: 0, remainingFuelDays: spaceship.autonomy };
      }

      const currentLocation = plannedRoute.route.at(-1);
      if (!currentLocation) {
        throw new Error('Current location not found.');
      }

      // find all routes that passes through currentLocation, sort by travel_time to reduce unnecessary iteration (with shouldAbandonRoute())
      const connectingRoutes = routes
        .filter((route) => {
          return (
            !route.isChecked &&
            ([currentLocation].includes(route.origin) || [currentLocation].includes(route.destination))
          );
        })
        .sort((a, b) => a.travel_time - b.travel_time);

      // if we reach a dead end, exit this loop and continue with the next route option
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

        // check if we have arrived at the destination
        if (newPlannedRoute.route.at(-1) === destination) {
          fastestRoute = newPlannedRoute;
          continue;
        }

        // if we haven't arrived at the destination, nor abandoned the route, continue searching
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

  public getFastestRoute = async (spaceship: string, destination: string): Promise<GetFastestRouteResponse> => {
    try {
      // hardcoded spaceship as per instructions the endpoint only accepts one parameter which is arrival
      const spaceshipAttributes: Spaceship = millenniumFalcon;

      const formattedOrigin = toTitleCase(spaceshipAttributes.departure);
      const formattedDestination = toTitleCase(destination);

      if (formattedOrigin === formattedDestination) {
        throw new Error(`Already here, you are.`);
      }

      const routes = await this.dbServices.queryDB(spaceshipAttributes.routes_db, 'SELECT * FROM routes');

      const result = this.planRoute(
        formattedOrigin,
        formattedDestination,
        spaceshipAttributes,
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
