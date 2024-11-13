package com.bpms.bpms.controller;

import com.bpms.bpms.business.ProcessService;
import com.bpms.bpms.dto.TaskDto;
import org.flowable.engine.runtime.ProcessInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/process")
public class ProcessController {

    @Autowired
    private ProcessService processService;

    @PostMapping("/start-process")
    public String startProcess() {
        processService.startProcessInstance();
        return "Process started!";
    }

    @PostMapping("/deploy")
    public void deployProcess() {
        processService.deployProcess();
    }

    @PostMapping("/start")
    public String startProcess(@RequestParam String processKey, @RequestBody Map<String, Object> variables) {
        ProcessInstance processInstance = processService.startProcessWithKey(processKey, variables);
        return "Process started. ID: " + processInstance.getId();
    }


    // Endpoint to get tasks for a specific process instance
    @GetMapping("/tasks/{processInstanceId}")
    public List<TaskDto> getTasksForProcess(@PathVariable String processInstanceId) {
        return processService.getTasksForProcess(processInstanceId);
    }

    // Endpoint to complete a specific task
    @PostMapping("/complete-task/{taskId}")
    public void completeTask(@PathVariable String taskId) {
        processService.completeTask(taskId);
    }

    // Endpoint to get all tasks in the system
    @GetMapping("/tasks")
    public List<TaskDto> getAllTasks() {
        return processService.getAllTasks();
    }

    // Endpoint to get all completed tasks
    @GetMapping("/completed-tasks")
    public List<TaskDto> getCompletedTasks() {
        return processService.getCompletedTasks();
    }
}
