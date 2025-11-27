import type SearchServicesInterface from '../types/searchServicesInterface';
import axios from 'axios';

export default class SearchServices implements SearchServicesInterface {
  constructor() {}

  getRoute = async (origin: string, destination: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/compute`, {
      method: 'GET',
      params: { origin, destination },
    });
    return response.data;
  };
}
