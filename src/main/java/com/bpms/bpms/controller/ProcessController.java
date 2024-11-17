package com.bpms.bpms.controller;

import com.bpms.bpms.business.ProcessService;
import com.bpms.bpms.dto.HistoricActivityInstanceDto;
import com.bpms.bpms.dto.ProcessInstanceDetailsDto;
import com.bpms.bpms.dto.ProcessInstanceDto;
import com.bpms.bpms.dto.TaskDto;
import org.flowable.engine.form.FormProperty;
import org.flowable.engine.repository.Deployment;
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

    @GetMapping("/deployments")
    public List<Deployment> getAllDeployments() {
        return processService.getAllDeployments();
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

    // Endpoint to get all completed tasks
    @GetMapping("/totals")
    public Map<String,Object> getTotals() {
        return processService.getTotals();
    }

    // Endpoint to get all process instances
    @GetMapping("/all-instances")
    public List<ProcessInstance> getProcessInstances() {
        return processService.getAllProcessInstances();
    }

    // Endpoint to get all running process instances
    @GetMapping("/running-processes")
    public List<ProcessInstanceDto> getAllRunningProcesses() {
        return processService.getAllRunningProcessInstances();
    }

    // Endpoint to get process instance details by ID
    @GetMapping("/{processInstanceId}/details")
    public ProcessInstanceDetailsDto getProcessInstanceDetails(@PathVariable String processInstanceId) {
        return processService.getProcessInstanceDetails(processInstanceId);
    }

    @GetMapping("/task/{taskId}")
    public List<HistoricActivityInstanceDto> getProcessInstanceByTaskId(@PathVariable String taskId) {
        return processService.gellProcessInstanceByTaskId(taskId);
    }

    @GetMapping("/task/form/{taskId}")
    List<FormProperty> getFormProperties(@PathVariable String taskId){
        return  processService.getFormProperties(taskId);
    }



}
