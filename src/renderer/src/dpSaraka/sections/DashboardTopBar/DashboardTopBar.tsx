// Updated DashboardTopBar.js
import { memo } from 'react';
import { type ComponentProps } from '@stitches/react';
import { Box, Text, Button, Icon } from '@renderer/ui';
import * as S from './styled';
import logo from '../../../../../../resources/logo-dark.svg';
import { useImageStore } from '@renderer/store'
type TDashboardTopBarProps = ComponentProps<typeof S.Root> & {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DashboardTopBar = ({ activeTab, setActiveTab, ...props }: TDashboardTopBarProps) => {
  const tabs = ['Tasks', 'Own Annotations', 'Learning Cards'];

  const addEmptyTab = useImageStore((state) => state.addEmptyTab)

  return (
    <S.Root
      {...props}
      css={{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Adjusted to space items apart
        padding: '0 20px',
      }}
    >
      {/* Left Side: Logo and Tabs */}
      <Box css={{ display: 'flex', alignItems: 'center',  flexDirection: 'row' }}>
        {/* Logo */}
        <Box
          as="img"
          src={logo}
          height={18}
          alt="AnnotAid Logo"
          css={{ filter: 'drop-shadow(0 0 1px $colors$dark1)', marginRight: '20px' }}
        />

        {/* Tab Navigation */}
        <Box css={{ display: 'flex', gap: '20px', flexDirection: 'row' }}>
          {tabs.map((tab) => (
            <Text
              key={tab}
              onClick={() => setActiveTab(tab)}
              css={{
                cursor: 'pointer',
                color: activeTab === tab ? '#007BFF' : '#B0B0B0',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#007BFF',
                },
              }}
            >
              {tab}
            </Text>
          ))}
        </Box>
      </Box>

      {/* Right Side: Button for "Own Annotations" Tab */}
      {activeTab === 'Own Annotations' && (
        <Button onClick={addEmptyTab} css={{ marginLeft: 'auto', marginRight: '40px ' }}>
          <Icon name="FilePlusIcon" width={14} height={14} />
          Open New Image
        </Button>
      )}
    </S.Root>
  );
};

export default memo(DashboardTopBar) as typeof DashboardTopBar;
