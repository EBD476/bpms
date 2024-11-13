// import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { Button, FloatButton, Menu, Layout , theme ,Table, Space, Breadcrumb, Tag ,Card, Col, Row } from 'antd';
// import { Col, FormGroup, Label } from "reactstrap";
import styled from "styled-components";

// const LabelColumn = styled(Label)`
//   text-align: right;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   flex-basis: 33%;
//   flex: 1 1 auto;
// `;

// const InputColumn = styled(Col)`
//   flex-basis: 67%;
//   flex: 1 1 auto;
// `;

export const FieldGroup:  React.FC = (props) => (  
    <Row>
    {/* <LabelColumn className="col-sm-4"> */}
      {/* <FontAwesomeIcon icon={props.icon} fixedWidth={true} className="mr-2" /> */}
     <span> {props.label} </span>
    {/* </LabelColumn> */}
    {/* <InputColumn sm="8">{props.children}</InputColumn> */}
    </Row>  
);

