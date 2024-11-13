package com.bpms.bpms.business;

import com.bpms.bpms.dto.TaskDto;
import org.flowable.engine.HistoryService;
import org.flowable.engine.RepositoryService;
import org.flowable.engine.RuntimeService;
import org.flowable.engine.TaskService;
import org.flowable.engine.history.HistoricTaskInstance;
import org.flowable.engine.repository.Deployment;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.engine.task.Task;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProcessService {


    private final RuntimeService runtimeService;
    private final TaskService taskService;
    private final RepositoryService repositoryService;
    private final HistoryService historyService;


    public ProcessService(RuntimeService runtimeService, TaskService taskService, RepositoryService repositoryService, HistoryService historyService) {
        this.runtimeService = runtimeService;
        this.taskService = taskService;
        this.repositoryService = repositoryService;
        this.historyService = historyService;
    }

    public void deployProcess() {
        // Deploy the process definition
        InputStream bpmnStream = getClass().getClassLoader().getResourceAsStream("processes/simpleProcess.bpmn20.xml");
        if (bpmnStream == null) {
            throw new RuntimeException("BPMN file not found");
        }
        Deployment deployment = repositoryService.createDeployment()
                .addInputStream("create-task.bpmn20.xml", bpmnStream)
                .deploy();

        System.out.println("Deployed process definition with id: " + deployment.getId());
    }

    public void startProcessInstance() {
        runtimeService.startProcessInstanceByKey("simpleProcess");
    }

    // Retrieve tasks for a specific process instance
    public List<TaskDto> getTasksForProcess(String processInstanceId) {
        List<Task> tasks = taskService.createTaskQuery().processInstanceId(processInstanceId).list();
        return tasks.stream()
                .map(task -> new TaskDto(task.getId(), task.getName(), task.getAssignee()))
                .collect(Collectors.toList());
    }

    public ProcessInstance startProcessWithKey(String processDefinitionKey, Map<String, Object> variables) {
        return runtimeService.startProcessInstanceByKey(processDefinitionKey, variables);
    }

    // Complete a task by ID
    public void completeTask(String taskId) {
        taskService.complete(taskId);
    }

    // Get all tasks in the system
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskService.createTaskQuery().list(); // Retrieve all tasks
        return tasks.stream()
                .map(task -> new TaskDto(task.getId(), task.getName(), task.getAssignee()))
                .collect(Collectors.toList());
    }

    // Get all completed tasks
    public List<TaskDto> getCompletedTasks() {
        // Query for all tasks that are finished
//        List<Task> tasks = taskService.createTaskQuery().finished().list();
        List<HistoricTaskInstance> tasks = historyService
                .createHistoricTaskInstanceQuery()
//                .taskAssignee(username)
                .finished()
                .orderByTaskCreateTime()
                .desc()
                .list();
//                .listPage(firstResult, maxResult);

        return tasks.stream()
                .map(task -> new TaskDto(task.getId(), task.getName(), task.getAssignee()))
                .collect(Collectors.toList());
    }

}
