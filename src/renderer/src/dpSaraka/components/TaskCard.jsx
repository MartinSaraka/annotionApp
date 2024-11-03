import { Box, Text } from '@renderer/ui'

const TaskCard = ({ task }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'easy':
        return '#00FF7F'
      case 'medium':
        return '#FFA500'
      case 'hard':
        return '#FF4500'
      default:
        return '#FFFFFF'
    }
  }

  return (
    <Box
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
      <Text css={{ fontSize: '14px', color: '#B0B0B0', marginBottom: '10px' }}>
        {task.timeLimit}
      </Text>
    </Box>
  )
}

export default TaskCard
