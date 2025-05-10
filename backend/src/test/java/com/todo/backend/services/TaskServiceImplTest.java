package com.todo.backend.services;

import com.todo.backend.models.Task;
import com.todo.backend.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class TaskServiceImplTest {
    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskServiceImpl taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAddTask() {
        Task task = new Task(null, "Title", "Desc", null, null, null);
        Task savedTask = new Task(1, "Title", "Desc", false, LocalDateTime.now(), LocalDateTime.now());

        when(taskRepository.save(any(Task.class))).thenReturn(savedTask);

        Task result = taskService.addTask(task);

        assertNotNull(result);
        assertEquals("Title", result.getTitle());
        assertFalse(result.getStatus());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void testGetMostRecentTasks() {
        List<Task> mockTasks = List.of(new Task(), new Task());
        when(taskRepository.findTop5ByStatusFalseOrderByCreatedAtDesc()).thenReturn(mockTasks);

        List<Task> result = taskService.getMostRecentTasks();

        assertEquals(2, result.size());
        verify(taskRepository).findTop5ByStatusFalseOrderByCreatedAtDesc();
    }

    @Test
    void testUpdateTaskStatus() {
        Task existing = new Task(1, "Title", "Desc", false, LocalDateTime.now(), LocalDateTime.now());
        when(taskRepository.findById(1)).thenReturn(Optional.of(existing));
        when(taskRepository.save(any(Task.class))).thenReturn(existing);

        Task result = taskService.updateTaskStatus(1, true);

        assertTrue(result.getStatus());
        verify(taskRepository).findById(1);
        verify(taskRepository).save(any(Task.class));
    }
}
