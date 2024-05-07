import React, { useContext, useState } from 'react';
import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import { Box, styled } from '@mui/material';
import minetTheme from 'theme';
import { CONTEXT_USER_DETAILS, SIDE_NAV_BAR } from 'utils/constants';
import { useNavigate } from 'react-router-dom';
import { MinetStore } from '../../../context';

const CustomStyledNavBarBox = styled(Box)({
  width: '80px',
  height: '100%',
  padding: '24px',
  gap: '72px',
  backgroundColor: minetTheme.palette.background.default,
});
const CustomStyledInnerBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  gap: '44px',
});

const LeftNavBar = () => {
  const [activeIcons, setActiveIcons] = useState<boolean[]>(
    SIDE_NAV_BAR.map((item) => item.altIcon)
  );
  const navigate = useNavigate();
  const { setUserDetails } = useContext(MinetStore);

  const handleClick = (label: string, index: any) => {
    const newActiveIcons = [...activeIcons];
    newActiveIcons[index] = !newActiveIcons[index];
    setActiveIcons(newActiveIcons);
    switch (label) {
      case 'Logout':
        localStorage.removeItem('userDetails');
        setUserDetails(CONTEXT_USER_DETAILS);
        navigate('/login');

        break;
      case 'Dashboard':
        navigate('/');
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <CustomStyledNavBarBox>
        <CustomStyledInnerBox>
          {SIDE_NAV_BAR.map((item, index) => (
            <Button
              key={item.id}
              startIcon={
                <Icon
                  src={activeIcons[index] ? item.icon : item.altIcon}
                  alt={item.label}
                  onClick={() => handleClick(item.label, index)}
                  data-testid={'icon-' + item.label}
                />
              }
            />
          ))}
        </CustomStyledInnerBox>
      </CustomStyledNavBarBox>
    </div>
  );
};

export default LeftNavBar;
