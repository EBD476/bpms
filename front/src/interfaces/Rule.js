import { createRef } from "react"; 

const Rule = {
  id: 0, // number
  rulePayload: "", // string
  ref: createRef() // Create a ref for a div element
};

const RulePayload = {
  aggregateFieldName: "", // string
  aggregatorFunctionType: "", // string
  groupingKeyNames: [], // Array of strings
  limit: 0, // number
  limitOperatorType: "", // string
  windowMinutes: 0, // number
  ruleState: "" // string
};