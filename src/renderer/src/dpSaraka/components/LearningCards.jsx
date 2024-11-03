// LearningCards.js
import React, { useState } from 'react';
import { Box, Text } from '@renderer/ui';
import DiseaseImage1 from '../Images/choroba1.png'; // Placeholder images
import DiseaseImage2 from '../Images/choroba2.png'; // Replace with your actual images
import DiseaseImage3 from '../Images/choroba3.png'; // Placeholder images
import DiseaseImage4 from '../Images/choroba4.png'; // Replace with your actual images
import DiseaseImage5 from '../Images/choroba5.png'; // Placeholder images
import DiseaseImage6 from '../Images/choroba6.png'; // Replace with your actual images

const LearningCards = () => {
  const diseases = [
    {
      id: 1,
      name: 'Disease 1',
      image: DiseaseImage1,
      description: 'Spindle cell lipoma (adipocytic tumours)',
    },
    {
      id: 2,
      name: 'Disease 2',
      image: DiseaseImage2,
      description: 'Dermatofibrosarcoma protuberans (fibroblastic/myofibroblastic tumours)',
    },
    {
      id: 3,
      name: 'Disease 3',
      image: DiseaseImage3,
      description: 'Synovial sarcoma (tumours of uncertain differentiation)',
    },
    {
      id: 4,
      name: 'Disease 4',
      image: DiseaseImage4,
      description: 'Leiomyosarcoma (smooth muscle tumours)',
    },
    {
      id: 5,
      name: 'Disease 5',
      image: DiseaseImage5,
      description: 'Angiosarcoma (vascular tumours)',
    },
    {
      id: 6,
      name: 'Disease 6',
      image: DiseaseImage6,
      description: 'Undifferentiated pleomorphic sarcoma (undifferentiated/unclassified sarcomas)',
    },
  ];

  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: '1200px',
        gap: '20px',
        flexWrap: 'wrap', // Allow wrapping to the next row
        padding: '20px',
        margin: 'auto', // Center the content
      }}
    >
      {diseases.map((disease) => (
        <Box
          key={disease.id}
          onClick={() => handleCardClick(disease.id)}
          css={{
            perspective: '1000px', // Enable 3D space
            width: '350px',
            height: '400px',
          }}
        >
          <Box
            css={{
              width: '100%',
              height: '100%',
              position: 'relative',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.5s',
              transform: flippedCards[disease.id] ? 'rotateY(180deg)' : 'rotateY(0)',
            }}
          >
            {/* Front Side */}
            <Box
              css={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: '12px',
                overflow: 'hidden', // Ensure the image fills the card and is clipped by the border radius
              }}
            >
              <img
                src={disease.image}
                alt={disease.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Make the image cover the entire card
                }}
              />
            </Box>

            {/* Back Side */}
            <Box
              css={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                backgroundColor: '#2B2B48',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'rotateY(180deg)',
              }}
            >
              <Text
                css={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
                {disease.description}
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default LearningCards;
