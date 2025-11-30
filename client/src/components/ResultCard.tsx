import { Alert, Box, Card, CardContent, Divider, Typography } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import RouteStepper from './RouteStepper';
import '../styles/card.css';
import { GetFastestRouteResponse } from '../types/routeServicesInterface';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Spaceship } from '../constants/spaceships';

interface ResultCardProps {
  result: GetFastestRouteResponse;
  selectedSpaceship: Spaceship | null;
}

export default function ResultCard(props: ResultCardProps) {
  const { result, selectedSpaceship } = props;

  return (
    <Card className="card">
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 2,
            margin: 5,
          }}
        >
          <Box>
            <Typography variant="subtitle1">SPACESHIP</Typography>
            <Typography variant="h5" fontWeight="bold">
              {selectedSpaceship?.name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MyLocationIcon sx={{ color: 'gray' }} />
            <Typography variant="subtitle1">{result.route[0]}</Typography>
          </Box>
          <Divider sx={{ width: '100%' }} />
          <Alert severity="info" icon={<TodayIcon />} sx={{ width: '90%' }}>
            <Typography variant="inherit" sx={{ fontWeight: 'bold' }}>
              {result.duration} days
            </Typography>
          </Alert>
          <RouteStepper route={result.route} />
        </Box>
      </CardContent>
    </Card>
  );
}
