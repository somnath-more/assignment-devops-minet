import { Box, TextFieldProps, styled } from '@mui/material';
import CustomTextField from 'components/atoms/TextFields';
import Typography from 'components/atoms/Typography';
import theme from 'theme';
import React from 'react';

export interface TextFieldWithTypographyProps {
  width?: string;
  height?: string;
  heading?: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  InputProps?: object;
  TextFieldProps?: TextFieldProps;
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
});

export const StyledTextField = styled(CustomTextField)({
  height: '48px',
  width: '100%',
  '& .MuiInputBase-input': {
    ...theme.typography.caption1,
    color: theme.palette.minet_text.high_emphasis,
  },
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
  },
  '& .MuiFormHelperText-root': {
    color: theme.palette.minet_error.main,
  },
  '& .css-byvip8-MuiFormHelperText-root': {
    marginLeft: 0,
  },
});

const TextFieldWithTypography = (props: TextFieldWithTypographyProps) => {
  return (
    <div>
      <StyledBox width={props.width} height={props.height}>
        <Typography
          variant="button"
          textTransform={'none'}
          color={theme.palette.minet_grey[500]}
        >
          {props.heading}
        </Typography>
        <StyledTextField
          data-testid="testfield"
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          helperText={props.helperText}
          InputProps={props.InputProps}
          {...props.TextFieldProps}
        />
      </StyledBox>
    </div>
  );
};

export default TextFieldWithTypography;
