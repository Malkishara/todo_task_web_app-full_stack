package com.todo.backend.controllers;

import com.todo.backend.models.Task;
import com.todo.backend.services.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

// for get most 5 recent task
    @GetMapping("/recent")
    public ResponseEntity<?> getMostRecentTasks() {
        try {
            List<Task> tasks = taskService.getMostRecentTasks();
            return ResponseEntity.ok(tasks);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    //for add new task
    @PostMapping("/add")
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        try {
            Task createdTask = taskService.addTask(task);
            return ResponseEntity.ok(createdTask);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    //for update status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Integer id, @RequestBody Boolean status) {
        try {
            log.info("id to update task status: ",id);
            Task updatedTask = taskService.updateTaskStatus(id, status);
            return ResponseEntity.ok(updatedTask);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }


}
