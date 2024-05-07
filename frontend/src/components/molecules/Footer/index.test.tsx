import { render, screen } from '@testing-library/react';
import Footer, { FooterProps } from '.';

describe('Footer Component', () => {
  const mockProps: FooterProps = {
    label: 'Label',
    career: 'Career',
    privacy: 'Privacy',
    copyright: 'Copyright',
    language: 'Language',
    help: 'Help',
  };

  it('it should renders the component with the provided props', () => {
    render(<Footer {...mockProps} />);

    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Privacy')).toBeInTheDocument();
    expect(screen.getByText('Copyright')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });
});
