import { render, fireEvent } from '@testing-library/react';
import CustomTextField from '.';
import '@testing-library/jest-dom';

describe('CustomTextField', () => {
  it('renders correctly', () => {
    const { getByLabelText } = render(<CustomTextField label="Test Label" />);
    const textField = getByLabelText('Test Label');
    expect(textField).toBeInTheDocument();
  });

  it('handles onChange event', () => {
    let value = '';
    const handleChange = (event: { target: { value: string } }) => {
      value = event.target.value;
    };

    const { getByLabelText } = render(
      <CustomTextField label="Test Label" onChange={handleChange} />
    );
    const textField = getByLabelText('Test Label');

    fireEvent.change(textField, { target: { value: 'Test Input' } });
    expect(value).toBe('Test Input');
  });

  it('disables the input when disabled prop is true', () => {
    const { getByLabelText } = render(
      <CustomTextField label="Test Label" disabled />
    );
    const textField = getByLabelText('Test Label');
    expect(textField).toBeDisabled();
  });
});
