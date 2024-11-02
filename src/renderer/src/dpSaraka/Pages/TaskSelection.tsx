import React, { useState } from 'react';
import { Box, Text } from '@renderer/ui';
import { useImageStore } from '@renderer/store';
import DashboardTopBar from '@renderer/dpSaraka/sections/DashboardTopBar';
import SettingsImage from '../Images/setting.png';
import DifficultyModal from '../components/DifficultyModal';
import LaymanTasks from '../components/LaymanTasks';
import StudentTasks from '../components/StudentTasks';
import ExpertTasks from '../components/ExpertTasks';


const TaskSelectionPage = () => {
  const { userName, difficulty, setDifficulty } = useImageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderTasks = () => {
    switch (difficulty) {
      case 'Layman':
        return <LaymanTasks />;
      case 'Student (Beginner)':
        return <StudentTasks />;
      case 'Student (Semi-Expert)':
        return <StudentTasks />;
      case 'Expert':
        return <ExpertTasks />;
      default:
        return <LaymanTasks />;
    }
  };

  return (
    <Box
      css={{
        _appRegion: 'no-drag',
        height: '100%',
        backgroundColor: '#1E1E36',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <DashboardTopBar id="dashboard--topbar" />

      {/* Settings Icon */}
      <Box
        css={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          cursor: 'pointer',
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <img src={SettingsImage} alt="Settings" style={{ width: '24px', height: '24px' }} />
      </Box>

      {/* Difficulty Modal */}
      <DifficultyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectDifficulty={(level) => setDifficulty(level)}
      />

      <Text css={{ fontSize: '16px', color: '#FF6F61', margin: '30px 0' }}>
        Selected difficulty: {difficulty}
      </Text>

      <Text css={{ fontSize: '16px', color: '#B0B0B0', marginBottom: '20px' }}>
        Welcome, {userName}!
      </Text>

      {/* Render tasks based on difficulty */}
      {renderTasks()}
    </Box>
  );
};

export default TaskSelectionPage;
