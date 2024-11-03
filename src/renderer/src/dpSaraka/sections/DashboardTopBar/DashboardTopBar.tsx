import { memo } from 'react';
import { type ComponentProps } from '@stitches/react';
import { Box, Text } from '@renderer/ui';
import * as S from './styled';
import logo from '../../../../../../resources/logo-dark.svg';

type TDashboardTopBarProps = ComponentProps<typeof S.Root> & {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DashboardTopBar = ({ activeTab, setActiveTab, ...props }: TDashboardTopBarProps) => {
  const tabs = ['Tasks', 'Own Annotations', 'Learning Cards'];

  return (
    <S.Root
      {...props}
      css={{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0 20px',
      }}
    >
      {/* Logo */}
      <Box css={{ display: 'flex', alignItems: 'center' }}>
        <Box
          as="img"
          src={logo}
          height={18}
          alt="AnnotAid Logo"
          css={{ filter: 'drop-shadow(0 0 1px $colors$dark1)', marginRight: '20px' }}
        />
      </Box>

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
    </S.Root>
  );
};

export default memo(DashboardTopBar) as typeof DashboardTopBar;
