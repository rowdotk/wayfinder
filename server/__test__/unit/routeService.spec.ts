import { describe, it, expect, beforeAll, afterEach, vi } from 'vitest';
import { DBServices } from '../../src/services/dbServices';
import { RouteServices } from '../../src/services/routeServices';

const MOCK_SPACESHIP = {
  autonomy: 6,
  departure: 'Tatooine',
  routes_db: 'universe.db',
};

const MOCK_ROUTES = [
  { origin: 'Tatooine', destination: 'Dagobah', travel_time: 6 },
  { origin: 'Dagobah', destination: 'Endor', travel_time: 4 },
  { origin: 'Dagobah', destination: 'Hoth', travel_time: 1 },
  { origin: 'Hoth', destination: 'Endor', travel_time: 1 },
  { origin: 'Tatooine', destination: 'Hoth', travel_time: 6 },
  { origin: 'Tatooine', destination: 'Bespin', travel_time: 2 },
  { origin: 'Bespin', destination: 'Coruscant', travel_time: 5 },
];

describe('routeService', () => {
  let mockDbServices: DBServices, mockRouteServices: RouteServices;

  beforeAll(async () => {
    mockDbServices = new DBServices();
    mockRouteServices = new RouteServices(mockDbServices);
    vi.spyOn(mockDbServices, 'queryDB').mockResolvedValue(MOCK_ROUTES);
  });

  afterEach(async () => {
    vi.clearAllMocks();
  });

  it('Should correctly compute the fastest route', async () => {
    const response = await mockRouteServices.getFastestRoute('Tatooine', 'Endor', MOCK_SPACESHIP);
    expect(response).toMatchObject({
      route: ['Tatooine', 'Hoth', 'Endor'],
      duration: 8,
    });
  });

  it('Should return direct route if it exists and is shortest', async () => {
    vi.spyOn(mockDbServices, 'queryDB').mockResolvedValue([
      ...MOCK_ROUTES,
      { origin: 'Tatooine', destination: 'Endor', travel_time: 2 },
    ]);
    const response = await mockRouteServices.getFastestRoute('Tatooine', 'Endor', MOCK_SPACESHIP);
    expect(response).toMatchObject({
      route: ['Tatooine', 'Endor'],
      duration: 2,
    });
  });

  it('Should return the fastest route even if it is not the one with the least stops', async () => {
    vi.spyOn(mockDbServices, 'queryDB').mockResolvedValue([
      ...MOCK_ROUTES,
      { origin: 'Tatooine', destination: 'Endor', travel_time: 10 },
    ]);
    const response = await mockRouteServices.getFastestRoute('Tatooine', 'Endor', MOCK_SPACESHIP);
    expect(response).toMatchObject({
      route: ['Tatooine', 'Hoth', 'Endor'],
      duration: 8,
    });
  });

  it('Should throw an error if no route is found', async () => {
    await expect(mockRouteServices.getFastestRoute('Tatooine', 'Naboo', MOCK_SPACESHIP)).rejects.toThrow(
      'Between Tatooine and Naboo, a way exists not.'
    );
  });

  it('Should throw an error if the origin and destination are the same', async () => {
    await expect(mockRouteServices.getFastestRoute('Tatooine', 'Tatooine', MOCK_SPACESHIP)).rejects.toThrow(
      'Already here, you are.'
    );
  });
});
