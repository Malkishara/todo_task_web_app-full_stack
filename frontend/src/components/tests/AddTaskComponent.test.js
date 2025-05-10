import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddTaskComponent from '../AddTaskComponent';
import TaskService from '../../services/TaskService';

jest.mock('../../services/TaskService');

describe('AddTaskComponent', () => {
  it('renders input fields and button', () => {
    render(<AddTaskComponent refreshTasks={() => {}} />);
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('shows error if title or description is empty', async () => {
    render(<AddTaskComponent refreshTasks={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(await screen.findByText(/both title and description are required/i)).toBeInTheDocument();
  });

  it('adds task successfully', async () => {
    TaskService.addTask.mockResolvedValueOnce({});
    const refreshTasksMock = jest.fn();

    render(<AddTaskComponent refreshTasks={refreshTasksMock} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Task' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Description' } });

    fireEvent.click(screen.getByRole('button', { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText(/task added successfully/i)).toBeInTheDocument();
    });
    expect(refreshTasksMock).toHaveBeenCalled();
  });

  it('handles API failure', async () => {
    TaskService.addTask.mockRejectedValueOnce(new Error('Network Error'));
    render(<AddTaskComponent refreshTasks={() => {}} />);
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Desc' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    expect(await screen.findByText(/failed to add task/i)).toBeInTheDocument();
  });
});
