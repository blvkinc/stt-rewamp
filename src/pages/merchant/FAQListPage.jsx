import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Input,
    Table,
    Space,
    Empty,
    Tabs,
    Tag,
    Modal
} from 'antd'
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    QuestionCircleOutlined,
    FolderOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'

const { Title, Text } = Typography
const { confirm } = Modal

const FAQListPage = () => {
    const { isMerchantAuthenticated, faqs, deleteFaq, loading } = useMerchant()
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('templates')

    // Wait for auth check
    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>
    }

    // Redirect to auth if not logged in
    if (!isMerchantAuthenticated) {
        return <Navigate to="/merchant/auth" replace />
    }

    // Filter FAQs based on tab and search
    const filteredFaqs = faqs.filter(faq => {
        const isTemplate = activeTab === 'templates' ? faq.type === 'template' : faq.type === 'section'
        const matchesSearch = (faq.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (faq.question || '').toLowerCase().includes(searchTerm.toLowerCase())
        return isTemplate && matchesSearch
    })

    const handleDelete = (id) => {
        confirm({
            title: 'Are you sure you want to delete this FAQ?',
            icon: <ExclamationCircleOutlined />,
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                deleteFaq(id)
            },
        })
    }

    const columns = [
        {
            title: activeTab === 'templates' ? 'Question' : 'Section Name',
            dataIndex: activeTab === 'templates' ? 'question' : 'title',
            key: 'title',
            render: (text, record) => (
                <div>
                    <Text strong>{text}</Text>
                    {activeTab === 'sections' && (
                        <div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>{record.description}</Text>
                        </div>
                    )}
                </div>
            )
        },
        ...(activeTab === 'templates' ? [{
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <Tag color="blue">{category}</Tag>
        }] : [{
            title: 'FAQs Count',
            dataIndex: 'items',
            key: 'count',
            render: (items) => <Tag>{items?.length || 0} items</Tag>
        }]),
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Link to={`/merchant/faqs/${record.id}/edit`}>
                        <Button icon={<EditOutlined />} size="small" />
                    </Link>
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        size="small"
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            )
        }
    ]

    return (
        <div style={{ padding: '24px' }}>
            <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
                <Col>
                    <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>FAQs</Title>
                    <Text type="secondary">Manage your Frequently Asked Questions and FAQ Sections</Text>
                </Col>
                <Col>
                    <Link to={`/merchant/faqs/create?type=${activeTab === 'templates' ? 'template' : 'section'}`}>
                        <Button
                            type="primary"
                            size="large"
                            icon={<PlusOutlined />}
                            style={{
                                background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                                border: 'none',
                                boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)',
                                fontWeight: 600
                            }}
                        >
                            Create {activeTab === 'templates' ? 'FAQ' : 'Section'}
                        </Button>
                    </Link>
                </Col>
            </Row>

            <Card>
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'templates',
                            label: (
                                <span>
                                    <QuestionCircleOutlined />
                                    FAQ Templates
                                </span>
                            ),
                        },
                        {
                            key: 'sections',
                            label: (
                                <span>
                                    <FolderOutlined />
                                    FAQ Sections
                                </span>
                            ),
                        }
                    ]}
                />

                <div style={{ marginBottom: '24px', marginTop: '16px' }}>
                    <Input
                        size="large"
                        placeholder={`Search ${activeTab}...`}
                        prefix={<SearchOutlined />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ maxWidth: 400 }}
                    />
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredFaqs}
                    rowKey="id"
                    locale={{
                        emptyText: <Empty description={`No ${activeTab} found`} />
                    }}
                />
            </Card>
        </div>
    )
}

export default FAQListPage
