import { Box } from '@mui/material';
import React from 'react';
import InfoTabs from './InfoTabs';
import backgroundImg from '../assets/background-stars.svg';
import ResponsiveNavbarMenu from './ResponsiveNavbarMenu';
import InfoGrid from './InfoGrid';

const styles = {
  boxImage: {
    backgroundImage: `url(${backgroundImg})`,
    padding: '0px 24px',
  },
};

const Planet = () => {
  return (
    <Box style={styles.boxImage}>
      <ResponsiveNavbarMenu />
      <InfoTabs />
      <InfoGrid />
    </Box>
  );
};

export default Planet;
