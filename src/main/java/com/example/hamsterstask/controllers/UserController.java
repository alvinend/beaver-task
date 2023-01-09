package com.example.hamsterstask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.*;

@Controller
@RequestMapping(path = "/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public @ResponseBody Object create(@RequestParam String name, @RequestParam String email) {
        User n = new User();
        n.setName(name);
        n.setEmail(email);
        userRepository.save(n);

        // Build Response
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        return map;
    }

    @GetMapping
    public @ResponseBody Object get(@RequestParam String name) {
        Map<String, Object> map = new HashMap<String, Object>();
        User user = userRepository.findByName(name);

        map.put("message", "success");
        map.put("data", user);

        return map;
    }

    @RequestMapping(method = RequestMethod.DELETE)
    public @ResponseBody Object delete(@RequestParam String name) {
        User user = userRepository.findByName(name);
        userRepository.delete(user);

        // Build Response
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");

        return map;
    }
}
