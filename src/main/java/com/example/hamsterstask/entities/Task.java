package com.example.hamsterstask;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private Timestamp dueDate;
    private String title;
    private String description;
    private Timestamp createdAt;
    private Timestamp updatedAt;

    @ManyToOne
    private User assignee;

    @ManyToOne
    private User createdBy;

    @OneToMany(mappedBy = "task")
    private List<Comment> comments = new ArrayList<>();


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Timestamp getDueDate() {
        return dueDate;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public User getAssignee() {
        return assignee;
    }

    public void setAssignee(User assignee) {
        this.assignee = assignee;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
}

