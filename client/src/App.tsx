import { Box, Typography } from '@mui/material';
import SearchCard from './components/SearchCard';
import ResultCard from './components/ResultCard';
import { useState } from 'react';
import type { GetFastestRouteResponse } from './types/routeServicesInterface';

function App() {
  const [result, setResult] = useState<GetFastestRouteResponse | null>(null);
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
      <SearchCard setResult={setResult} />
      {result && <ResultCard result={result} />}
    </Box>
  );
}

export default App;
