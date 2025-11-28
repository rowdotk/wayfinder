import type SearchServicesInterface from '../types/searchServicesInterface';
import axios from 'axios';

export default class SearchServices implements SearchServicesInterface {
  constructor() {}

  getRoute = async (destination: string) => {
    const response = await axios.get(`http://localhost:8000/compute`, {
      method: 'GET',
      params: { arrival: destination },
    });
    return response.data;
  };
}
