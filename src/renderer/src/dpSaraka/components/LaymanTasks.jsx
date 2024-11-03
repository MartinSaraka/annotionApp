import React from 'react'
import { Box, Text } from '@renderer/ui'
import HeartTissueImage from '../Images/hearth.png'
import BloodVesselsImage from '../Images/tissue.png'
import CellsImage from '../Images/cells.png'

// Function to determine text color based on difficulty
const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case 'easy':
      return '#00FF7F' // Green
    case 'medium':
      return '#FFA500' // Orange
    case 'hard':
      return '#FF4500' // Red
    default:
      return '#FFFFFF' // Default to white
  }
}

const LaymanTasks = () => {
  const tasks = [
    {
      id: 1,
      title: 'Task 1',
      description: 'Exploring the Basics of Heart Tissue',
      image: HeartTissueImage,
      timeLimit: 'No time limit',
      difficulty: 'easy'
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Understanding Blood Vessels',
      image: BloodVesselsImage,
      timeLimit: 'No time limit',
      difficulty: 'medium'
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Recognizing Healthy vs. Abnormal Cells',
      image: CellsImage,
      timeLimit: 'No time limit',
      difficulty: 'hard'
    }
  ]

  return (
    <Box
      css={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        maxWidth: '1200px',
        gap: '20px',
        flexWrap: 'wrap'
      }}
    >
      {tasks.map((task) => (
        <Box
          key={task.id}
          css={{
            marginTop: '100px',
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
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }}
        >
          <Text
            css={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: getDifficultyColor(task.difficulty)
            }}
          >
            {task.title}
          </Text>
          <Text css={{ fontSize: '16px', color: '#B0B0B0', margin: '10px 0' }}>
            {task.description}
          </Text>
          <Box
            css={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src={task.image}
              alt={task.title}
              style={{ width: '80px', height: '80px' }}
            />
          </Box>
          <Text
            css={{ fontSize: '14px', color: '#B0B0B0', marginBottom: '10px' }}
          >
            {task.timeLimit}
          </Text>
        </Box>
      ))}
    </Box>
  )
}

export default LaymanTasks