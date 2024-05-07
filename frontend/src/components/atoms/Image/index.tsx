import React from 'react';
export interface IImageProps {
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}
const Image = (props: IImageProps) => {
  return (
    <div>
      <img alt="img" {...props} />
    </div>
  );
};

export default Image;
