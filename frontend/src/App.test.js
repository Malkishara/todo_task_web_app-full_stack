import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ToDo Application header', () => {
  render(<App />);
  const headerElement = screen.getByText(/ToDo Application/i);
  expect(headerElement).toBeInTheDocument();
});
