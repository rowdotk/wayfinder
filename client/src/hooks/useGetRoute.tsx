import { useMutation } from '@tanstack/react-query';
import { GetFastestRouteResponse } from '../types/routeServicesInterface';
import { routeServices } from '../index';

export default function useGetRoute(
  destination: string,
  onSuccessCallback: (result: GetFastestRouteResponse) => void,
  onErrorCallback: (error: any) => void
) {
  return useMutation({
    mutationFn: () => routeServices.getRoute(destination),
    onSuccess: (data) => onSuccessCallback(data),
    onError: (error) => onErrorCallback(error),
  });
}
