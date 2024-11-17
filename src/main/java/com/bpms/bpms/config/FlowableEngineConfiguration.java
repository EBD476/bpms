package com.bpms.bpms.config;

import org.flowable.engine.*;
import org.flowable.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.flowable.engine.impl.cfg.StandaloneProcessEngineConfiguration;
import org.flowable.spring.ProcessEngineFactoryBean;
import org.flowable.spring.SpringProcessEngineConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlowableEngineConfiguration {

//    @Bean
//    public SpringProcessEngineConfiguration processEngineConfiguration(ProcessEngine processEngine) {
//        SpringProcessEngineConfiguration config = (SpringProcessEngineConfiguration) processEngine.getProcessEngineConfiguration();
//        return config;
//    }

//    private final ProcessEngine processEngine;
//    public FlowableEngineConfiguration(ProcessEngine processEngine) {
//        this.processEngine = processEngine;
//    }

    @Bean(name = {"processEngineFactoryBean"})
    public ProcessEngineFactoryBean processEngineFactoryBean() {
        ProcessEngineFactoryBean factoryBean = new ProcessEngineFactoryBean();
        factoryBean.setProcessEngineConfiguration(processEngineConfiguration());
        return factoryBean;
    }

    @Bean(name = {"processEngineConfiguration"})
    public ProcessEngineConfigurationImpl processEngineConfiguration() {

        ProcessEngineConfiguration processEngineConfiguration = new StandaloneProcessEngineConfiguration()
                .setJdbcUrl("jdbc:postgresql://172.16.68.179:25432/bpms")
                .setJdbcUsername("postgres")
                .setJdbcPassword("example")
                .setJdbcDriver("org.postgresql.Driver")
                .setDatabaseSchemaUpdate("true");

        return (ProcessEngineConfigurationImpl)processEngineConfiguration;
    }

    @Bean(name="processEngine")
    public ProcessEngine processEngine() {
        try {
            return  processEngineFactoryBean().getObject();
        } catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @Bean
    public RuntimeService runtimeService(ProcessEngine processEngine) {
        return processEngine.getRuntimeService();
    }


    @Bean
    public RepositoryService repositoryService(ProcessEngine processEngine) {
        return processEngine.getRepositoryService();
    }

    @Bean
    public TaskService taskService(ProcessEngine processEngine) {
        return processEngine.getTaskService();
    }

    @Bean
    public IdentityService identityService(ProcessEngine processEngine) {
        return processEngine.getIdentityService();
    }

    @Bean
    public HistoryService historyService(ProcessEngine processEngine) {
        return processEngine.getHistoryService();
    }

    @Bean
    public FormService formService(ProcessEngine processEngine) {
        return processEngine.getFormService();
    }
}
