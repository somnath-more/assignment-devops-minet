import React from 'react';
import { Box, Slider as MuiSlider, styled } from '@mui/material';
import theme from 'theme';
export interface SliderProps {
  value?: number | number[];
  onChange?: (event: Event, value: number | number[]) => void;
}

const StyledSlider = styled(MuiSlider)({
  color: theme.palette.minet_text.light_emphasis,
  '& .MuiSlider-thumb': {
    height: '12px',
    width: '12px',
  },
  '& .MuiSlider-rail': {
    opacity: 'unset',
    width: '2px',
  },
  '& .MuiSlider-track': {
    width: '0px',
  },
});

const StyledBox = styled(Box)({
  // width: '100%',
  height: '88px',
});

const Slider = ({ value, onChange }: SliderProps) => {
  return (
    <StyledBox>
      <StyledSlider
        data-testid="vertical-slider"
        orientation="vertical"
        defaultValue={50}
        value={value}
        min={0}
        step={1}
        onChange={onChange}
      />
    </StyledBox>
  );
};

export default Slider;
