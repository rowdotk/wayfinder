import { Card, CardContent, Box, TextField, Button } from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchCard() {
  return (
    <Card
      sx={{
        width: '30vw',
        height: '50vh',
        borderRadius: '50px',
        opacity: 0.7,
        display: 'flex',
        flexDirection: 'column',
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
          <TextField label="Origin" variant="outlined" fullWidth />
          <SouthIcon sx={{ color: 'gray' }} />
          <TextField label="Destination" variant="outlined" fullWidth />
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
