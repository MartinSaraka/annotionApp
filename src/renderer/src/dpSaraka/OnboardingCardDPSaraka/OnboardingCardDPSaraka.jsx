import { useState, memo } from 'react'
import { Box, Text, Button } from '@renderer/ui' // Adjust these imports as needed
import HistopathologyIcon from '../Images/histopathology.png' // Correct relative path to your PNG image

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
        height: '280px',
        backgroundColor: '#28284A',
        padding: '20px',
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Page Content */}
      <Box
        css={{ flex: 1, width: '100%', textAlign: 'center', padding: '10px' }}
      >
        {currentPage === 1 && (
          <>
            <Text
              css={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#FFFFFF'
              }}
            >
              Welcome to AnnotAid
            </Text>
            <Text
              css={{
                fontSize: '14px',
                color: '#B0B0B0',
                marginBottom: '16px'
              }}
            >
              Innovative image annotation tool for histopathology education.
            </Text>
            <img
              src={HistopathologyIcon}
              alt="Microscope Icon"
              style={{
                width: '80px',
                height: '80px',
                margin: '0 auto'
              }}
            />
          </>
        )}
        {currentPage === 2 && (
          <>
            <Text
              css={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '8px',
                color: '#FFFFFF'
              }}
            >
              Enter Your Name
            </Text>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              style={{
                marginTop: '8px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #444',
                color: '#000',
                backgroundColor: '#FFF',
                width: '100%',
                fontSize: '14px'
              }}
            />
          </>
        )}
        {currentPage === 3 && (
          <>
            <Text
              css={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '6px',
                color: '#FFFFFF'
              }}
            >
              Difficulty Setting
            </Text>
            <Text
              css={{
                fontSize: '12px',
                color: '#FF6F61',
                marginBottom: '40px'
              }}
            >
              Based on level of histopathology knowledge
            </Text>

            {/* Difficulty Levels */}
            <Box
              css={{
                display: 'flex',
                flexDirection: 'row', // Ensure options are in a row
                justifyContent: 'space-around',
                width: '100%',
                marginBottom: '16px'
              }}
            >
              {[
                'Layman',
                'Student (Beginner)',
                'Student (Semi-Expert)',
                'Expert'
              ].map((level) => (
                <Box
                  key={level}
                  onClick={() => setDifficulty(level)}
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: difficulty === level ? '#FFF' : '#B0B0B0',
                    transition: 'color 0.3s ease'
                  }}
                >
                  <Box
                    css={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: difficulty === level ? '#FFF' : '#666',
                      marginBottom: '4px'
                    }}
                  />
                  <Text>{level}</Text>
                </Box>
              ))}
            </Box>

            {/* Description Below Levels */}
            <Text
              css={{
                fontSize: '10px',
                color: '#B0B0B0',
                textAlign: 'center'
              }}
            >
              {difficulty === 'Layman' &&
                'Layman is for complete beginners with no medical knowledge.'}
              {difficulty === 'Student (Beginner)' &&
                'Student (Beginner) is for those starting to learn.'}
              {difficulty === 'Student (Semi-Expert)' &&
                'Semi-expert students with some knowledge.'}
              {difficulty === 'Expert' &&
                'Expert is for those with advanced knowledge.'}
            </Text>
          </>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Box
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: currentPage > 1 ? 'space-between' : 'flex-end',
          width: '100%',
          marginTop: '16px'
        }}
      >
        {currentPage > 1 && (
          <Button
            onClick={goToPrevPage}
            css={{
              backgroundColor: '#3F51B5',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
              '&:hover': {
                backgroundColor: '#5A67D8'
              }
            }}
          >
            &lt;
          </Button>
        )}
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          css={{
            backgroundColor: '#3F51B5',
            color: '#FFFFFF',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
