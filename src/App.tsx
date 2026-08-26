import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Dashboard } from './components/Dashboard';

function App() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ gap: 1.5 }}>
            <Avatar
              variant="rounded"
              sx={{
                width: 44,
                height: 44,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2563eb, #1e40af)',
              }}
            >
              FW
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h1" component="h1" sx={{ lineHeight: 1.2 }}>
                FactWise
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Employee Directory
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {today}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 3 }}>
        <Dashboard />
      </Container>
    </Box>
  );
}

export default App;
