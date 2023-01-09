package com.example.hamsterstask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Timestamp;
import java.util.*;

@Controller
@RequestMapping(path = "/api/task")
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
    public @ResponseBody Object getAll() {
        Map<String, Object> map = new HashMap<String, Object>();
        Iterable<Task> tasks = taskRepository.findAll();

        map.put("message", "success");
        map.put("data", tasks);

        return map;
    }

    @PostMapping
    public @ResponseBody Object create(
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String assignee_user_id,
            @RequestParam String creator_user_id,
            @RequestParam String status,
            @RequestParam String due_date) {
        Task n = new Task();
        n.setTitle(name);
        n.setDescription(description);
        n.setStatus(status);

        Timestamp due_date_timestamp = Timestamp.valueOf(due_date);
        n.setDueDate(due_date_timestamp);

        Optional<User> assignee = userRepository.findById(Integer.parseInt(assignee_user_id));
        n.setAssignee(assignee.get());

        Optional<User> creator = userRepository.findById(Integer.parseInt(creator_user_id));
        n.setCreatedBy(creator.get());

        taskRepository.save(n);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        return map;
    }

    @PostMapping(path = "/{id}/comment")
    public @ResponseBody Object createComment(
            @PathVariable String task_id,
            @RequestParam String content,
            @RequestParam String user_id) {
        Comment n = new Comment();
        n.setContent(content);

        Optional<User> user = userRepository.findById(Integer.parseInt(user_id));
        n.setCreatedBy(user.get());

        Optional<Task> task = taskRepository.findById(Integer.parseInt(task_id));
        n.setTask(task.get());

        commentRepository.save(n);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", n);
        return map;
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/{id}")
    public @ResponseBody Object update(
            @PathVariable String id,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String assignee_user_id,
            @RequestParam String status,
            @RequestParam String due_date) {
        Optional<Task> optional_task = taskRepository.findById(Integer.parseInt(id));
        Task task = optional_task.get();

        task.setTitle(name);
        task.setDescription(description);
        task.setStatus(status);

        Optional<User> assignee = userRepository.findById(Integer.parseInt(assignee_user_id));
        task.setAssignee(assignee.get());

        Timestamp due_date_timestamp = Timestamp.valueOf(due_date);
        task.setDueDate(due_date_timestamp);

        taskRepository.save(task);

        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");
        map.put("data", task);

        return map;
    }

    @RequestMapping(method = RequestMethod.DELETE, path = "/{id}")
    public @ResponseBody Object delete(@PathVariable String id) {
        Optional<Task> task = taskRepository.findById(Integer.parseInt(id));
        taskRepository.delete(task.get());

        // Delete all comments
        Iterable<Comment> comments = task.get().getComments();
        for (Comment comment : comments) {
            commentRepository.delete(comment);
        }

        // Build Response
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", "success");

        return map;
    }
}
