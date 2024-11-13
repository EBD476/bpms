package com.bpms.bpms.business;

import com.bpms.bpms.dto.ProcessDefinitionDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/process-definitions")
public class ProcessDefinitionController {

    private final ProcessDefinitionService processDefinitionService;

    public ProcessDefinitionController(ProcessDefinitionService processDefinitionService) {
        this.processDefinitionService = processDefinitionService;
    }

    @GetMapping
    public List<ProcessDefinitionDto> getAllProcessDefinitions() {
        return processDefinitionService.getAllProcessDefinitions();
    }
}
