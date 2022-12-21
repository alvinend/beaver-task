package com.example.hamsterstask;

import org.springframework.data.repository.CrudRepository;

import com.example.hamsterstask.Task;

// This will be AUTO IMPLEMENTED by Spring into a Bean called TaskRepository
// CRUD refers Create, Read, Update, Delete

public interface TaskRepository extends CrudRepository<Task, Integer> {

}
