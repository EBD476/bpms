import React from 'react';
import { SmileOutlined,LoadingOutlined, CloseOutlined,MinusCircleOutlined  } from '@ant-design/icons';
import { Button, Result , notification,Space ,Spin, Dropdown ,Form, Input, Card, Typography,Segmented} from 'antd';


const key = 'updatable';

const items = [
    {
      label: 'Submit and continue',
      key: '1',
    },
  ];

const App: React.FC = () => {
    const [api, contextHolder]= notification.useNotification();
    const [form] = Form.useForm();

    const openNotification = (pauseOnHover) => () => {
        api.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          showProgress: true,
          pauseOnHover,
        });
    
    };

    return (
        <>
        <div  style={{ marginTop:100, marginLeft:100,minHeight: 400, }}>
           <h1>About &nbsp;&nbsp;&nbsp;<Spin indicator={<LoadingOutlined spin style={{color:'#f8994c'}} />} /></h1>           
           <br/><br/>
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
    
           <br/><br/>
          {contextHolder}
          <Space>
            <Button type="primary" onClick={openNotification(true)}>
            Pause on hover
            </Button>
            <Button type="primary" onClick={openNotification(false)}>
            Don&apos;t pause on hover
            </Button>
    

    
             <Dropdown.Button
                type="primary"
                // loading={loadings[0]}
                menu={{
                items,
                }}
                trigger={['click']}
                // onClick={() => enterLoading(0)} 
                >
              Submit
            </Dropdown.Button>
            </Space>

            <br/><br/>     

            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 18,
                }}
                form={form}
                name="dynamic_form_complex"
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"
                initialValues={{
                    items: [{}],
                }}
                >
            <Form.List name="items">
                {(fields, { add, remove }) => (
                <div
                    style={{
                    display: 'flex',
                    rowGap: 16,
                    flexDirection: 'column',
                    }}
                >
                    {fields.map((field) => (
                    <Card
                        size="small"
                        title={`Item ${field.name + 1}`}
                        key={field.key}
                        extra={
                        <CloseOutlined
                            onClick={() => {
                            remove(field.name);
                            }}
                        />
                        }
                    >
                <Form.Item label="Name" name={[field.name, 'name']}>
                  <Input />
                        </Form.Item>

                        {/* Nest Form.List */}
                        <Form.Item label="List">
                        <Form.List name={[field.name, 'list']}>
                            {(subFields, subOpt) => (
                            <div
                                style={{
                                display: 'flex',
                                flexDirection: 'column',
                                rowGap: 16,
                                }}
                            >
                                {subFields.map((subField) => (
                                <Space key={subField.key}>
                                    <Form.Item noStyle name={[subField.name, 'first']}>
                                    <Input placeholder="first" />
                                    </Form.Item>
                                    <Form.Item noStyle name={[subField.name, 'second']}>
                                    <Input placeholder="second" />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                    onClick={() => {
                                        subOpt.remove(subField.name);
                                    }}
                                    />
                                </Space>
                                ))}
                                <Button type="dashed" onClick={() => subOpt.add()} block>
                                + Add Sub Item
                                </Button>
                            </div>
                            )}
                        </Form.List>
                        </Form.Item>
                    </Card>
                    ))}

                    <Button type="dashed" onClick={() => add()} block>
                    + Add Item
                    </Button>
                </div>
                )}
            </Form.List>

            <Form.Item noStyle shouldUpdate>
                {() => (
                <Typography>
                    <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                </Typography>
                )}
            </Form.Item>
            </Form>

         </div>
        </>
      );
};

export default App;