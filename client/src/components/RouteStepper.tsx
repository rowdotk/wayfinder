import { StepLabel, Step, Stepper } from '@mui/material';
import { GetFastestRouteResponse } from '../types/routeServicesInterface';

interface RouteStepperProps {
  route: GetFastestRouteResponse['route'];
}

export default function RouteStepper(props: RouteStepperProps) {
  const { route } = props;
  return (
    <Stepper orientation="vertical">
      {route.map((step) => (
        <Step key={step}>
          <StepLabel>{step}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
