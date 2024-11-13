package com.bpms.bpms.dto;

import lombok.Data;
import org.flowable.engine.repository.ProcessDefinition;

@Data
public class ProcessDefinitionDto {
    private String id;
    private String key;
    private String name;
    private int version;
    private String deploymentId;

    // Constructor
    public ProcessDefinitionDto(String id, String key, String name, int version, String deploymentId) {
        this.id = id;
        this.key = key;
        this.name = name;
        this.version = version;
        this.deploymentId = deploymentId;
    }

    // Static factory method to convert ProcessDefinition to DTO
    public static ProcessDefinitionDto fromProcessDefinition(ProcessDefinition processDefinition) {
        return new ProcessDefinitionDto(
                processDefinition.getId(),
                processDefinition.getKey(),
                processDefinition.getName(),
                processDefinition.getVersion(),
                processDefinition.getDeploymentId()
        );
    }

}
