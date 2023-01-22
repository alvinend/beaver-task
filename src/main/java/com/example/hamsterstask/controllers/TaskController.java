package com.example.hamsterstask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.*;
import java.time.*;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping(path = "/api/tasks")
public class TaskController {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @GetMapping(path = "/{id}")
    public @ResponseBody Object get(@PathVariable String id) {
        Map<String, Object> map = new HashMap<String, Object>();
        Optional<Task> task = taskRepository.findById(Integer.parseInt(id));

        map.put("message", "success");
        map.put("data", task);

        return map;
    }

    @GetMapping
    public @ResponseBody Object getAll(@RequestParam String userId) {
        // Check if User Exist if not throw error
        Optional<User> optionalUser = userRepository.findById(Integer.parseInt(userId));
        optionalUser.get();

        // Get all tasks
        Map<String, Object> map = new HashMap<String, Object>();
        Iterable<Task> tasks = taskRepository.findAll();

        map.put("message", "success");
        map.put("data", tasks);

        return map;
    }

    @PostMapping
    public @ResponseBody Object create(
            @RequestBody Map<String, String> taskBody) {
        Task n = new Task();
        n.setTitle(taskBody.get("title"));

        if (taskBody.get("description") != "") {
            n.setDescription(taskBody.get("description"));
        }

        if (taskBody.get("status") != "") {
            n.setStatus(taskBody.get("status"));
        } else {
            n.setStatus("wip");
        }

        if (taskBody.get("due_date") != "") {
            Instant instant = Instant.ofEpochSecond(Long.parseLong(taskBody.get("due_date")));
            Timestamp timestamp = Timestamp.from(instant);
            n.setDueDate(timestamp);
        }

        if (taskBody.get("assignee_user_id") != "") {
            Optional<User> assignee = userRepository.findById(Integer.parseInt(taskBody.get("assignee_user_id")));
            n.setAssignee(assignee.get());
        }

        Optional<User> creator = userRepository.findById(Integer.parseInt(taskBody.get("created_by_user_id")));
        n.setCreatedBy(creator.get());

        taskRepository.save(n);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        return map;
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public @ResponseBody Object update(
            @PathVariable String id,
            @RequestBody Map<String, String> taskBody) {
        Optional<Task> optional_task = taskRepository.findById(Integer.parseInt(id));
        Task n = optional_task.get();

        n.setTitle(taskBody.get("title"));

        if (taskBody.get("description") != "") {
            n.setDescription(taskBody.get("description"));
        }

        if (taskBody.get("status") != "") {
            n.setStatus(taskBody.get("status"));
        } else {
            n.setStatus("wip");
        }

        if (taskBody.get("due_date") != "") {
            Instant instant = Instant.ofEpochSecond(Long.parseLong(taskBody.get("due_date")));
            Timestamp timestamp = Timestamp.from(instant);
            n.setDueDate(timestamp);
        }

        if (taskBody.get("assignee_user_id") != "") {
            Optional<User> assignee = userRepository.findById(Integer.parseInt(taskBody.get("assignee_user_id")));
            n.setAssignee(assignee.get());
        }

        Optional<User> creator = userRepository.findById(Integer.parseInt(taskBody.get("created_by_user_id")));
        n.setCreatedBy(creator.get());

        taskRepository.save(n);

        n.setAssignee(n.getAssignee());
        n.setCreatedBy(n.getCreatedBy());

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        return map;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public @ResponseBody Object delete(@PathVariable String id) {
        Optional<Task> task = taskRepository.findById(Integer.parseInt(id));

        // Delete all comments
        Iterable<Comment> comments = task.get().getComments();
        for (Comment comment : comments) {
            commentRepository.delete(comment);
        }

        taskRepository.delete(task.get());

        // Build Response
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");

        return map;
    }

    @PostMapping(path = "/{id}/comments")
    public @ResponseBody Object createComment(
            @PathVariable String id,
            @RequestBody Map<String, String> body) {
        Comment n = new Comment();
        n.setContent(body.get("content"));

        Optional<User> user = userRepository.findById(Integer.parseInt(body.get("created_by_user_id")));
        n.setCreatedBy(user.get());

        Optional<Task> task = taskRepository.findById(Integer.parseInt(id));
        n.setTask(task.get());

        n.setCreatedAt(Timestamp.from(Instant.now()));
        n.setUpdatedAt(Timestamp.from(Instant.now()));

        commentRepository.save(n);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        return map;
    }

    @GetMapping(path = "/{id}/comments")
    public @ResponseBody Object getComments(@PathVariable String id) {
        Optional<Task> task = taskRepository.findById(Integer.parseInt(id));
        Iterable<Comment> comments = task.get().getComments();

        for (Comment comment : comments) {
            comment.setCreatedBy(comment.getCreatedBy());
        }

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", comments);
        return map;
    }
}
