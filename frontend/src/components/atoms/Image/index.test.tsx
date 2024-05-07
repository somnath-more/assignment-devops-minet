import React from 'react';
import Image from '.';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Image Component', () => {
  it('renders the SignUp image', () => {
    render(<Image />);
    const SignUpImage = screen.getByAltText('img');
    expect(SignUpImage).toBeInTheDocument();
    expect(SignUpImage).toHaveAttribute('alt', 'img');
  });

  it('renders the Avatar image', () => {
    render(<Image />);
    const AvatarImage = screen.getAllByAltText('img');
    expect(AvatarImage[0]).toBeInTheDocument();
    expect(AvatarImage[0]).toHaveAttribute('alt', 'img');
  });
});
