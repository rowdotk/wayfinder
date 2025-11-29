import axios from 'axios';
import RouteServicesInterface from '../types/routeServicesInterface';
export default class RouteServices implements RouteServicesInterface {
  constructor() {}

  getRoute = async (destination: string) => {
    const response = await axios.get(`http://localhost:8000/compute`, {
      method: 'GET',
      params: { arrival: destination },
    });
    return response.data;
  };
}
