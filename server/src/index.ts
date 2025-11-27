import express, { Request, Response } from 'express';
import { RouteControllers } from './controllers/routeControllers';
import { RouteServices } from './services/routeServices';
import millenniumFalcon from './constants/millennium-falcon.json';

const app = express();
app.use(express.json());
const port = 8000;

const routeServices = new RouteServices([]);
const routeControllers = new RouteControllers();

const routes = [
  { id: 1, origin: 'Tatooine', destination: 'Dagobah', travel_time: 6 },

  // { id: 2, origin: 'Tatooine', destination: 'Endor', travel_time: 5 },

  { id: 3, origin: 'Dagobah', destination: 'Endor', travel_time: 4 },

  { id: 4, origin: 'Dagobah', destination: 'Hoth', travel_time: 1 },

  { id: 5, origin: 'Hoth', destination: 'Endor', travel_time: 1 },

  { id: 6, origin: 'Tatooine', destination: 'Hoth', travel_time: 3 },

  { id: 8, origin: 'Tatooine', destination: 'Naboo', travel_time: 3 },

  { id: 7, origin: 'Naboo', destination: 'Endor', travel_time: 1 },
];

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

app.get('/', (_, res) => {
  res.send('The way, you have found.');
});

app.post('/compute', async (req: Request, res: Response) => {
  try {
    const validatedBody = await routeControllers.getFastestRouteController(req);
    const result = routeServices.getFastestRoute(
      millenniumFalcon.departure,
      validatedBody.arrival,
      millenniumFalcon,
      routes
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});
