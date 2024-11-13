package com.bpms.bpms.dto;

import java.util.Date;
import java.util.List;
import java.util.Map;

public class ProcessInstanceDetailsDto {


    private String id;
    private String processDefinitionId;
    private String processDefinitionKey;
    private String businessKey;
    private Date startTime;
    private Date endTime;
    private Map<String, Object> currentVariables;
    private Map<String, Object> historicVariables;
    private List<HistoricActivityInstanceDto> activities;


    public ProcessInstanceDetailsDto(String id, String processDefinitionId, String processDefinitionKey,
                                     String businessKey, Date startTime, Date endTime,
                                     Map<String, Object> currentVariables, Map<String, Object> historicVariables,
                                     List<HistoricActivityInstanceDto> activities) {
        this.id = id;
        this.processDefinitionId = processDefinitionId;
        this.processDefinitionKey = processDefinitionKey;
        this.businessKey = businessKey;
        this.startTime = startTime;
        this.endTime = endTime;
        this.currentVariables = currentVariables;
        this.historicVariables = historicVariables;
        this.activities = activities;
    }

        // Getters and setters
        public String getId() { return id; }
        public String getProcessDefinitionId() { return processDefinitionId; }
        public String getProcessDefinitionKey() { return processDefinitionKey; }
        public String getBusinessKey() { return businessKey; }
        public Date getStartTime() { return startTime; }
        public Date getEndTime() { return endTime; }
        public Map<String, Object> getCurrentVariables() { return currentVariables; }
        public Map<String, Object> getHistoricVariables() { return historicVariables; }
        public List<HistoricActivityInstanceDto> getActivities() { return activities; }
}
