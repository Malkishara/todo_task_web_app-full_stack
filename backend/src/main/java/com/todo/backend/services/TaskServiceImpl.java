package com.todo.backend.services;

import com.todo.backend.models.Task;
import com.todo.backend.repositories.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private TaskRepository taskRepository;

    // find most recent 5 tasks
    @Override
    public List<Task> getMostRecentTasks() {
        try {
            return taskRepository.findTop5ByStatusFalseOrderByCreatedAtDesc();
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch recent tasks: " + e.getMessage());
        }
    }

    // add new task
    @Override
    public Task addTask(Task task) {
        try {
            //set status false
            task.setStatus(false);

            // set created date
            task.setCreatedAt(LocalDateTime.now());

            //set updated date
            task.setUpdatedAt(LocalDateTime.now());

            //save task in db
            return taskRepository.save(task);
        } catch (Exception e) {
            throw new RuntimeException("Failed to add task: " + e.getMessage());
        }
    }

    // update status
    @Override
    public Task updateTaskStatus(Integer id, Boolean status) {
        log.info("id: ",id);
        // find task by id
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        //set status true
        task.setStatus(status);

        //set updated date and time
        task.setUpdatedAt(LocalDateTime.now());

        // save task in db
        return taskRepository.save(task);
    }
}
