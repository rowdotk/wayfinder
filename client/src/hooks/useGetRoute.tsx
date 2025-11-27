import { useQuery, type UseQueryResult } from 'react-query';
import RouteServices from '../services/routeServices';
import type { GetFastestRouteResponse } from '../types/searchServicesInterface';

export default function useGetRoute(
  origin: string,
  destination: string
): UseQueryResult<GetFastestRouteResponse, Error> {
  const routeServices = new RouteServices();
  return useQuery(['getRoute', origin, destination], () => routeServices.getRoute(origin, destination), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
