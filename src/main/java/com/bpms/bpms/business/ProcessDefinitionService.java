package com.bpms.bpms.business;

import com.bpms.bpms.dto.ProcessDefinitionDto;
import org.flowable.engine.RepositoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProcessDefinitionService {

    private final RepositoryService repositoryService;

    public ProcessDefinitionService(RepositoryService repositoryService) {
        this.repositoryService = repositoryService;
    }

    public List<ProcessDefinitionDto> getAllProcessDefinitions() {
        return repositoryService.createProcessDefinitionQuery()
                .latestVersion()
                .list()
                .stream()
                .map(ProcessDefinitionDto::fromProcessDefinition)
                .collect(Collectors.toList());
    }
}
