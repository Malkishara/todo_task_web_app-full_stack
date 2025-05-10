package com.todo.backend.services;

import com.todo.backend.models.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    // for get most recent 5 tasks
    List<Task> getMostRecentTasks();

    // for add new task
    Task addTask(Task task);

    //for update status
    Task updateTaskStatus(Integer id, Boolean status);
}
