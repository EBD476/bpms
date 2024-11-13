
import React, { useState ,useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { Button, FloatButton, Menu, Layout , theme ,Table, Space, Breadcrumb, Tag ,Card, Col, Row } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PlusOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  HomeOutlined, UserOutlined,
  AlertOutlined
} from '@ant-design/icons';


import { GlobalContext } from './GlobalStore';
import Setting from './view/Setting';
import About from './view/About';
import Tasks from './view/Tasks';
import Process from './view/Process';
import Alerts from './view/Alerts';
import Management from './view/Management';
import Overview from './view/Overview';
import ProcessDetails from './view/ProcessDetails';


const items = [
  {
    key: '1',
    icon: <PieChartOutlined />,
    label:( 
      <Link to="/">Overview</Link>
      )
  },
  {
    key: '2',
    icon: <DesktopOutlined />,
    label:( 
      <Link to="/tasks">Tasks</Link>
      )    
  },
  {
    key: '21',
    icon: <DesktopOutlined />,
    label:( 
      <Link to="/process">Process</Link>
      )    
  },
  {
    key: '3',
    icon: <AlertOutlined />,
    label:( 
      <Link to="/alerts">Alerts</Link>
      )    
  },
  {
    key: '4',
    icon: <ContainerOutlined />,    
    label:( 
      <Link to="/setting">Settings</Link>
      )    
  },
  {
    key: 'sub1',
    label: 'Workflow',
    icon: <MailOutlined />,
    children: [
      {
        key: '5',
        label: 'Option 5',
      },
      {
        key: '6',
        label: 'Option 6',
      },
      {
        key: '7',
        label: 'Option 7',
      },
      {
        key: '8',
        label: 'Option 8',
      },
    ],
  },
  {
    key: '5',
    icon: <ContainerOutlined />,    
    label:( 
      <Link to="/management">Management</Link>
      )    
  },
  {
    key: 'about',
    icon: <PieChartOutlined />,
    label:( 
      <Link to="/about">About</Link>
      )
  },
];


const data = [
  {
    tags: ['Active'],
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    tags: ['Active'],
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    tags: ['Active'],
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    tags: ['Active'],
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

const { Header, Sider, Content } = Layout;

const items1 = ['Workflow'].map((key) => ({
  key,
  label: `${key}`,
}));

const App = () => {

  const [current, setCurrent] = useState('mail');
  const [collapsed, setCollapsed] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [data, setData] = useState([]); // State to hold the API response


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


    // Fetch data from the API when the component mounts
    useEffect(() => {
      const fetchData = async () => {
        let data = {"query": [{"_name": "listOrganisation"},{"_name": "sort","_fields": [{ "locked": "asc" },{"name": "asc"}]},{"_name": "page","from": 0,  "to": 30}]};
        try {
          const response = await fetch('http://172.16.68.178:9000/api/v1/query?name=get-all-organisations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer jCPDhaXwSWFgNSTRNeKNtWYhQ7F7VMNM`, // Add Bearer token to headers

            },            
            body: JSON.stringify(data), // Convert form data to JSON string
          });
          const result = await response.json();
          setData(result); // Set the data state with the fetched data
        } catch (error) {
          // setError(error.message); // Set error state if there is an error
        } finally {
          // setLoading(false); // Set loading to false after fetching data
        }
      };
  
      // fetchData(); // Call the fetch function
    }, []); 

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const columns = [
    {
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? '#87d068' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      render: (_, { name }) => (
        <>                      
              <div>
                <Button type="primary" shape="circle" disabled icon={<MailOutlined />}/>
                <span> &nbsp;&nbsp;&nbsp;{name}</span>
              </div>                
        </>
      ),
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
  ];
  
return (    
  <GlobalContext>
          <Router>
<Layout>
    {/* <Header
          style={{
            display: 'flex',
            alignItems: 'center',            
          }}
        >
          <div className="demo-logo" /> */}
          {/* <Menu            
            theme='dark'
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={items1}
            style={{
              flex: 1,
              minWidth: 0,              
            }}
          /> */}
        {/* </Header> */}
      <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}  >
        <div className="demo-logo-vertical" />
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <span className="demo-logo-text">WORKFLOW</span>
        <Menu          
              theme='dark'
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"               
              inlineCollapsed={!collapsed}
              items={items}
              style={{
                height: '72vh',
              }}
          />
      </Sider>
      <Layout style={{padding: '0' }}>
  
           {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />  */}
     
        <Content style={{ background: colorBgContainer,minHeight: 400, }}>
        <Header
          style={{
            padding: 0,
            paddingTop:50,
            paddingLeft:100,
            background: colorBgContainer,
          }}>
              <Breadcrumb
                  items={[
                    {
                      href: '/',
                      title: <HomeOutlined />,
                    },
                    {
                      href: '',
                      title: (
                        <>
                          <UserOutlined />
                          <span>Application List</span>
                        </>
                      ),
                    },
                    {
                      title: 'Application',
                    },
                  ]}
                />
                  {/* <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>       */}
      
          
          {/* <Space>
            <Button icon={<PlusOutlined />} />
            <Button onClick={setAgeSort}  >Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll} danger >Clear filters and sorters</Button>
          </Space> */}

          {/* <Table columns={columns} dataSource={data} onChange={handleChange} /> */}

          </Header>    
     
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/about" element={<About />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/process" element={<Process/>} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/management" element={<Management />} />                
                <Route path="/processDetails/:processId" element={<ProcessDetails />} />                
              </Routes>

          {/* <h1>Overview</h1>  
          <br/>   
          <Row >
              <Col span={16}>
                <Card title="Card title" bordered={true}>
                  Card content test
                </Card>
              </Col>
          </Row>
          <br/> */}
          <FloatButton onClick={() => console.log('onClick')} />
        </Content>
                   
      </Layout>
    </Layout>
    </Layout>
    </Router>
    </GlobalContext>

  );
}

export default App;
