import React, { useState } from 'react'
import { Form, Input, Button, Card, Row, Col, Typography, Avatar, Upload, message, Divider } from 'antd'
import { UserOutlined, MailOutlined, PhoneOutlined, UploadOutlined, SaveOutlined, LockOutlined } from '@ant-design/icons'
import MerchantLayout from '../../components/merchant/MerchantLayout'
import { useMerchant } from '../../context/MerchantContext'

const { Title, Text } = Typography

const MerchantProfilePage = () => {
    const { merchant, updateMerchant } = useMerchant()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onFinish = (values) => {
        setLoading(true)
        setTimeout(() => {
            updateMerchant(values)
            message.success('Profile updated successfully!')
            setLoading(false)
        }, 1000)
    }

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <Title level={2}>Merchant Profile</Title>
            <Text type="secondary">Manage your business information and account settings</Text>

            <Row gutter={[24, 24]} style={{ marginTop: 32 }}>
                {/* Profile Card */}
                <Col xs={24} md={8}>
                    <Card style={{ textAlign: 'center' }}>
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 16 }}>
                            <Avatar
                                size={120}
                                src={merchant?.logo}
                                icon={<UserOutlined />}
                                style={{ backgroundColor: '#001529' }}
                            />
                            <Upload showUploadList={false}>
                                <Button
                                    shape="circle"
                                    icon={<UploadOutlined />}
                                    size="small"
                                    style={{
                                        position: 'absolute',
                                        bottom: 0,
                                        right: 0,
                                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                                    }}
                                />
                            </Upload>
                        </div>
                        <Title level={4} style={{ margin: 0 }}>{merchant?.businessName}</Title>
                        <Text type="secondary">{merchant?.email}</Text>

                        <Divider />

                        <div style={{ textAlign: 'left' }}>
                            <Text strong>Subscription:</Text> <Text>{merchant?.subscriptionType}</Text><br />
                            <Text strong>Joined:</Text> <Text>{merchant?.joinedDate}</Text><br />
                            <Text strong>Status:</Text> <Text type="success">{merchant?.status}</Text>
                        </div>
                    </Card>
                </Col>

                {/* Edit Form */}
                <Col xs={24} md={16}>
                    <Card title="Edit Information">
                        <Form
                            form={form}
                            layout="vertical"
                            initialValues={merchant}
                            onFinish={onFinish}
                        >
                            <Row gutter={16}>
                                <Col span={24}>
                                    <Form.Item label="Business Name" name="businessName" rules={[{ required: true }]}>
                                        <Input prefix={<UserOutlined />} placeholder="Enter business name" size="large" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Email Address" name="email" rules={[{ required: true, type: 'email' }]}>
                                        <Input prefix={<MailOutlined />} placeholder="Enter email" size="large" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Phone Number" name="phone">
                                        <Input prefix={<PhoneOutlined />} placeholder="+971..." size="large" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider orientation="left">Security</Divider>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="New Password" name="password">
                                        <Input.Password prefix={<LockOutlined />} placeholder="Leave empty to keep current" size="large" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Confirm Password" name="confirmPassword" dependencies={['password']} rules={[
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ]}>
                                        <Input.Password prefix={<LockOutlined />} placeholder="Confirm new password" size="large" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SaveOutlined />}
                                    loading={loading}
                                    size="large"
                                    style={{
                                        background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                                        border: 'none',
                                        boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)',
                                        fontWeight: 600
                                    }}
                                >
                                    Save Changes
                                </Button>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default MerchantProfilePage
