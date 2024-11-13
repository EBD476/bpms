import { Transaction } from "./Transaction";
import { RefObject } from "react";
import { RulePayload } from "./Rule";
import { createRef } from "react"; 

const Alert = {
  alertId: "", // string
  ruleId: 0, // number
  violatedRule: {}, // Placeholder for RulePayload object
  triggeringValue: 0, // number
  triggeringEvent: new Transaction(), // Assuming a constructor for Transaction
  ref: createRef() // Create a ref for a div element
};