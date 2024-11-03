// TaskSelectionPage.js
import { useState } from 'react';
import { Box, Text } from '@renderer/ui';
import { useImageStore } from '@renderer/store';
import DashboardTopBar from '@renderer/dpSaraka/sections/DashboardTopBar';
import SettingsImage from '../Images/setting.png';
import DifficultyModal from '../components/DifficultyModal';
import LaymanTasks from '../components/LaymanTasks';
import StudentTasks from '../components/StudentTasks';
import ExpertTasks from '../components/ExpertTasks';
import OwnAnnotations from '../components/OwnAnnotations';
import LearningCards from '../components/LearningCards';

const TaskSelectionPage = () => {
  const { userName, difficulty, setDifficulty } = useImageStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Tasks');

  const renderContent = () => {
    switch (activeTab) {
      case 'Tasks':
        return renderTasks();
      case 'Own Annotations':
        return <OwnAnnotations />;
      case 'Learning Cards':
        return <LearningCards />;
      default:
        return renderTasks();
    }
  };

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
      <DashboardTopBar
        id="dashboard--topbar"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

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

      {/* Conditionally render the user's name and difficulty only for the Tasks tab */}
      {activeTab === 'Tasks' && (
        <>
          <Text css={{ fontSize: '16px', color: '#FF6F61', margin: '30px 0' }}>
            Selected difficulty: {difficulty}
          </Text>
          <Text css={{ fontSize: '16px', color: '#B0B0B0', marginBottom: '20px' }}>
            Welcome, {userName}!
          </Text>
        </>
      )}

      {/* Render content based on the active tab */}
      {renderContent()}
    </Box>
  );
};

export default TaskSelectionPage;
