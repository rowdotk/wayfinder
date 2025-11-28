import {
  Alert,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Autocomplete,
  Snackbar,
  Typography,
  Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import '../styles/Card.css';
import useGetRoute from '../hooks/useGetRoute';
import type { GetFastestRouteResponse } from '../types/searchServicesInterface';

interface SearchCardProps {
  setResult: (result: GetFastestRouteResponse | null) => void;
}

export default function SearchCard(props: SearchCardProps) {
  const { setResult } = props;
  const [destination, setDestination] = useState<string>('');
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const { isFetching, refetch } = useGetRoute(destination, setResult, (error: any) => {
    setResult(null);
    setSnackbarMessage(error.response?.data?.error || 'An unknown error occurred');
  });

  const handleClick = () => {
    if (origin && destination) {
      setSnackbarMessage('');
      refetch();
    }
  };

  useEffect(() => {
    if (!destination) {
      setResult(null);
    }
  }, [destination, setResult, setSnackbarMessage]);

  return (
    <>
      <Card
        className="card"
        sx={{
          height: '400px',
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: 5,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '80%',
              gap: 2,
            }}
          >
            <Box
              sx={{
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                SPACESHIP
              </Typography>
              <Tooltip title="Only Millennium Falcon is available">
                <Autocomplete
                  fullWidth
                  disabled
                  options={[]}
                  value="Millennium Falcon"
                  renderInput={(params) => <TextField {...params} placeholder="Select spaceship" variant="outlined" />}
                />
              </Tooltip>
            </Box>
            <Box
              sx={{
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <Typography variant="body1" fontWeight="bold">
                DESTINATION
              </Typography>
              <TextField
                placeholder="Enter destination"
                variant="outlined"
                onChange={(e) => setDestination(e.target.value)}
                value={destination}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleClick();
                  }
                }}
                fullWidth
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClick}
            disabled={!origin || !destination || isFetching}
            sx={{
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 'bold',
              textAlign: 'center',
              width: '80%',
              height: '10%',
            }}
          >
            <SearchIcon sx={{ mr: 1 }} />
            {isFetching ? 'Found soon, it will be…' : 'Find the way, you will'}
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        open={!!snackbarMessage}
        onClose={() => setSnackbarMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
