import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import RouteServices from '../services/routeServices';

export default function useGetRoute(destination: string, onErrorCallback: (error: any) => void) {
  const routeServices = new RouteServices();

  const query = useQuery({
    queryKey: ['getRoute', destination],
    queryFn: () => routeServices.getRoute(destination),
    enabled: false,
    retry: false,
  });

  useEffect(() => {
    if (query.error) {
      onErrorCallback(query.error);
    }
  }, [query.error, onErrorCallback]);

  return query;
}
