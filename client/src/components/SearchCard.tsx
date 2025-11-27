import { Card, CardContent, Box, TextField, Button } from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import '../styles/Card.css';

export default function SearchCard() {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  return (
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
          <TextField
            label="Origin"
            variant="outlined"
            fullWidth
            onChange={(e) => setOrigin(e.target.value)}
            value={origin}
          />
          <SouthIcon sx={{ color: 'gray' }} />
          <TextField
            label="Destination"
            variant="outlined"
            fullWidth
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
          />
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontFamily: 'Orbitron, sans-serif',
            fontWeight: 'bold',
            textAlign: 'center',
            width: '80%',
            height: '10%',
          }}
        >
          <SearchIcon sx={{ mr: 1 }} />
          Find the way, you will
        </Button>
      </CardContent>
    </Card>
  );
}
