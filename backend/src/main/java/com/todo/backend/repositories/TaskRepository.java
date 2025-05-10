package com.todo.backend.repositories;


import com.todo.backend.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {
    //for find most recent 5 tasks that status false
    List<Task> findTop5ByStatusFalseOrderByCreatedAtDesc();
}
