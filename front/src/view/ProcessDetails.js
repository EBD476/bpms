import React,{useState,useEffect} from 'react';
import { SmileOutlined,LoadingOutlined, CloseOutlined,MinusCircleOutlined,DownOutlined,EllipsisOutlined,PlusOutlined,ReloadOutlined,MoreOutlined } from '@ant-design/icons';
import { Button, Result , notification,Space ,Spin, Dropdown ,Form, Input, Card, Typography, Segmented, Table ,Tag, Row,Col,Switch,Drawer} from 'antd';
import { AddRuleModal } from "./AddRuleModal";
import { useParams } from 'react-router-dom';
import ReactFlow, { Node, addEdge, Background, Edge, Connection, useNodesState, useEdgesState, MiniMap, Controls } from "reactflow";
import "reactflow/dist/style.css";





const { Search } = Input;
 
const key = 'updatable';

const items = [
    {
      label: 'Submit and continue',
      key: '1',
    },
    {
        label: 'Delete',
        key: '2',
    },
    {
        label: 'Edit',
        key: '3',
    },
    {
        label: 'Send to cse',
        key: '4',
    },
  ];

  const columns = [
    {
      title: 'activityId',
      dataIndex: 'activityId',
      key: 'activityId',
      sorter: {
        compare: (a, b) => a.activityId - b.activityId,
        multiple: 3,
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'activityName',
      dataIndex: 'activityName',
      key: 'activityName',
      sorter: {
        compare: (a, b) => a.activityName - b.activityName,
        multiple: 3,
      },
    },
    {
      title: 'activityType',
      dataIndex: 'activityType',
      key: 'activityType',
      sorter: {
        compare: (a, b) => a.activityType - b.activityType,
        multiple: 3,
      },
     
    },
    {
      title: 'assignee',
      dataIndex: 'assignee',
      key: 'assignee',
      sorter: {
        compare: (a, b) => a.assignee - b.assignee,
        multiple: 3,
      },
     
    },
    {
      title: 'startTime',
      dataIndex: 'startTime',
      key: 'startTime',
      sorter: {
        compare: (a, b) => a.startTime - b.startTime,
        multiple: 3,
      },
     
    },
    {
      title: 'endTime',
      dataIndex: 'endTime',
      key: 'endTime',
      sorter: {
        compare: (a, b) => a.endTime - b.endTime,
        multiple: 3,
      },
     
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? '#2db7f5' : '#87d068';
    //         if (tag === 'loser') {
    //           color = '#f50';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Dropdown
           trigger={['click']}
           menu={{
            items,
           }}
        >
          <a>             
            {/* <DownOutlined style={{ fontSize: '10px'}} /> */}
            <MoreOutlined style={{ fontSize: '18px'}}  />
            {/* <EllipsisOutlined  style={{ fontSize: '14px',padding:5}}/> */}
          </a>
        </Dropdown>
        </Space>
      ),
    },
  ];


const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

const App: React.FC = (props) => {
    const [api, contextHolder]= notification.useNotification();
    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const openRuleModal = () => setModalOpen(true);
    const closeRuleModal = () => setModalOpen(false);
    const toggleRuleModal = () => setModalOpen(state => !state);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = useState(false);

    const [data, setData] = useState([]); // State to hold the API response
    const { processId } = useParams(); // Get the id from the URL

    const [elements, setElements] = useState([]);
    
    const onConnect = (params: Edge | Connection) => setElements((els) => addEdge(params, els));

    const nodeTypes = {
      // customType: CustomNodeComponent
    };

    
    useEffect(() => {      
    
      const fetchData = async () => {                
        try {
          const response = await fetch(`http://localhost:9090/api/process/${processId}/details`, {
            method: 'GET',            
          });                          
          const result = await response.json();
          console.log(result)
          setData(result);           
        } catch (error) {
          // setError(error.message); // Set error state if there is an error
        } finally {
          // setLoading(false); // Set loading to false after fetching data
        }
      };
  
      fetchData(); // Call the fetch function
    }, []);
    

    const showDrawer = () => {
        setOpen(true);
      };
    
      const onClose = () => {
        setOpen(false);
      };

    const openNotification = (pauseOnHover) => () => {
        api.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          showProgress: true,
          pauseOnHover,
        });
    
    };

    const onLoad = (reactFlowInstance) => {

      reactFlowInstance.fitView();
      if (elements.length > 0) {
        const firstNode = elements.find(e => e.id === elements[0].id);
        if (firstNode) {
          const x = firstNode.position.x + firstNode.__rf.width / 2;
          const y = firstNode.position.y + firstNode.__rf.height / 2;
          reactFlowInstance.setCenter(x, y);
        }
      }
    };
  

    return (
        <>
        <div  style={{ marginTop:100, marginLeft:100, marginRight:100,minHeight: 400, }}>
           <h1>Rules &nbsp;&nbsp;&nbsp;<Spin indicator={<LoadingOutlined spin style={{color:'#f8994c'}} />} /></h1>                        
          {contextHolder}
          <br/> 

          <Row>
            <Col span={6}>
                <Segmented
                    options={[
                        'Daily',
                        {
                        label: 'Weekly',
                        value: 'Weekly',
                        disabled: true,
                        },
                        'Monthly',
                        {
                        label: 'Quarterly',
                        value: 'Quarterly',
                        disabled: true,
                        },
                        'Yearly',
                    ]}
                />
            </Col>
            <Col span={4} offset={12}>
                <Space>
                <Button type="primary" onClick={openRuleModal} block icon={<PlusOutlined />}>
                    Add Rule
                </Button>
                <Button type="" onClick={openNotification(false)}  icon={<ReloadOutlined />}>
                    Reload
                </Button>
                <Button type="" onClick={setLoading}  icon={<ReloadOutlined />}>                    
                </Button>
                <Dropdown.Button
                    type=""
                    // loading={loadings[0]}
                    menu={{
                    items,
                    }}
                    trigger={['click']}                    
                    onClick={showDrawer}
                    >
                    Actions
                </Dropdown.Button>
                </Space>
            </Col>
            </Row>               
 
            <br/><br/> 
            <Search placeholder="input search text"  allowClear  style={{ width: 400, }} />
            <br/><br/>  
            <Row gutter={16}>
            <Col span={10}>
                <Spin spinning={loading} indicator={<LoadingOutlined spin />} size="large" delat="1000"> 
                    <Table columns={columns} dataSource={data.activities} onChange={onChange} bordered size="small"/> 
                </Spin>
            </Col>
            <Col span={7}  offset={4}>
            <Card title="Card title" bordered={false} style={{ width: 600 }}>
                <p>Card content</p>
                <ReactFlow
                    nodes={elements.nodes}
                    edges={elements.edges}
                    onConnect={onConnect}
                    fitView
                    onLoad={onLoad}
                    nodeTypes={nodeTypes}
                    zoomOnScroll={true}
                    panOnScroll={true}
                    elementsSelectable={true}
                    selectNodesOnDrag={true}
                    zoomOnDoubleClick={true}
                    fitViewOptions={{
                      padding: 0,
                      minZoom: 1,
                      maxZoom: 2,
                    }}

                   >
                   <Background color="#f0f0f0" />
                </ReactFlow>


              </Card>
            </Col>
            </Row>
            <AddRuleModal isOpen={modalOpen} toggle={toggleRuleModal} onClosed={closeRuleModal}  />            
            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
         </div>
        </>
      );
};

export default App;