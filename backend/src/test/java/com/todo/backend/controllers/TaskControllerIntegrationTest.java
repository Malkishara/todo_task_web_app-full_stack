package com.todo.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.todo.backend.models.Task;
import com.todo.backend.repositories.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class TaskControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void cleanDb() {
        taskRepository.deleteAll();
    }

    @Test
    void testAddTask() throws Exception {
        Task task = new Task(null, "Task Title", "Desc", null, null, null);

        mockMvc.perform(post("/api/tasks/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(task)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Task Title"));
    }

    @Test
    void testGetRecentTasks() throws Exception {
        Task task = new Task(null, "Recent Task", "Desc", false, LocalDateTime.now(), LocalDateTime.now());
        taskRepository.save(task);

        mockMvc.perform(get("/api/tasks/recent"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Recent Task"));
    }

    @Test
    void testUpdateTaskStatus() throws Exception {
        Task task = new Task(null, "Task To Update", "Desc", false, LocalDateTime.now(), LocalDateTime.now());
        task = taskRepository.save(task);

        mockMvc.perform(put("/api/tasks/" + task.getId() + "/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("true"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value(true));
    }
}
