import { Alert, Box, Card, CardContent, Typography } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import RouteStepper from './RouteStepper';
import '../styles/Card.css';
import type { GetFastestRouteResponse } from '../types/routeServicesInterface';

interface ResultCardProps {
  result: GetFastestRouteResponse;
}

export default function ResultCard(props: ResultCardProps) {
  const { result } = props;

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
