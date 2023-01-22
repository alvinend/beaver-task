package com.example.hamsterstask;

import org.springframework.data.repository.*;

import com.example.hamsterstask.User;

import java.util.*;

import org.springframework.data.jpa.repository.Query;
import java.lang.Iterable;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface UserRepository extends CrudRepository<User, Integer> {
    // Find By Name and Password
    Optional<User> findByEmailAndPassword(String email, String password);
}
