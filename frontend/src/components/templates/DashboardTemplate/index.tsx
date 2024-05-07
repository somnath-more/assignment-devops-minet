import LeftNavBar from 'components/organisms/LeftNavBar';
import React from 'react';
import styled from '@emotion/styled';
import Footer from 'components/molecules/Footer';
import theme from 'theme';
import {
  DASHBOARD_TEMPLATE_TEST_ID,
  FOOTER_CAREER,
  FOOTER_COPYRIGHT,
  FOOTER_HELP,
  FOOTER_LABEL,
  FOOTER_LANGUAGE,
  FOOTER_PRIVACY,
} from 'utils/constants';

export interface IDashBoardProps {
  header: React.ReactNode;
  children?: React.ReactNode;
}
const Container = styled.div({
  display: 'flex',
  width: '100vw',
  height: '100vh',
  flexDirection: 'row',
});

const LeftNavBarContainer = styled.div({
  height: '98%',
  width: '6%',
  position: 'fixed',
});

const HeaderContainer = styled.div({
  position: 'fixed',
  width: '94%',
  zIndex: 2,
});

const MainContainer = styled.div({
  width: '94%',
  marginLeft: '90px',
});

const FooterContainer = styled.div({
  position: 'fixed',
  bottom: '0',
  width: '95%',
  padding: '1.2rem',
  backgroundColor: theme.palette.primary[100],
  borderTop: `1px solid ${theme.palette.minet_grey[100]}`,
});

const MainBody = styled.div({
  border: `1px solid ${theme.palette.minet_grey[100]}`,
  marginTop: '5%',
  backgroundColor: theme.palette.primary[100],
  overflowY: 'auto',
  height: 'calc(95vh - 60px)',
  paddingBottom: '5%',
});

const Dashboard: React.FC<IDashBoardProps> = ({ header, children }) => {
  return (
    <Container>
      <LeftNavBarContainer>
        <LeftNavBar />
      </LeftNavBarContainer>
      <MainContainer data-testid={DASHBOARD_TEMPLATE_TEST_ID}>
        <HeaderContainer>{header}</HeaderContainer>
        <MainBody>{children}</MainBody>
        <FooterContainer>
          <Footer
            label={FOOTER_LABEL}
            career={FOOTER_CAREER}
            privacy={FOOTER_PRIVACY}
            copyright={FOOTER_COPYRIGHT}
            language={FOOTER_LANGUAGE}
            help={FOOTER_HELP}
          />
        </FooterContainer>
      </MainContainer>
    </Container>
  );
};

export default Dashboard;
