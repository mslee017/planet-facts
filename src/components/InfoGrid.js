import React, { useEffect } from 'react';
import { Container, Typography, Box, styled } from '@mui/material';
import { useGlobalContext } from '../context';
import { ImportantDevices } from '@mui/icons-material';

export const InfoGrid = () => {
  const { currentPlanet, displayPlanetInfo, planetData } = useGlobalContext();

  useEffect(() => {
    displayPlanetInfo();
  }, [currentPlanet]);

  const InfoTitle = styled(Typography)({
    fontSize: '11px',
    opacity: 0.5,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 0.73,
    lineHeight: '16px',
  });

  const InfoContent = styled(Typography)({
    fontSize: '20px',
    lineHeight: '26px',
    textAlign: 'right',
    letterSpacing: -0.75,
    textTransform: 'uppercase',
    fontFamily: 'Antonio',
  });

  const StyledContainer = styled(Container)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    border: '1px solid rgba(255,255,255, 0.2)',
    p: 2,
    margin: '10px',

    [theme.breakpoints.up('sm')]: {
      flexDirection: 'column',
    },
  }));

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <StyledContainer>
        <InfoTitle>Rotation Time</InfoTitle>
        <InfoContent>{planetData.rotation}</InfoContent>
      </StyledContainer>
      <StyledContainer>
        <InfoTitle>Revolution Time</InfoTitle>
        <InfoContent>{planetData.revolution}</InfoContent>
      </StyledContainer>
      <StyledContainer>
        <InfoTitle>Radius</InfoTitle>
        <InfoContent>{planetData.radius}</InfoContent>
      </StyledContainer>
      <StyledContainer>
        <InfoTitle>Average Temp.</InfoTitle>
        <InfoContent>{planetData.temperature}</InfoContent>
      </StyledContainer>
    </Box>
  );
};

export default InfoGrid;
