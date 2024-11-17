package com.bpms.bpms.business;

import com.bpms.bpms.dto.HistoricActivityInstanceDto;
import com.bpms.bpms.dto.ProcessInstanceDetailsDto;
import com.bpms.bpms.dto.ProcessInstanceDto;
import com.bpms.bpms.dto.TaskDto;
import org.flowable.engine.*;
import org.flowable.engine.form.FormProperty;
import org.flowable.engine.form.TaskFormData;
import org.flowable.engine.history.HistoricActivityInstance;
import org.flowable.engine.history.HistoricProcessInstance;
import org.flowable.engine.history.HistoricTaskInstance;
import org.flowable.engine.history.HistoricVariableInstance;
import org.flowable.engine.repository.Deployment;
import org.flowable.engine.runtime.ProcessInstance;
import org.flowable.engine.task.Task;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProcessService {

    private final RuntimeService runtimeService;
    private final TaskService taskService;
    private final RepositoryService repositoryService;
    private final HistoryService historyService;
    private final FormService formService;
    private final IdentityService identityService;
    private Deployment deployment;

    public ProcessService(RuntimeService runtimeService, TaskService taskService, RepositoryService repositoryService, HistoryService historyService, FormService formService, IdentityService identityService) {
        this.runtimeService = runtimeService;
        this.taskService = taskService;
        this.repositoryService = repositoryService;
        this.historyService = historyService;
        this.formService = formService;
        this.identityService = identityService;
    }

    //***********************************************************************************************************
    public void deployProcess() {
        // Deploy the process definition
        InputStream bpmnStream = getClass().getClassLoader().getResourceAsStream("processes/simpleFormProcess.bpmn20.xml");
        if (bpmnStream == null) {
            throw new RuntimeException("BPMN file not found");
        }
        deployment = repositoryService.createDeployment()
                .addInputStream("simpleFormProcess-v2.bpmn20.xml", bpmnStream)
                .deploy();

        System.out.println("Deployed process definition with id: " + deployment.getId());
    }

    //***********************************************************************************************************
    public void startProcessInstance() {
        runtimeService.startProcessInstanceByKey("simpleformProcess");
    }

    //***********************************************************************************************************
    // Retrieve tasks for a specific process instance
    public List<TaskDto> getTasksForProcess(String processInstanceId) {
        List<Task> tasks = taskService.createTaskQuery().processInstanceId(processInstanceId).list();
        return tasks.stream()
                .map(task -> new TaskDto(task.getId(), task.getName(), task.getAssignee()))
                .collect(Collectors.toList());
    }

    //***********************************************************************************************************
    public ProcessInstance startProcessWithKey(String processDefinitionKey, Map<String, Object> variables) {
        return runtimeService.startProcessInstanceByKey(processDefinitionKey, variables);
    }

    //***********************************************************************************************************
    // Complete a task by ID
    public void completeTask(String taskId) {
        taskService.complete(taskId);
    }

    //***********************************************************************************************************
    // Get all tasks in the system
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskService.createTaskQuery().list(); // Retrieve all tasks
        return tasks.stream()
                .map(task -> new TaskDto(task.getId(), task.getName(), task.getAssignee()))
                .collect(Collectors.toList());
    }

    //***********************************************************************************************************
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
    //***********************************************************************************************************
    // Get all completed tasks
    public Map<String,Object> getTotals() {
//         Query for all tasks that are finished
//        List<Task> tasks = taskService.createTaskQuery().finished().list();
        long completedTasksCount = getCompletedTasks().size();
//        historyService
//                .createHistoricTaskInstanceQuery()
//                .finished()
//                .orderByTaskCreateTime()
//                .desc()
//                .count();
        long  allTasksCount = taskService.createTaskQuery().count();
        long allRunningProcessCount = getAllRunningProcessInstances().size();
        long allProcessCount = getAllProcessInstances().size();
        long userCounts = identityService.createUserQuery().count(); // Retrieve all users

        Map<String,Object> data = new HashMap<>();
        data.put("allTasks",allTasksCount);
        data.put("completedTasksCount",completedTasksCount);
        data.put("allRunningProcessCount",allRunningProcessCount);
        data.put("allProcessCount",allProcessCount);
        data.put("totalUsers",userCounts);

        return data;
    }

    //******************************* process service methods **************************************************
    public List<ProcessInstance> getAllProcessInstances() {

        return runtimeService.createProcessInstanceQuery()
                .deploymentId(deployment.getId())
                .list();
    }

    //***********************************************************************************************************
    public List<ProcessInstanceDto> getAllRunningProcessInstances() {
        List<ProcessInstance> processInstances = runtimeService.createProcessInstanceQuery()
                .active()  // This will only retrieve running (active) processes
                .list();
        return processInstances.stream()
                .map(processInstance -> new ProcessInstanceDto(
                        processInstance.getId(),
                        processInstance.getProcessDefinitionId(),
                        processInstance.getProcessDefinitionKey(),
                        processInstance.getBusinessKey(),
                        processInstance.getStartTime()))
                .collect(Collectors.toList());
    }

    //***********************************************************************************************************
    // Get detailed information about a specific process instance
    public ProcessInstanceDetailsDto getProcessInstanceDetails(String processInstanceId) {
        // Get process instance details
        ProcessInstance processInstance = runtimeService.createProcessInstanceQuery()
                .processInstanceId(processInstanceId)
                .singleResult();

        if (processInstance == null) {
            throw new IllegalArgumentException("No process instance found with ID: " + processInstanceId);
        }

        // Retrieve process variables for the process instance
        Map<String, Object> processVariables = runtimeService.getVariables(processInstanceId);

        // Retrieve historical variables
        List<HistoricVariableInstance> historicVariables = historyService.createHistoricVariableInstanceQuery()
                .processInstanceId(processInstanceId)
                .list();

        Map<String, Object> historicVariableMap = historicVariables.stream()
                .collect(Collectors.toMap(HistoricVariableInstance::getVariableName, HistoricVariableInstance::getValue));

        // Retrieve historical activity instances (activities within the process)
        List<HistoricActivityInstanceDto> activities = historyService.createHistoricActivityInstanceQuery()
                .processInstanceId(processInstanceId)
                .orderByHistoricActivityInstanceStartTime()
                .asc()
                .list()
                .stream()
                .map(activity -> new HistoricActivityInstanceDto(
                        activity.getActivityId(),
                        activity.getActivityName(),
                        activity.getActivityType(),
                        activity.getAssignee(),
                        activity.getStartTime(),
                        activity.getEndTime()))
                .collect(Collectors.toList());

        // Return the process instance details as a DTO with historical activities
        return new ProcessInstanceDetailsDto(
                processInstance.getId(),
                processInstance.getProcessDefinitionId(),
                processInstance.getProcessDefinitionKey(),
                processInstance.getBusinessKey(),
                processInstance.getStartTime(),
                processInstance.isEnded() ? null: null,
                processVariables,
                historicVariableMap,
                activities
        );

    }

    //******************************* process service methods **************************************************
    public  List<HistoricActivityInstanceDto> gellProcessInstanceByTaskId(String taskId) {

        HistoricTaskInstance task = historyService.createHistoricTaskInstanceQuery()
                .taskId(taskId)
                .singleResult();

        List<HistoricActivityInstanceDto> historicActivityInstance = historyService
                .createHistoricActivityInstanceQuery()
                .processInstanceId(task.getProcessInstanceId())
                .list()
                .stream()
                .map(activity -> new HistoricActivityInstanceDto(
                        activity.getActivityId(),
                        activity.getActivityName(),
                        activity.getActivityType(),
                        activity.getAssignee(),
                        activity.getStartTime(),
                        activity.getEndTime()))
                .collect(Collectors.toList());

         return historicActivityInstance;
    }

    //***********************************************************************************************************
    public List<Deployment> getAllDeployments(){
        return repositoryService.createDeploymentQuery().list();
    }

    //***********************************************************************************************************
    public List<FormProperty> getFormProperties(String taskId) {

        Task task = taskService.createTaskQuery().taskId(taskId).singleResult();
        if (task != null) {
            TaskFormData formData = formService.getTaskFormData(taskId);
            return formData.getFormProperties();
        } else {
            throw new IllegalArgumentException("No task found for ID: " + taskId);
        }
    }

}
