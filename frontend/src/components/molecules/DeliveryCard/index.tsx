import React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Stack, styled } from '@mui/material';
import Delivery from '../../../../public/assets/icons/DeliveryIcon.svg';
import theme from 'theme';
import Icon from 'components/atoms/Icon';
import Typography from 'components/atoms/Typography';
const StyledBox = styled(Box)({
  '& .MuiPaper-root ': {
    boxShadow: 'none',
  },
});
const StyledAccordion = styled(Accordion)({
  '& .MuiPaper-root ': {
    boxShadow: 'none',
  },
  '.MuiAccordionDetails-root': {
    padding: '0px',
  },
  '.card-0': {
    backgroundColor: theme.palette.minet_grey[50],
  },
});
const StyledAccordionSummary = styled(AccordionSummary)({
  border: `1px solid ${theme.palette.grey[100]}`,
  borderRadius: '4px',
});
type DeliveryType = {
  type: string;
  duration: string;
  fee: string;
};
export interface IDeliveryCardProps {
  deliveryCardDetails: DeliveryType[];
  title: string;
  subTitle: string;
}
const DeliveryCard = ({
  deliveryCardDetails,
  title,
  subTitle,
}: IDeliveryCardProps) => {
  return (
    <StyledBox>
      <StyledAccordion>
        <StyledAccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Stack direction={'row'} gap={theme.spacing(1.5)}>
            <Icon src={Delivery} alt="delivery-car-icon" />
            <Box>
              <Typography
                variant="body1"
                color={theme.palette.minet_text.high_emphasis}
              >
                {title}
              </Typography>
              <Typography
                variant="caption1"
                color={theme.palette.minet_text.medium_emphasis}
              >
                {subTitle}
              </Typography>
            </Box>
          </Stack>
        </StyledAccordionSummary>
        <AccordionDetails>
          {deliveryCardDetails.map((eachElement, index) => (
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              key={eachElement.type}
              padding={'1rem 1.5rem 1rem 3rem'}
              className={`card-${index}`}
              borderBottom={`1px solid ${theme.palette.grey[100]}`}
            >
              <Stack direction={'row'}>
                <Typography
                  variant="body2"
                  color={theme.palette.minet_text.high_emphasis}
                >
                  {eachElement.type}
                </Typography>
                <Typography
                  variant="body1"
                  color={theme.palette.minet_text.high_emphasis}
                >
                  {`: ${eachElement.duration}`}
                </Typography>
              </Stack>
              <Box>
                <Typography
                  variant="caption2"
                  color={theme.palette.minet_text.medium_emphasis}
                >
                  {`Delivery fees : ${eachElement.fee}`}
                </Typography>
              </Box>
            </Stack>
          ))}
          <Stack padding={'1rem 1.5rem 1rem 3rem'}>
            <Typography
              variant="body2"
              color={theme.palette.minet_text.high_emphasis}
            >
              None
            </Typography>
          </Stack>
        </AccordionDetails>
      </StyledAccordion>
    </StyledBox>
  );
};

export default DeliveryCard;
