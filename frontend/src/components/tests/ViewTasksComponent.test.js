import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ViewTasksComponent from '../ViewTasksComponent';
import TaskService from '../../services/TaskService';

jest.mock('../../services/TaskService');

const sampleTasks = [
  { id: 1, title: 'Task 1', description: 'Test desc' },
];

describe('ViewTasksComponent', () => {
  it('renders no tasks message', () => {
    render(<ViewTasksComponent tasks={[]} refreshTasks={() => {}} />);
    expect(screen.getByText(/you have no pending tasks/i)).toBeInTheDocument();
  });

  it('renders task list and Done button', () => {
    render(<ViewTasksComponent tasks={sampleTasks} refreshTasks={() => {}} />);
    expect(screen.getByText(/task 1/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /done/i })).toBeInTheDocument();
  });

  it('handles mark as done', async () => {
    TaskService.updateTaskStatus.mockResolvedValueOnce({});
    const refreshMock = jest.fn();
    render(<ViewTasksComponent tasks={sampleTasks} refreshTasks={refreshMock} />);
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    await waitFor(() => {
      expect(screen.getByText(/task status updated successfully/i)).toBeInTheDocument();
    });
    expect(refreshMock).toHaveBeenCalled();
  });

  it('handles mark as done error', async () => {
    TaskService.updateTaskStatus.mockRejectedValueOnce(new Error('Failed'));
    render(<ViewTasksComponent tasks={sampleTasks} refreshTasks={() => {}} />);
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    await waitFor(() => {
      expect(screen.getByText(/failed to update task status/i)).toBeInTheDocument();
    });
  });
});
