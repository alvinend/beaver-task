package com.example.hamsterstask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping(consumes = "application/json")
    public @ResponseBody Object create(@RequestBody Map<String, String> user) {
        User n = new User();
        n.setName(user.get("name"));
        n.setEmail(user.get("email"));
        n.setPassword(user.get("password"));
        userRepository.save(n);

        // Build Response
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        map.put("params", user);
        return map;
    }

    @GetMapping
    public @ResponseBody Object getAll() {
        Map<String, Object> map = new HashMap<String, Object>();
        Iterable<User> users = userRepository.findAll();

        map.put("message", "success");
        map.put("data", users);

        return map;
    }

    @GetMapping(path = "/{id}")
    public @ResponseBody Object get(@PathVariable Integer id) {
        Map<String, Object> map = new HashMap<String, Object>();
        Optional<User> optionalUser = userRepository.findById(id);
        User user = optionalUser.get();

        map.put("message", "success");
        map.put("data", user);

        return map;
    }

    @GetMapping(path = "/login")
    public @ResponseBody Object login(@RequestParam String email, @RequestParam String password) {
        Map<String, Object> map = new HashMap<String, Object>();
        Optional<User> optionalUser = userRepository.findByEmailAndPassword(email, password);
        User user = optionalUser.get();

        map.put("message", "success");
        map.put("data", user);

        return map;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public @ResponseBody Object delete(@RequestParam Integer id) {
        Optional<User> user = userRepository.findById(id);
        userRepository.delete(user.get());

        // Build Response
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");

        return map;
    }
}
