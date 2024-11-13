package com.bpms.bpms.dto;

public class TaskDto {

    private String id;
    private String name;
    private String assignee;

    // Constructor
    public TaskDto(String id, String name, String assignee) {
        this.id = id;
        this.name = name;
        this.assignee = assignee;
    }

    // Getters and setters
    public String getId() { return id; }
    public String getName() { return name; }
    public String getAssignee() { return assignee; }
}
