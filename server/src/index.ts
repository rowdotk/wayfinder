import { DBServices } from './services/dbServices';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { RouteControllers } from './controllers/routeControllers';
import { RouteServices } from './services/routeServices';
import millenniumFalcon from './constants/millennium-falcon.json';

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
    // hardcoded spaceship as per instructions, but changeable if needed (and move into routeServices)
    const spaceship = millenniumFalcon;

    const validatedQuery = await routeControllers.getFastestRouteController(req);
    const result = await routeServices.getFastestRoute(spaceship.departure, validatedQuery.arrival, spaceship);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
