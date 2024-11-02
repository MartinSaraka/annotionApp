import { useState, memo } from 'react'
import { Box, Text, Button, RadioGroup, Input } from '@renderer/ui' // Adjust these imports as needed

const OnboardingCardDPSaraka = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [userName, setUserName] = useState('')
  const [difficulty, setDifficulty] = useState('Layman')
  const totalPages = 3

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  return (
    <Box
      css={{
        width: '360px',
        height: '250px',
        background: 'linear-gradient(145deg, #1F1F38, #252545)',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.25)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      {/* Page Content */}
      <Box css={{ flex: 1, width: '100%', textAlign: 'center' }}>
        {currentPage === 1 && (
          <>
            <Text
              css={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#E0E0E0'
              }}
            >
              Welcome to AnnotAid
            </Text>
            <Text
              css={{
                fontSize: '14px',
                color: '#B5B5B5'
              }}
            >
              Innovative image annotation tool for histopathology education.
            </Text>
          </>
        )}
        {currentPage === 2 && (
          <>
            <Text
              css={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#E0E0E0'
              }}
            >
              Enter Your Name
            </Text>
            <Input.Field
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Type your name here"
              css={{
                marginTop: '12px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #444',
                color: '#000',
                backgroundColor: '#FFF',
                width: '100%'
              }}
            />
          </>
        )}
        {currentPage === 3 && (
          <>
            <Text
              css={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#E0E0E0'
              }}
            >
              Difficulty Setting
            </Text>
            <Text
              css={{
                fontSize: '12px',
                color: '#B5B5B5',
                marginBottom: '12px'
              }}
            >
              Based on your level of histopathology knowledge
            </Text>
            <RadioGroup.Root
              css={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '100%'
              }}
            >
              {[
                'Layman',
                'Student (Beginner)',
                'Student (Semi-Expert)',
                'Expert'
              ].map((level) => (
                <RadioGroup.Item
                  key={level}
                  onClick={() => setDifficulty(level)}
                  css={{
                    padding: '8px 12px',
                    borderRadius: '12px',
                    backgroundColor: difficulty === level ? '#3F51B5' : '#444',
                    color: '#FFF',
                    cursor: 'pointer',
                    fontSize: '12px',
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#5A67D8'
                    }
                  }}
                >
                  {level}
                </RadioGroup.Item>
              ))}
            </RadioGroup.Root>
          </>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: '20px'
        }}
      >
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          css={{
            backgroundColor: '#3F51B5',
            visibility: currentPage === 1 ? 'hidden' : 'visible',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '6px 14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#5A67D8'
            }
          }}
        >
          &lt;
        </Button>
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          css={{
            backgroundColor: '#3F51B5',
            visibility: currentPage === totalPages ? 'hidden' : 'visible',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '6px 14px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#5A67D8'
            }
          }}
        >
          &gt;
        </Button>
      </Box>
    </Box>
  )
}

export default memo(OnboardingCardDPSaraka)
