import { render, screen, waitFor } from '@testing-library/react';
import HomePage from '../HomePage';
import TaskService from '../../services/TaskService';

jest.mock('../../services/TaskService');

describe('HomePage', () => {
  it('fetches and renders tasks', async () => {
    TaskService.getReccentTasks.mockResolvedValueOnce([
      { id: 1, title: 'Sample', description: 'Sample desc' },
    ]);
    render(<HomePage />);
    expect(screen.getByText(/todo application/i)).toBeInTheDocument();
    await waitFor(() => {
  const texts = screen.getAllByText(/sample/i);
  expect(texts.length).toBeGreaterThanOrEqual(1); 
});
  });
});
