import { useState } from 'react';
import { Box, Text } from '@renderer/ui';

const DifficultyModal = ({ isOpen, onClose, onSelectDifficulty }) => {
  if (!isOpen) return null;

  const difficulties = [
    { level: 'Layman', description: 'Complete beginners with no medical knowledge.' },
    { level: 'Student (Beginner)', description: 'Those starting to learn.' },
    { level: 'Student (Semi-Expert)', description: 'Students with some knowledge.' },
    { level: 'Expert', description: 'Those with advanced knowledge.' },
  ];

  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleSelection = (level) => {
    setSelectedDifficulty(level);
  };

  const handleConfirm = () => {
    if (selectedDifficulty) {
      onSelectDifficulty(selectedDifficulty);
      onClose();
    }
  };

  return (
    <Box
      css={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <Box
        css={{
          backgroundColor: '#2B2B48',
          padding: '20px',
          borderRadius: '12px',
          textAlign: 'center',
          zIndex: 1001,
          width: '300px',
        }}
      >
        <Text css={{ fontSize: '20px', marginBottom: '20px', color: '#FFFFFF' }}>
          Select Difficulty
        </Text>
        <Box css={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
          {difficulties.map(({ level, description }) => (
            <Box
              key={level}
              onClick={() => handleSelection(level)}
              css={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="difficulty"
                value={level}
                checked={selectedDifficulty === level}
                onChange={() => handleSelection(level)}
                style={{ marginRight: '10px' }}
              />
              <Text css={{ color: '#FFFFFF' }}>{level}</Text>
            </Box>
          ))}
        </Box>
        {selectedDifficulty && (
          <Text css={{ fontSize: '12px', color: '#B0B0B0', marginBottom: '20px' }}>
            {
              difficulties.find(({ level }) => level === selectedDifficulty)?.description
            }
          </Text>
        )}
        <Box css={{ display: 'flex', justifyContent: 'space-around' }}>
          <button
            onClick={handleConfirm}
            style={{
              padding: '5px 10px',
              backgroundColor: '#3F51B5',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            style={{
              padding: '5px 10px',
              backgroundColor: '#B0B0B0',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default DifficultyModal;
