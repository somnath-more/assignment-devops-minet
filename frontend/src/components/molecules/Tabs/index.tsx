import React from 'react';
import { Box, Tabs as MuiTabs, Tab } from '@mui/material';
import theme from '../../../theme/index';
import { ALL_ASSESTS, WATCHLIST } from '../../../utils/constants/index';
import Typography from '../../atoms/Typography/index';
import styled from '@emotion/styled';

export interface TabsProps {
  selectedTab?: string;
  onTabChange: (newValue: string) => void;
}

const StyledBox = styled(Box)({
  width: '100%',
  height: '100%',
  borderBottom: '1px solid',
  borderBottomColor: theme.palette.minet_grey.main,
});

const Tabs: React.FC<TabsProps> = ({ selectedTab, onTabChange }) => {
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };

  return (
    <StyledBox>
      <MuiTabs className="tabs" value={selectedTab} onChange={handleTabChange}>
        <Tab
          data-testid="tab1"
          value="all_assests"
          label={
            <Typography
              variant="subtitle2"
              textTransform="none"
              sx={{
                color:
                  selectedTab === 'all_assests'
                    ? theme.palette.primary[500]
                    : theme.palette.minet_text.medium_emphasis,
              }}
            >
              {ALL_ASSESTS}
            </Typography>
          }
        />
        <Tab
          data-testid="tab2"
          value="watchlist"
          label={
            <Typography
              variant="subtitle2"
              textTransform="none"
              color={theme.palette.minet_text.medium_emphasis}
              sx={{
                color:
                  selectedTab === 'watchlist'
                    ? theme.palette.primary[500]
                    : theme.palette.minet_text.medium_emphasis,
              }}
            >
              {WATCHLIST}
            </Typography>
          }
        />
      </MuiTabs>
    </StyledBox>
  );
};

export default Tabs;
