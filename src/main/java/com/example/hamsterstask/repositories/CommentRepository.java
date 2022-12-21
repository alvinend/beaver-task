package com.example.hamsterstask;

import org.springframework.data.repository.CrudRepository;

import com.example.hamsterstask.Comment;

// This will be AUTO IMPLEMENTED by Spring into a Bean called CommentRepository
// CRUD refers Create, Read, Update, Delete

public interface CommentRepository extends CrudRepository<Comment, Integer> {

}
