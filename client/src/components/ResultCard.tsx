import { Alert, Box, Card, CardContent, Typography } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import RouteStepper from './RouteStepper';
import '../styles/Card.css';

export default function ResultCard() {
  const result = {
    route: ['Tatooine', 'Hoth', 'Endor', 'Coruscant', 'Naboo', 'Bespin', 'Endor'],
    duration: 8,
  };
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
