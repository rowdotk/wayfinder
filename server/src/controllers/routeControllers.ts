import { Request } from 'express';
import { GetFastestRouteRequest } from '../types/routeServicesInterface';
import Joi, { ObjectSchema } from 'joi';

export class RouteControllers {
  constructor() {}

  private getFastestRouteSchema: ObjectSchema<GetFastestRouteRequest> = Joi.object<GetFastestRouteRequest>({
    // hardcoded spaceship as per instructions the endpoint only accepts one parameter which is arrival
    spaceship: Joi.string().optional().default('millennium-falcon'),
    arrival: Joi.string().required(),
  });

  public getFastestRouteController = async ({ query }: Request): Promise<GetFastestRouteRequest> => {
    return this.getFastestRouteSchema.validateAsync(query);
  };
}
