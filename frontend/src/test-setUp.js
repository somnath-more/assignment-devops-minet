import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MinetStore } from 'context';
import { BrowserRouter } from 'react-router-dom';

const wrapper = ({ children }) => {
  const userDetails = { id: 1, email: 'test@gmail.com' };
  return (
    <BrowserRouter>
      <MinetStore.Provider value={{ userDetails }}>
        {children}
      </MinetStore.Provider>
    </BrowserRouter>
  );
};

const customRender = (ui, options) => render(ui, { wrapper, ...options });

export { customRender as render };
