import { memo, useState } from 'react'
import { type ComponentProps } from '@stitches/react'
import { useTranslation } from 'react-i18next'

import { Box, Chip, DropdownMenu, Icon, Text, Button } from '@renderer/ui'
import { useImageStore } from '@renderer/store'
import logo from '../../../../../../resources/logo-icon.svg'

type TTopBarLeftSideProps = ComponentProps<typeof Box>

const LeftSide = ({ css, ...rest }: TTopBarLeftSideProps) => {
  const { t } = useTranslation('common')
  const data = useImageStore((state) => state.getData())
  const [showOnboarding, setShowOnboarding] = useState(true)
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

  const toggleOnboarding = () => setShowOnboarding(!showOnboarding)

  return (
    <Box
      aria-description={t('aria.description.imageInfo')}
      css={{ flexDirection: 'row', alignItems: 'center', gap: '$3', ...css }}
      {...rest}
    >
      {showOnboarding && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
            zIndex: '999', // Ensure it is above other content but below the modal
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
          }}
          onClick={toggleOnboarding} // Close the onboarding card when clicking on the background
        >
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
              alignItems: 'flex-end'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside the card from closing it
          >
            <Button
              ghost
              condensed
              hover
              onClick={toggleOnboarding}
              css={{
                color: '$dark4',
                display: 'flex',
                alignItems: 'end', // Vertically align to the end (bottom)
                flexDirection: 'row',
                justifyContent: 'flex-end' // Horizontally align to the end (right)
              }}
            >
              <Icon name="Cross2Icon" width={14} height={14} />
            </Button>
            <Box
              css={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {currentPage === 1 && (
                <>
                  <Text
                    variant="md"
                    css={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Left side bar
                  </Text>
                  <Text css={{ fontSize: '16px' }}>
                    On the left side you can see all of your annotations.
                  </Text>
                </>
              )}
              {currentPage === 2 && (
                <>
                  <Text
                    variant="lg"
                    css={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Top side bar
                  </Text>
                  <Text css={{ fontSize: '16px' }}>
                    The top side bar contains all tools necessary for
                    annotating.
                  </Text>
                </>
              )}
              {currentPage === 3 && (
                <>
                  <Text
                    variant="lg"
                    css={{
                      fontSize: '24px',
                      fontWeight: 'bold',
                      marginBottom: '8px'
                    }}
                  >
                    Right side bar
                  </Text>
                  <Text css={{ fontSize: '16px' }}>
                    On the right side, you can see the differenct classes and
                    parameters. After clicking on an annotation, you will see
                    the features of the annotation and AI rules.
                  </Text>
                </>
              )}
            </Box>

            <Box
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row'
              }}
            >
              <Button
                css={{ margin: '5px' }}
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrevPage()
                }}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                css={{ margin: '5px' }}
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextPage()
                }}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </Box>
          </Box>
        </div>
      )}
      <Button onClick={toggleOnboarding}>Help</Button>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          css={{
            display: 'flex',
            alignItems: 'center',
            gap: '$1',
            userSelect: 'none'
          }}
        >
          <Box
            css={{
              _size: 34,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '$dark2',
              borderRadius: '$5'
            }}
          >
            <Box
              as="img"
              src={logo}
              width={15}
              height={15}
              alt="AnnotAid Logo"
              css={{ filter: 'drop-shadow(0 0 1px $colors$dark1)' }}
            />
          </Box>
          <Icon
            name="ChevronDownIcon"
            width={15}
            height={15}
            css={{ color: '$dark4' }}
          />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>Import annotations</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <Box css={{ flexDirection: 'row', gap: '$1' }}>
        <Text
          variant="lg"
          css={{ color: '$dark4' }}
          aria-describedby="image-project"
        >
          Personal
        </Text>
        <Text role="separator" variant="lg" css={{ color: '$dark4' }}>
          /
        </Text>
        <Text
          as="h1"
          variant="lg"
          css={{ color: '$light' }}
          aria-describedby="image-name"
        >
          {data?.filename}
        </Text>
      </Box>

      <Chip small aria-describedby="image-format">
        {data?.format}
      </Chip>
    </Box>
  )
}

export default memo(LeftSide)
