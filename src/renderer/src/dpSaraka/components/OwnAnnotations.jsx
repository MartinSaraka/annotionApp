// OwnAnnotations.js
import React from 'react';
import { Box, Text } from '@renderer/ui';
import CancerCellsImage from '../Images/cells.png'; // Placeholder images
import MicroscopeImage from '../Images/microscope.png'; // Replace with your actual images

const OwnAnnotations = () => {
  const annotations = [
    {
      id: 1,
      title: 'Cancer Cells',
      description: 'Annotation training for my upcoming test',
      image: CancerCellsImage,
      createdDate: '29.04.2024',
    },
    {
      id: 2,
      title: 'Lesson 4',
      description: 'Annotation that we did at our lesson focused on veins',
      image: MicroscopeImage,
      createdDate: '01.05.2024',
    },
    {
      id: 3,
      title: 'Lesson 5',
      description: 'Annotation that we did at our lesson focused on cells',
      image: MicroscopeImage,
      createdDate: '11.08.2024',
    },
  ];

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: '1200px',
        gap: '20px',
        flexWrap: 'wrap', // Allow cards to wrap if needed
        margin: 'auto', // Center the content horizontally
        padding: '20px',
      }}
    >
      {annotations.map((annotation) => (
        <Box
          key={annotation.id}
          css={{
            width: '300px',
            height: '400px',
            backgroundColor: '#2B2B48',
            borderRadius: '12px',
            padding: '20px',
            textAlign: 'center',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            display: 'flex',
            marginBottom: '150px',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
              transform: 'translateY(-5px)',
            },
          }}
        >
          <Text
            css={{
              fontSize: '20px',
              fontWeight: 'bold',
              marginBottom: '10px',
              color: '#FFFFFF',
            }}
          >
            {annotation.title}
          </Text>
          <Box
            css={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={annotation.image}
              alt={annotation.title}
              style={{ width: '80px', height: '80px' }}
            />
          </Box>
          <Text css={{ fontSize: '14px', color: '#B0B0B0', marginBottom: '10px' }}>
            {annotation.description}
          </Text>
          <Text css={{ fontSize: '12px', color: '#B0B0B0' }}>
            Created: {annotation.createdDate}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default OwnAnnotations;
