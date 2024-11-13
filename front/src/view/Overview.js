import React , { useState ,useEffect} from 'react';
import { ArrowDownOutlined, ArrowUpOutlined,ClockCircleOutlined,FieldBinaryOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic , Timeline} from 'antd';

const { Meta } = Card;
// const App: React.FC = () => (
const App = () => {

    const [data, setData] = useState([]); // State to hold the API response
        // Fetch data from the API when the component mounts
    useEffect(() => {
    
            const fetchData = async () => {                
              try {
                const response = await fetch('http://localhost:9090/api/process/totals', {
                  method: 'GET',
                //   headers: {
                    // 'Content-Type': 'application/json',
                    // 'Authorization': `Bearer jCPDhaXwSWFgNSTRNeKNtWYhQ7F7VMNM`, // Add Bearer token to headers
      
                //   },            
                //   body: JSON.stringify(data), // Convert form data to JSON string                  
                });                
                console.log("useeffect2")
                const result = await response.json();
                setData(result); // Set the data state with the fetched data
                console.log(result);
              } catch (error) {
                // setError(error.message); // Set error state if there is an error
              } finally {
                // setLoading(false); // Set loading to false after fetching data
              }
            };
        
            fetchData(); // Call the fetch function
          }, []); 

return ( 

    <div style={{ margin:100,marginBottom:0}}>
    <h1>Overview</h1>           
    <br/><br/>
        <Row gutter={10}>
            <Col span={6}>
            <Card bordered={false} style={{background: '#cddc39'}}>
                <Statistic
                title="Total Complete Cases"
                value={data.allTasks}
                precision={0}
                valueStyle={{ color: '#3f8600' }}
                // prefix={<FieldBinaryOutlined />}
                suffix=""
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false}  style={{background:'#ff9800'}}>
                <Statistic
                title="Total Cases"
                value={data.completedTasksCount}
                precision={0}
                valueStyle={{ color: '#fff' }}
                // prefix={<FieldBinaryOutlined />}
                suffix=""
                />
            </Card>
            </Col>
            <Col span={6}>
            <Card bordered={false}  style={{background:'#2196f3'}}>
                <Statistic
                title="Total Users"
                value={data.totalUsers}
                precision={0}
                valueStyle={{ color: '#fff' }}
                // prefix={<FieldBinaryOutlined />}
                suffix=""
                />
            </Card>
            </Col>
        </Row>
        <Row gutter={10} style={{marginTop:50}}>
            <Col span={12}>
                <Card bordered={false}>
                <Timeline
                    items={[
                    {
                        children: 'Create a services site 2015-09-01',
                    },
                    {
                        children: 'Solve initial network problems 2015-09-01',
                    },
                    {
                        dot: <ClockCircleOutlined className="timeline-clock-icon" />,
                        color: 'red',
                        children: 'Technical testing 2015-09-01',
                    },
                    {
                        children: 'Network problems being solved 2015-09-01',
                    },
                    {
                        children: 'Network problems being solved 2015-09-01',
                    },
                    {
                        children: 'Network problems being solved 2015-09-01',
                    },
                    {
                        children: 'Network problems being solved 2015-09-01',
                    },
                    {
                        children: 'Network problems being solved 2015-09-01',
                    },
                    ]}
                />
                </Card>
            </Col>
            <Col span={12}>
            <Card
            //    style={{background:'linear-gradient(to left bottom, #051937, #004d7a, #008793, #00bf72, #a8eb12)'}}
                // cover={
                //     <p>
                //         this is test of card description
                //     </p>
                // // <img
                // //     alt="example"
                // //     src={require(`../assets/images/bg1.jpg`)}
                // // />
                // }
                actions={[
                // <SettingOutlined key="setting" />,
                // <EditOutlined key="edit" />,
                // <EllipsisOutlined key="ellipsis" />,
                ]}
            >
            <Meta            
                title="Chart data"
                description="This is the description"
                />
            </Card>
            </Col>
        </Row>
        <br/>
        <Row gutter={10} style={{marginTop:50}}>

        </Row>
    </div>
);
}

export default App;