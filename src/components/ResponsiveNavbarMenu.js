import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useGlobalContext } from '../context';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const drawerWidth = 240;
const navItems = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
];

function ResponsiveNavbarMenu(props) {
  // Importing Context
  const { setCurrentPlanet, COLORS } = useGlobalContext();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const setPlanetOnClick = item => {
    setCurrentPlanet(item);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{
                textAlign: 'left',
                backgroundColor: '#070724',
                color: '#FFFFFF',
                '&:hover': {
                  backgroundColor: '#38384f',
                },
              }}
              onClick={() => setPlanetOnClick(item)}
            >
              <CircleIcon sx={{ color: `${COLORS[index].color}` }} />
              <ListItemText primary={item} sx={{ pl: '15px' }} />
              <ArrowForwardIosIcon sx={{ color: '#38384f' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', marginBottom: '75px' }}>
      <AppBar component="nav">
        <Toolbar
          sx={{
            backgroundColor: '#070724',
            flexDirection: { md: 'column', lg: 'row' },
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            The Planets
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: { md: 'space-evenly', lg: 'flex-end' },
              gap: { md: '45px', lg: '45px' },
              flexGrow: 2,
              backgroundColor: '#070724',
            }}
          >
            {navItems.map(item => (
              <Button
                key={item}
                sx={{ color: '#fff' }}
                onClick={() => setPlanetOnClick(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              height: 'auto',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default ResponsiveNavbarMenu;
