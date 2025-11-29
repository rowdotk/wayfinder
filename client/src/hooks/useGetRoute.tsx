import { useMutation } from '@tanstack/react-query';
import RouteServices from '../services/routeServices';
import { GetFastestRouteResponse } from '../types/routeServicesInterface';

export default function useGetRoute(
  destination: string,
  onSuccessCallback: (result: GetFastestRouteResponse) => void,
  onErrorCallback: (error: any) => void
) {
  const routeServices = new RouteServices();

  return useMutation({
    mutationFn: () => routeServices.getRoute(destination),
    onSuccess: (data) => onSuccessCallback(data),
    onError: (error) => onErrorCallback(error),
  });
}
