/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { memo } from 'react'

import { Box, Text, Button } from '@renderer/ui' // Assuming Button component is imported from your UI library
import { DashboardTopBar } from './sections'

// OnboardingCard component
const OnboardingCard = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 3

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <Box
      css={{
        width: '400px',
        height: '300px',
        backgroundColor: '#101021', // Black background
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
        color: '#fff',
        zIndex: '1000', // Ensure it is above other content
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center' // Ensure text color is white for better readability on dark background
      }}
    >
      {/* Content for each page */}
      <Box css={{ flex: 1, alignItems: 'center', overflow: 'auto' }}>
        {currentPage === 1 && (
          <>
            <Text
              variant="xl"
              css={{
                fontWeight: 500,
                textTransform: 'uppercase'
              }}
            >
              Welcome to AnnotAid
            </Text>
            <Text
              variant="md"
              css={{
                fontWeight: 500,
                textTransform: 'uppercase',
                marginTop: '20px'
              }}
            >
              An innovative image annotation tool designed to help.
            </Text>
          </>
        )}

        {currentPage === 2 && (
          <>
            <Text
              variant="xl"
              css={{
                fontWeight: 500,
                textTransform: 'uppercase'
              }}
            >
              Annotate images easily
            </Text>
            <Text
              variant="md"
              css={{
                fontWeight: 500,
                textTransform: 'uppercase',
                marginTop: '20px'
              }}
            >
              This AI powered tool will help you annotate medical images.
            </Text>
          </>
        )}

        {currentPage === 3 && (
          <>
            <Text
              variant="xl"
              css={{
                fontWeight: 500,
                textTransform: 'uppercase'
              }}
            >
              Let's start
            </Text>
            <Text
              variant="md"
              css={{
                fontWeight: 500,
                textTransform: 'uppercase',
                marginTop: '20px'
              }}
            >
              Open an image by clicking on the top right button 'Open new image'
            </Text>
          </>
        )}
      </Box>

      {/* Navigation buttons */}
      <Box
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 'auto',
          flexDirection: 'row'
        }}
      >
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          style={{ visibility: currentPage === 1 ? 'hidden' : 'visible' }}
        >
          &lt;
        </Button>
        {[1, 2, 3].map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            disabled={currentPage === pageNumber}
            css={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              margin: '5px',
              backgroundColor: currentPage === pageNumber ? '#0056b3' : '#666', // Dark blue for selected, darker grey for others
              cursor: 'pointer',
              color: '#fff' // White text for better visibility
            }}
          />
        ))}
        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={{
            visibility: currentPage === totalPages ? 'hidden' : 'visible'
          }}
        >
          &gt;
        </Button>
      </Box>
    </Box>
  )
}

// Dashboard component
const Dashboard = () => {
  const [showOnboarding] = useState(true)

  return (
    <Box
      css={{
        _appRegion: 'no-drag',
        height: '100%'
      }}
    >
      <DashboardTopBar id="dashboard--topbar" />

      <Box
        css={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {showOnboarding && <OnboardingCard />}

        {/* Your other dashboard content goes here */}
      </Box>
    </Box>
  )
}

export default memo(Dashboard)
