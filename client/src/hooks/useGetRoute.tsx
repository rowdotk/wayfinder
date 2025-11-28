import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import RouteServices from '../services/routeServices';
import type { GetFastestRouteResponse } from '../types/searchServicesInterface';

export default function useGetRoute(
  destination: string,
  onSuccessCallback: (result: GetFastestRouteResponse) => void,
  onErrorCallback: (error: any) => void
) {
  const routeServices = new RouteServices();

  const query = useQuery({
    queryKey: ['getRoute', destination],
    queryFn: () => routeServices.getRoute(destination),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      onSuccessCallback(query.data);
    }
  }, [query.data, onSuccessCallback]);

  useEffect(() => {
    if (query.error) {
      onErrorCallback(query.error);
    }
  }, [query.error, onErrorCallback]);

  return query;
}
