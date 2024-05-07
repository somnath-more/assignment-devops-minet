import React from 'react';
import { TextField, TextFieldProps, styled } from '@mui/material';
import theme from '../../../theme';

const CustomField = styled(TextField)({
  border: '1px',
  ...theme.typography.body2,
  borderColor: theme.palette.minet_grey[300],
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.minet_grey[300],
      color: theme.palette.minet_grey[300],
      ...theme.typography.body2,
    },
  },
});
const CustomTextField: React.FC<TextFieldProps> = (props: TextFieldProps) => {
  return <CustomField autoComplete="off" {...props} />;
};

export default CustomTextField;
