import Typography from '../../atoms/Typography';
import Image from '../../atoms/Image';
import React from 'react';
import TickSymbol from '../../../../public/assets/images/Group 42.svg';
import CustomButton from '../../atoms/Button';
import styled from '@emotion/styled';
import theme from '../../../theme';

export interface IPaymentSuccessful {
  onClick?: () => void;
  blnAmount: string;
  textArea1: string;
  textArea2: string;
  buttonText1: string;
  buttonText2: string;
}
const StyledContainer = styled.div({
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '79vh',
  gap: '40px',
});

const StyledTextContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
});

const StyledButton = styled.div({
  display: 'flex',
  gap: '24px',
});
const PaymentSuccessCard: React.FC<IPaymentSuccessful> = ({
  onClick,
  blnAmount,
  buttonText1,
  buttonText2,
  textArea1,
  textArea2,
}) => {
  return (
    <StyledContainer>
      <Image src={TickSymbol} />
      <Typography variant="h4">{blnAmount}</Typography>
      <StyledTextContainer>
        <Typography variant="body2">{textArea1}</Typography>
        <Typography variant="body2">{textArea2}</Typography>
      </StyledTextContainer>
      <StyledButton>
        <CustomButton variant="outlined" style={{ height: '42px' }}>
          {buttonText1}
        </CustomButton>
        <CustomButton
          variant="contained"
          style={{
            backgroundColor: theme.palette.primary.main,
            height: '42px',
          }}
          onClick={onClick}
        >
          {buttonText2}
        </CustomButton>
      </StyledButton>
    </StyledContainer>
  );
};

export default PaymentSuccessCard;
