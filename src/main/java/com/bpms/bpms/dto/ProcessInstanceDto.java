package com.bpms.bpms.dto;

import java.util.Date;

public class ProcessInstanceDto {
    private String id;
    private String processDefinitionId;
    private String processDefinitionKey;
    private String businessKey;
    private Date startTime;

    public ProcessInstanceDto(String id, String processDefinitionId, String processDefinitionKey, String businessKey, Date startTime) {
        this.id = id;
        this.processDefinitionId = processDefinitionId;
        this.processDefinitionKey = processDefinitionKey;
        this.businessKey = businessKey;
        this.startTime = startTime;
    }

    // Getters and setters
    public String getId() { return id; }
    public String getProcessDefinitionId() { return processDefinitionId; }
    public String getProcessDefinitionKey() { return processDefinitionKey; }
    public String getBusinessKey() { return businessKey; }
    public Date getStartTime() { return startTime; }
}
