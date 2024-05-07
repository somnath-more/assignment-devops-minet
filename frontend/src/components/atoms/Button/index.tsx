import React from 'react';

import { Button as MUIButton, ButtonProps, styled } from '@mui/material';

export interface IButtonProps extends ButtonProps {}
const StyledButton = styled(MUIButton)({
  textTransform: 'none',
});

const CustomButton: React.FC<IButtonProps> = ({ children, ...rest }) => {
  return (
    <StyledButton {...rest} data-testid={children}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
