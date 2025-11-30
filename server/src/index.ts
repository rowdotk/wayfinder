import { DBServices } from './services/dbServices';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { RouteControllers } from './controllers/routeControllers';
import { RouteServices } from './services/routeServices';

const app = express();
app.use(cors());
app.use(express.json());

const port = 8000;
const routeControllers = new RouteControllers();
const dbServices = new DBServices();
const routeServices = new RouteServices(dbServices);

app.get('/', (_, res) => {
  res.send('The way, you have found. 🪐');
});

app.get('/compute', async (req: Request, res: Response) => {
  try {
    const validatedQuery = await routeControllers.getFastestRouteController(req);
    const result = await routeServices.getFastestRoute(validatedQuery.spaceship, validatedQuery.arrival);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}, the app is. Ready, it shall be.`);
});
