import { Box, Text } from '@renderer/ui' // Adjust based on your UI component library

const AnnotationInfoRules = () => {
  const features = {
    length: 4.2, // Length in mm
    thickness: 0.08 // Thickness in mm
  }

  const riskAssessment = () => {
    if (features.length > 3 && features.thickness < 0.1) {
      return 'Risk of blood vessel infection is around than 90% because length of blood vessel > 3mm and thickness of blood-vessel < 0.1 mm'
    }
    return 'Risk of blood vessel infection is low.'
  }

  return (
    <Box
      css={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '100%', // Ensures the box does not grow beyond the viewport
        overflow: 'hidden', // Hides any overflow (not usually necessary but can be useful)
        wordWrap: 'break-word', // Ensures words do not overflow
        overflowWrap: 'break-word' // Ensures proper line breaks
      }}
    >
      <Text
        css={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '10px'
        }}
      >
        Rules
      </Text>
      <Text
        css={{
          overflow: 'hidden', // Hides text overflow
          textOverflow: 'ellipsis', // Adds an ellipsis if text overflows
          whiteSpace: 'normal' // Allows the text to wrap to the next line
        }}
      >
        {riskAssessment()}
      </Text>
    </Box>
  )
}

export default AnnotationInfoRules
