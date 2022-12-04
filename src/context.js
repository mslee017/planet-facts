import React, { useState, useContext } from 'react';
import data from './data.json';

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  // STATE VALUES
  const [planets, setPlanets] = useState(data);
  const [currentPlanet, setCurrentPlanet] = useState('Mercury');
  const [planetData, setPlanetData] = useState({});

  // COLORS FOR BUTTONS
  const COLORS = [
    { name: 'Mercury', color: '#419EBB' },
    { name: 'Venus', color: '#EDA249' },
    { name: 'Earth', color: '#6F2ED6' },
    { name: 'Mars', color: '#D14C32' },
    { name: 'Jupiter', color: '#D83A34' },
    { name: 'Saturn', color: '#CD5120' },
    { name: 'Uranus', color: '#1EC2A4' },
    { name: 'Neptune', color: '#2D68F0' },
  ];

  // Function to display proper Grid Information when Planet is selected
  function displayPlanetInfo() {
    planets.filter(planet => {
      const {
        name,
        rotation,
        revolution,
        radius,
        temperature,
        overview: { content: overviewContent, source: overviewSource },
        structure: { content: structureContent, source: structureSource },
        geology: { content: geologyContent, source: geologySource },
        images: { planet: planetImage, internal, geology },
      } = planet;

      if (name === currentPlanet) {
        setPlanetData({
          name,
          rotation,
          revolution,
          radius,
          temperature,
          overviewContent,
          structureContent,
          geologyContent,
          overviewSource,
          structureSource,
          geologySource,
          planetImage,
          internal,
          geology,
        });
      }
    });
  }

  return (
    <AppContext.Provider
      value={{
        planets,
        setPlanets,
        currentPlanet,
        setCurrentPlanet,
        displayPlanetInfo,
        planetData,
        setPlanetData,
        COLORS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
