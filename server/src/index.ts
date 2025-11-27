import { DBServices } from './services/dbServices';
import express, { Request, Response } from 'express';
import { RouteControllers } from './controllers/routeControllers';
import { RouteServices } from './services/routeServices';
import millenniumFalcon from './constants/millennium-falcon.json';

const app = express();
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
    // hardcoded spaceShip because of instructions, but changeable if needed
    const spaceShip = millenniumFalcon;

    const validatedBody = await routeControllers.getFastestRouteController(req);
    const result = await routeServices.getFastestRoute(spaceShip.departure, validatedBody.arrival, spaceShip);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
