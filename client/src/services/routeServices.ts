import axios from 'axios';
import RouteServicesInterface from '../types/routeServicesInterface';
export default class RouteServices implements RouteServicesInterface {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = 'http://localhost:8000';
  }

  getRoute = async (destination: string) => {
    const response = await axios.get(`${this.apiBaseUrl}/compute`, {
      method: 'GET',
      params: { arrival: destination },
    });
    return response.data;
  };
}
