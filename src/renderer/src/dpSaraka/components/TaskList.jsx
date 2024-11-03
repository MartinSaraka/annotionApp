import { Box } from '@renderer/ui'
import TaskCard from './TaskCard'

const TaskList = ({ tasks }) => {
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
        <TaskCard key={task.id} task={task} />
      ))}
    </Box>
  )
}

export default TaskList
