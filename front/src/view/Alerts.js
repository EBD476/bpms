import React, { FC } from "react";
import { Button, Card, Table, Badge,Tag ,Col} from "antd";
import styled from "styled-components";
// import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import { Alert } from "../interfaces";
import { CenteredContainer } from "./CenteredContainer";
// import { Payment, Payee, Details, Beneficiary, paymentTypeMap } from "./Transactions";
// import { Line } from "app/utils/useLines";

// const AlertTable = styled(Table)`
//   && {
//     width: calc(100% + 1px);
//     border: 0;
//     margin: 0;

//     td {
//       vertical-align: middle !important;

//       &:first-child {
//         border-left: 0;
//       }

//       &:last-child {
//         border-right: 0;
//       }
//     }

//     tr:first-child {
//       td {
//         border-top: 0;
//       }
//     }
//   }
// `;


export const ScrollingCol = styled(Col)`
  overflow-y: scroll;
  max-height: 80%;
  display: flex;
  flex-direction: column;
`;

const alerts = [
  {
    transactionId : "45788",
    ruleId:1,
    triggeringValue:1000,
    aggregateFieldName:"SUM"
  },
  {
    transactionId:"45466",
    ruleId:2,
    triggeringValue:2000,
    aggregateFieldName:"SUM"
  }
]


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    sorter: {
      compare: (a, b) => a.name - b.name,
      multiple: 3,
    },
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    sorter: {
      compare: (a, b) => a.age - b.age,
      multiple: 3,
    },
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    sorter: {
      compare: (a, b) => a.address - b.address,
      multiple: 3,
    },
   
  },
  {
    title: 'Action',
    key: 'action',
    // render: (_, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //     <a>Delete</a>
    //     <Dropdown
    //      trigger={['click']}
    //      menu={{
    //       items,
    //      }}
    //   >
    //     <a>
    //       More           
    //       <EllipsisOutlined  style={{ fontSize: '14px',padding:5}}/>
    //     </a>
    //   </Dropdown>
    //   </Space>
    // ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const Alerts: React.FC = (props) => {
  const tooManyAlerts = false;//props.alerts.length > 4;

  const handleScroll = () => {
    // props.lines.forEach(line => line.line.position());
  };

  return (

    <div  style={{ marginTop:100, marginLeft:100 }}>
    <h1>Alerts &nbsp;&nbsp;&nbsp;</h1>                           
      <br/> 
    <ScrollingCol xs={{ size: 2, offset: 0 }} onScroll={handleScroll}>
      {alerts.map((alert, idx) => {
        const t = alert;
        return (
          <CenteredContainer
            key={idx}
            className="w-100"
            ref={alert.ref}
            tooManyItems={tooManyAlerts}
            style={{ borderColor: "#ffc107", borderWidth: 1 }}
          >
            <Card>
              Alert
              <Button size="sm" color="primary" className="ml-3">  
                Clear Alert
              </Button>            
            
              <Table columns={columns} dataSource={data}  />
{/* 
              <Table size="sm" bordered={true}>
                <tbody>
                  <tr>
                    <td>Transaction</td>
                    <td>{alert.transactionId}</td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="p-0" style={{ borderBottomWidth: 3 }}>
                      <Payment className="px-2">
                        <Payee>{t.payeeId}</Payee>
                        <Details>
                          <FontAwesomeIcon className="mx-1" icon={paymentTypeMap[t.paymentType]} />
                          <Badge color="info">${parseFloat(t.paymentAmount.toString()).toFixed(2)}</Badge>
                          <FontAwesomeIcon className="mx-1" icon={faArrowRight} />
                        </Details>
                        <Beneficiary>{t.beneficiaryId}</Beneficiary>
                      </Payment>
                    </td>
                  </tr>
                  <tr>
                    <td>Rule</td>
                    <td>{alert.ruleId}</td>
                  </tr>
                  <tr>
                    <td>Amount</td>
                    <td>{alert.triggeringValue}</td>
                  </tr>
                  <tr>
                    <td>Of</td>
                    <td>{alert.aggregateFieldName}</td>
                  </tr>
                </tbody>
              </Table>             */}
            {/* <CardFooter style={{ padding: "0.3rem" }}> */}
              Alert for Rule <em>{alert.ruleId}</em> caused by Transaction{" "}
              <em>{alert.transactionId}</em> with Amount <em>{alert.triggeringValue}</em> of{" "}
              <em>{alert.aggregateFieldName}</em>.
            {/* </CardFooter> */}
            </Card>
          </CenteredContainer>
        );
      })}
    </ScrollingCol>
    </div>
  );
};

export default Alerts;