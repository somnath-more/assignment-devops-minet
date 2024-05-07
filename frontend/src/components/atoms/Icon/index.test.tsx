import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Icon from '.';

import Watch from '../../../../public/assets/icons/Icon.svg';

describe('Icon', () => {
  it('renders an image with correct attributes and responds to onClick', async () => {
    const onClickMock = jest.fn();

    render(
      <Icon
        src={Watch}
        alt="img"
        width="32px"
        height="32px"
        onClick={onClickMock}
      />
    );

    const iconElement = screen.getByAltText('img');

    await waitFor(() => {
      expect(iconElement).toBeInTheDocument();
      expect(iconElement).toHaveAttribute('width', '32px');
      expect(iconElement).toHaveAttribute('height', '32px');
    });

    fireEvent.click(iconElement);

    expect(onClickMock).toHaveBeenCalled();
  });
});
