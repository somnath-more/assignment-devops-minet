import React from 'react';
export interface IIconProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}
const Icon = (props: IIconProps) => {
  return <img {...props} alt="img" />;
};

export default Icon;
