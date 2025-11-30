import { Box, Typography } from '@mui/material';
import SearchCard from './components/SearchCard';
import ResultCard from './components/ResultCard';
import { useState } from 'react';
import { GetFastestRouteResponse } from './types/routeServicesInterface';
import { Spaceship } from './constants/spaceships';

function App() {
  const [result, setResult] = useState<GetFastestRouteResponse | null>(null);
  // spaceship is actually not used except for the UI, since as per instruction the /compute endpoint does not accept a spaceship parameter
  const [selectedSpaceship, setSelectedSpaceship] = useState<Spaceship | null>(null);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5%',
      }}
      gap={5}
    >
      <Typography
        variant="h1"
        sx={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 'bold', color: 'white', textAlign: 'center', mb: 1 }}
      >
        WAYFINDER
      </Typography>
      <SearchCard
        setResult={setResult}
        selectedSpaceship={selectedSpaceship}
        setSelectedSpaceship={setSelectedSpaceship}
      />
      {result && <ResultCard result={result} selectedSpaceship={selectedSpaceship} />}
    </Box>
  );
}

export default App;
