package com.bpms.bpms.dto;

import java.util.Date;

public class HistoricActivityInstanceDto {

    private String activityId;
    private String activityName;
    private String activityType;
    private String assignee;
    private Date startTime;
    private Date endTime;

    public HistoricActivityInstanceDto(String activityId, String activityName, String activityType,
                                       String assignee, Date startTime, Date endTime) {
        this.activityId = activityId;
        this.activityName = activityName;
        this.activityType = activityType;
        this.assignee = assignee;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    // Getters and setters
    public String getActivityId() { return activityId; }
    public String getActivityName() { return activityName; }
    public String getActivityType() { return activityType; }
    public String getAssignee() { return assignee; }
    public Date getStartTime() { return startTime; }
    public Date getEndTime() { return endTime; }
}

