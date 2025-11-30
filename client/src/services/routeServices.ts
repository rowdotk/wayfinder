import axios from 'axios';
import RouteServicesInterface from '../types/routeServicesInterface';
export default class RouteServices implements RouteServicesInterface {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = 'http://localhost:8000';
  }

  getRoute = async (spaceship: string, destination: string) => {
    const response = await axios.get(`${this.apiBaseUrl}/compute`, {
      method: 'GET',
      params: { spaceship, arrival: destination },
    });
    return response.data;
  };
}
