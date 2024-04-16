import { Box, Text, Button, Dialog } from '@renderer/ui'
import React, { useState } from 'react'

const AnnotationInfoFeatures = () => {
  const [isFeedbackOpen, setFeedbackOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  // Handling the opening and closing of the feedback dialog
  const handleOpenFeedback = () => setFeedbackOpen(true)
  const handleCloseFeedback = () => {
    setFeedbackOpen(false)
    setFeedback('') // Clear feedback text on dialog close
  }
  const handleFeedbackChange = (event) => setFeedback(event.target.value)
  const handleSubmitFeedback = () => {
    console.log(feedback) // Process or send the feedback
    setShowAlert(true) // Show the success alert
    setTimeout(() => setShowAlert(false), 3000) // Hide the alert after 3 seconds
    handleCloseFeedback()
  }
  // Randomly generate features within specified ranges
  const features = {
    length: (Math.random() * (9 - 1) + 1).toFixed(2), // Length in mm, range 1 to 9
    thickness: (Math.random() * (0.4 - 0.05) + 0.05).toFixed(2), // Thickness in mm, range 0.05 to 0.4
    distortion: Math.floor(Math.random() * (80 - 10) + 10) // Distortion, range 10 to 80
  }
  let risk = 5
  const riskAssessment = () => {
    if (
      features.length > 7 &&
      features.thickness < 0.1 &&
      features.distortion > 60
    ) {
      risk = 90
      return 'Risk of blood vessel infection is around 90% because length of blood vessel > 7mm and thickness of blood vessel < 0.1 mm and blood vessel distortion is > 60% '
    } else if (
      features.length > 7 &&
      features.thickness < 0.1 &&
      features.distortion < 60
    ) {
      risk = 60
      return 'Risk of blood vessel infection is around 60% because length of blood vessel > 7mm and thickness of blood vessel < 0.1 mm and blood vessel distortion is < 60% '
    } else if (
      features.length > 7 &&
      features.thickness > 0.1 &&
      features.distortion < 60
    ) {
      risk = 50
      return 'Risk of blood vessel infection is around 50% because length of blood vessel > 7mm and thickness of blood vessel > 0.1 mm and blood vessel distortion is < 60% '
    } else if (
      features.length > 7 &&
      features.thickness > 0.1 &&
      features.distortion > 60
    ) {
      risk = 75
      return 'Risk of blood vessel infection is around 75% because length of blood vessel > 7mm and thickness of blood vessel > 0.1 mm and blood vessel distortion is > 60% '
    } else if (
      features.length > 3 &&
      features.length < 7 &&
      features.thickness < 0.1 &&
      features.distortion > 40 &&
      features.distortion < 60
    ) {
      risk = 70
      return 'Risk of blood vessel infection is around 70% because length of blood vessel in in interval <3,7> and thickness of blood vessel < 0.1 mm and blood vessel distortion is > 40% '
    } else if (
      features.length > 3 &&
      features.length < 7 &&
      features.thickness > 0.1 &&
      features.distortion > 40 &&
      features.distortion < 60
    ) {
      risk = 50
      return 'Risk of blood vessel infection is around 50% because length of blood vessel in in interval <3,7> and thickness of blood vessel > 0.1 mm and blood vessel distortion is > 40% '
    } else if (
      features.length < 3 &&
      features.thickness > 0.1 &&
      features.distortion > 20 &&
      features.distortion < 40
    ) {
      risk = 30
      return 'Risk of blood vessel infection is around 30% because length of blood vessel is < 3 and thickness of blood vessel > 0.1 mm and blood vessel distortion is in interval <20,40> %'
    } else if (
      features.length < 3 &&
      features.thickness > 0.1 &&
      features.distortion < 20
    ) {
      risk = 10
      return 'Risk of blood vessel infection is around 10% because length of blood vessel is < 3 and thickness of blood vessel > 0.1 mm and blood vessel distortion is  <20 %'
    } else if (
      features.length < 3 &&
      features.thickness > 0.1 &&
      features.distortion > 20 &&
      features.distortion < 50
    ) {
      risk = 25
      return 'Risk of blood vessel infection is around 25% because length of blood vessel is < 3 and thickness of blood vessel > 0.1 mm and blood vessel distortion is in interval <20,50> %'
    } else if (
      features.length < 3 &&
      features.thickness > 0.1 &&
      features.distortion > 50
    ) {
      risk = 62
      return 'Risk of blood vessel infection is around 62% because length of blood vessel is < 3 and thickness of blood vessel > 0.1 mm and blood vessel distortion is >50 %'
    } else if (
      features.length > 1 &&
      features.thickness > 0.05 &&
      features.distortion > 10
    ) {
      risk = 20
      return 'Risk of blood vessel infection is around 20% because length of blood vessel is > 3 and thickness of blood vessel > 0.04 mm and blood vessel distortion is > 10 %'
    }
    risk = 5
    return 'Risk of blood vessel infection is low based on features is really low, around 5%'
  }
  const riskMessage = riskAssessment()
  return (
    <>
      <Box
        css={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}
      >
        <Text
          css={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}
        >
          Features
        </Text>
        <Text>Length of blood vessel: {features.length} mm</Text>
        <Text>Thickness of blood vessel: {features.thickness} mm</Text>
        <Text>Distortion of blood vessel: {features.distortion}</Text>

        <Text
          css={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '5px',
            marginBottom: '10px'
          }}
        >
          Infection risk based on Features
        </Text>
        <Text>Infection risk is {risk} %</Text>
      </Box>
      <Box
        css={{
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '8px',
          maxWidth: '100%',
          overflow: 'hidden',
          wordWrap: 'break-word',
          overflowWrap: 'break-word'
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
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            marginBottom: '10px'
          }}
        >
          {riskMessage}
        </Text>
        {/* Feedback Button */}
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button onClick={handleOpenFeedback}>Rule Feedback</Button>
          </Dialog.Trigger>

          {isFeedbackOpen && (
            <Dialog.Content
              css={{
                maxWidth: '600px', // Limiting the width of the dialog
                padding: '20px', // More padding for better layout
                backgroundColor: '#202020', // Dialog background color
                borderRadius: '8px', // Rounded corners
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Soft shadow for better depth
              }}
            >
              <Dialog.Header>
                <Dialog.Title>
                  Feedback Form for blood vessel decission rules
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Description css={{ margin: '20px 0', color: '#aaa' }}>
                Rules were : {riskMessage}
              </Dialog.Description>

              <textarea
                aria-label="Describe your issue"
                placeholder="Describe the issue..."
                style={{
                  width: '100%',
                  minHeight: '100px',
                  margin: '10px 0',
                  padding: '10px',
                  borderRadius: '5px',
                  borderColor: '#ccc',
                  backgroundColor: '#333',
                  color: '#fff',
                  outline: 'none'
                }}
              />
              <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
            </Dialog.Content>
          )}
        </Dialog.Root>
      </Box>
      {showAlert && (
        <Box
          css={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: '#4CAF50',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            fontSize: '16px',
            zIndex: 1000
          }}
        >
          Feedback submitted successfully!
        </Box>
      )}
    </>
  )
}

export default AnnotationInfoFeatures
