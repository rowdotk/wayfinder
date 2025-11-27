import { Box, Typography } from '@mui/material';
import SearchCard from './components/SearchCard';

function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
      gap={2}
    >
      <Typography
        variant="h1"
        sx={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 'bold', color: 'white', textAlign: 'center', mb: 1 }}
      >
        WAYFINDER
      </Typography>
      <SearchCard />
    </Box>
  );
}

export default App;
