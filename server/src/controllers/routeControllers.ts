import { NextFunction, Request } from 'express';
import { GetFastestRouteRequest } from '../types/routeServicesInterface';
import Joi, { ObjectSchema } from 'joi';

export class RouteControllers {
  constructor() {}

  private getFastestRouteSchema: ObjectSchema<GetFastestRouteRequest> = Joi.object<GetFastestRouteRequest>({
    arrival: Joi.string().required(),
  });

  public getFastestRouteController = async ({ body }: Request): Promise<GetFastestRouteRequest> => {
    return this.getFastestRouteSchema.validateAsync(body);
  };
}
