import Axios from "axios";
import getFormData from "get-form-data";
import { isArray, pick } from "lodash/fp";
import React, { createRef, FC, FormEvent, useState, MouseEvent } from "react";
// import CreatableSelect from "react-select/creatable";
import { Button, Alert , notification,Space ,Spin, Dropdown ,Form, Input, Card, Typography, Segmented, Table ,Tag, Modal,Select } from 'antd';
// import { Alert, Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
// import { Rule, RulePayload } from "../interfaces/";
import { FieldGroup } from "./FieldGroup";

const headers = { "Content-Type": "application/json" };
const { Option } = Select;

const pickFields = pick([
  "aggregateFieldName",
  "aggregatorFunctionType",
  "groupingKeyNames",
  "limit",
  "limitOperatorType",
  "ruleState",
  "windowMinutes",
]);

const ResponseError = null;

const sampleRules = {
  1: {
    aggregateFieldName: "paymentAmount",
    aggregatorFunctionType: "SUM",
    groupingKeyNames: ["payeeId", "beneficiaryId"],
    limit: 20000000,
    limitOperatorType: "GREATER",
    windowMinutes: 43200,
    ruleState: "ACTIVE",
  },
   2: {
     aggregateFieldName: "paymentAmount",
     aggregatorFunctionType: "SUM",
     groupingKeyNames: ["beneficiaryId"],
     limit: 10000000,
     limitOperatorType: "GREATER_EQUAL",
     windowMinutes: 1440,
     ruleState: "ACTIVE",
   },
  3: {
    aggregateFieldName: "COUNT_WITH_RESET_FLINK",
    aggregatorFunctionType: "SUM",
    groupingKeyNames: ["paymentType"],
    limit: 100,
    limitOperatorType: "GREATER_EQUAL",
    windowMinutes: 1440,
    ruleState: "ACTIVE",
  }
};

const keywords = ["beneficiaryId", "payeeId", "paymentAmount", "paymentType"];
const aggregateKeywords = ["paymentAmount", "COUNT_FLINK", "COUNT_WITH_RESET_FLINK"];
const limitOperatorTypes = ["EQUAL","NOT_EQUAL","GREATER_EQUAL","LESS_EQUAL","GREATER","LESS"];
const ruleState = ["ACTIVE","PAUSE","DELETE"];
const aggregatorFunctionType = ["SUM","AVG","MIN","MAX","MEAN"];

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

// const MySelect = React.memo(CreatableSelect);

export const AddRuleModal: React.FC = (props) => {
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const handleClosed = () => {
    setError(null);
    props.onClosed();
  };

  const handleOk = () => {
    props.onClosed();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = pickFields(getFormData(e.target));
    data.groupingKeyNames = isArray(data.groupingKeyNames) ? data.groupingKeyNames : [data.groupingKeyNames];

    const rulePayload = JSON.stringify(data);
    const body = JSON.stringify({ rulePayload });

    setError(null);
    Axios.post("/api/rules", body, { headers })
      .then(response => props.setRules(rules => [...rules, { ...response.data, ref: createRef() }]))
      .then(props.onClosed)
      .catch(setError);
  };

  const postSampleRule = (ruleId) => (e) => {
    const rulePayload = JSON.stringify(sampleRules[ruleId]);
    const body = JSON.stringify({ rulePayload });

    Axios.post("/api/rules", body, { headers })
      .then(response => props.setRules(rules => [...rules, { ...response.data, ref: createRef() }]))
      .then(props.onClosed)
      .catch(setError);
  };

  return (
    <Modal title="Create Rule" open={props.isOpen} onOk={handleOk} onCancel={handleClosed} okText='Submit'  width={800}>      
        <Form
        {...formItemLayout}
        form={form}
        >
          {error &&  <Alert message="Success Tips" type="success" showIcon closable />}          
          <Alert message="Add a new Rule" type="success" showIcon closable />
          <br/>
          <Form.Item label="ruleState">
            <Select defaultValue="ACTIVE"  style={{width: 200}} size="small">              
              {ruleState.map(k => (
                <Option key={k} value={k}>
                  {k}
                </Option>
              ))}
          </Select>
          </Form.Item>
          <Form.Item label="aggregatorFunctionType">
            <Select defaultValue="SUM" style={{width: 200}} size="small">
             {aggregatorFunctionType.map(k => (
              <Option key={k} value={k}>
                {k}
              </Option>
            ))}
           </Select>
          </Form.Item>

          <Form.Item label="aggregateFieldName">
            <Select defaultValue="paymentAmount" style={{width: 300}} size="small">              
              {aggregateKeywords.map(k => (
                <Option key={k} value={k}>
                  {k}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="groupingKeyNames">
            <Select style={{width: 300}} mode="multiple" size="small" placeholder="select one item">              
              {keywords.map(k => (
                <Option key={k} value={k}>
                  {k}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="limitOperatorType">
            <Select defaultValue="EQUAL" style={{width: 300}} size="small">              
              {limitOperatorTypes.map(k => (
                <Option key={k} value={k}>
                  {k}
                </Option>
              ))}
            </Select>
          </Form.Item>

          
          <Form.Item label="limit">
              <Input  size="small"/>
          </Form.Item>
                   
          <Form.Item label="windowMinutes">
              <Input size="small" />
          </Form.Item>

        {/* <ModalFooter className="justify-content-between">
          <div>
            <Button color="secondary" onClick={postSampleRule(1)} size="sm" className="mr-2">
              Sample Rule 1
            </Button>
            <Button color="secondary" onClick={postSampleRule(2)} size="sm" className="mr-2">
              Sample Rule 2
            </Button>
            <Button color="secondary" onClick={postSampleRule(3)} size="sm" className="mr-2">
              Sample Rule 3
            </Button>
          </div>
          <div> */}
    
      </Form>
    </Modal>
  );
};

