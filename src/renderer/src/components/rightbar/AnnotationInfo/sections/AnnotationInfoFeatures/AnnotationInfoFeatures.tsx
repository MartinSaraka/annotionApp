import { Box, Text } from '@renderer/ui' // Assuming these are styled components or similar from your UI library

const AnnotationInfoFeatures = () => {
  const features = {
    length: 4.2, // Length in mm
    thickness: 0.08 // Thickness in mm
  }

  return (
    <Box
      css={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}
    >
      <Text
        css={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}
      >
        Features
      </Text>
      <Text>Infection risk around 90%</Text>
      <Text>Length of blood vessel: {features.length} mm</Text>
      <Text>Thickness of blood vessel: {features.thickness} mm</Text>
    </Box>
  )
}

export default AnnotationInfoFeatures
