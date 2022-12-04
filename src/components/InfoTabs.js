import React, { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from '@mui/material';
import linkArrow from '../assets/filled-arrow.png';
import { useGlobalContext } from '../context';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography
            sx={{
              fontSize: { xs: '12px', md: '16px' },
              fontWeight: 400,
              opacity: 0.5,
              color: '#FFFFFF',
              lineHeight: '22px',
              fontFamily: 'Spartan',
            }}
          >
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const InfoTabs = () => {
  const [value, setValue] = React.useState(0);
  const [activeColor, setActiveColor] = useState('');

  // Context State
  const {
    currentPlanet,
    displayPlanetInfo,
    planetData,
    COLORS,
  } = useGlobalContext();

  // Function to render correct Wikipedia link inside each Planet
  const renderLink = value => {
    if (value === 0) {
      return planetData.overviewSource;
    } else if (value === 1) {
      return planetData.structureSource;
    } else {
      return planetData.geologySource;
    }
  };

  const renderImage = value => {
    if (value === 0 || value === 2) {
      return planetData.planetImage;
    } else if (value === 1) {
      return planetData.internal;
    }
  };

  const tabBackgroundColor = () => {
    COLORS.filter(planet => {
      const { name, color } = planet;
      if (name === currentPlanet) {
        setActiveColor(color);
      }
    });
  };

  useEffect(() => {
    displayPlanetInfo();
    tabBackgroundColor();
  }, [currentPlanet]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Styling Variables
  const mediumViewport = useMediaQuery('(min-width:900px)');

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        flexWrap: { xs: 'nowrap', md: 'wrap' },
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          minWidth: { md: '100%', lg: '50%' },
          justifyContent: 'center',
          alignItems: 'center',
          order: { xs: 1, md: 1 },
        }}
      >
        <img
          src={renderImage(value)}
          alt="Planet Image"
          className="planet--image"
        />
        {value === 2 ? (
          <img
            src={planetData.geology}
            alt="Planet Geology Marker"
            className="planet--image-geology"
          />
        ) : null}
      </Box>

      <Box
        sx={{
          width: { md: '50%' },
          justifySelf: { md: 'flex-end' },
          order: { xs: -1, md: 2 },
          marginLeft: { lg: 'auto' },
          marginBottom: { lg: '100px' },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          orientation={mediumViewport ? 'vertical' : 'horizontal'}
          sx={{
            borderColor: '#FFFFFF',
            color: '#FFFFFF !important',
            borderBottom: {
              xs: '1px solid rgba(255, 255, 255, 0.5)',
              md: 'none',
            },
            '& .MuiTabs-indicator': {
              display: { md: 'none' },
              height: 5,
              backgroundColor: `${activeColor}`,
            },
          }}
        >
          <Tab
            label="Overview"
            {...a11yProps(0)}
            sx={{
              border: { md: '1px solid rgba(255, 255, 255, 0.5)' },
              fontWeight: 600,
              margin: { md: '15px 24px' },
              '&:hover': {
                backgroundColor: '#38384f',
              },
              '&.Mui-selected': {
                backgroundColor: { md: `${activeColor}` },
              },
            }}
          />
          <Tab
            label="Structure"
            {...a11yProps(1)}
            sx={{
              border: { md: '1px solid rgba(255, 255, 255, 0.5)' },
              margin: { md: '15px 24px' },
              fontWeight: 600,
              '&:hover': {
                backgroundColor: '#38384f',
              },
              '&.Mui-selected': {
                backgroundColor: { md: `${activeColor}` },
              },
            }}
          />
          <Tab
            label="Surface"
            {...a11yProps(2)}
            sx={{
              border: { md: '1px solid rgba(255, 255, 255, 0.5)' },

              margin: { md: '15px 24px' },
              fontWeight: 600,
              color: { activeColor },
              '&:hover': {
                backgroundColor: '#38384f',
              },
              '&.Mui-selected': {
                backgroundColor: { md: `${activeColor}` },
              },
            }}
          />
        </Tabs>
      </Box>

      <Box
        sx={{
          order: { xs: 1 },
          width: { md: '50%' },
          pt: { lg: '100px' },
          pb: '0px',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '40px', md: '48px', lg: '80px' },
            textTransform: 'uppercase',
            textAlign: { xs: 'center', md: 'left' },
            pl: '24px',
          }}
        >
          {planetData.name}
        </Typography>
        <TabPanel value={value} index={0}>
          {planetData.overviewContent}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {planetData.structureContent}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {planetData.geologyContent}
        </TabPanel>

        <Typography
          sx={{
            pt: '10px',
            fontSize: '13px',
            opacity: 0.5,
            color: '#FFFFFF',
            pl: '24px',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          Source:{' '}
          <Link
            href={renderLink(value)}
            target="_blank"
            sx={{ fontSize: '15px' }}
          >
            Wikipedia <img src={linkArrow} alt="" />
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default InfoTabs;
