import React, { useState, useEffect } from 'react'
import { Navigate, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import {
    Card,
    Form,
    Input,
    Button,
    Select,
    Typography,
    Space,
    Divider,
    message,
    Radio
} from 'antd'
import {
    ArrowLeftOutlined,
    SaveOutlined,
    QuestionCircleOutlined,
    FolderOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'

const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select

const CreateFAQPage = () => {
    const { isMerchantAuthenticated, faqs, addFaq, updateFaq, loading } = useMerchant()
    const navigate = useNavigate()
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const [form] = Form.useForm()

    const isEditMode = !!id
    const initialType = searchParams.get('type') || 'template'
    const [type, setType] = useState(initialType)
    const [saving, setSaving] = useState(false)
    // Move these checks inside the effect or return null at the very end to avoid hook order issues
    useEffect(() => {
        if (loading) return

        if (isEditMode) {
            const faqToEdit = faqs.find(f => f.id === parseInt(id) || f.id === id)
            if (faqToEdit) {
                setType(faqToEdit.type)
                form.setFieldsValue(faqToEdit)
            } else {
                // Only redirect if we are sure we have loaded and it's not found
                if (faqs.length > 0) {
                    message.error('FAQ not found')
                    navigate('/merchant/faqs')
                }
            }
        } else {
            setType(initialType)
        }
    }, [isEditMode, id, faqs, form, initialType, navigate, loading])

    const onFinish = async (values) => {
        setSaving(true)
        try {
            const faqData = {
                ...values,
                type,
                // If section, we might want to store selected FAQ IDs
                items: type === 'section' ? values.items : null
            }

            if (isEditMode) {
                updateFaq(parseInt(id) || id, faqData)
                message.success('FAQ updated successfully')
            } else {
                addFaq(faqData)
                message.success('FAQ created successfully')
            }
            navigate('/merchant/faqs')
        } catch (error) {
            message.error('Failed to save FAQ')
        } finally {
            setSaving(false)
        }
    }

    // Get available templates for section selection
    const availableTemplates = faqs.filter(f => f.type === 'template')

    // Wait for auth check
    if (loading) {
        return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>
    }

    // Redirect to auth if not logged in
    if (!isMerchantAuthenticated) {
        return <Navigate to="/merchant/auth" replace />
    }

    return (
        <div style={{ padding: '24px', maxWidth: 800, margin: '0 auto' }}>
            <div style={{ marginBottom: '24px' }}>
                <Link to="/merchant/faqs">
                    <Button icon={<ArrowLeftOutlined />} type="text" style={{ paddingLeft: 0 }}>
                        Back to FAQs
                    </Button>
                </Link>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                    <div>
                        <Title level={2} style={{ margin: 0 }}>
                            {isEditMode ? 'Edit FAQ' : 'Create FAQ'}
                        </Title>
                        <Text type="secondary">
                            {type === 'template' ? 'Create a single question and answer' : 'Create a group of FAQs'}
                        </Text>
                    </div>
                </div>
            </div>

            <Card>
                {!isEditMode && (
                    <div style={{ marginBottom: 24, textAlign: 'center' }}>
                        <Radio.Group
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            buttonStyle="solid"
                            size="large"
                        >
                            <Radio.Button value="template">
                                <Space><QuestionCircleOutlined /> Single FAQ</Space>
                            </Radio.Button>
                            <Radio.Button value="section">
                                <Space><FolderOutlined /> FAQ Section</Space>
                            </Radio.Button>
                        </Radio.Group>
                        <Divider />
                    </div>
                )}

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{ type: 'template' }}
                >
                    {type === 'template' ? (
                        <>
                            <Form.Item
                                name="question"
                                label="Question"
                                rules={[{ required: true, message: 'Please enter the question' }]}
                            >
                                <Input size="large" placeholder="e.g., What is the dress code?" />
                            </Form.Item>

                            <Form.Item
                                name="answer"
                                label="Answer"
                                rules={[{ required: true, message: 'Please enter the answer' }]}
                            >
                                <TextArea rows={4} placeholder="e.g., Smart casual attire is required..." />
                            </Form.Item>

                            <Form.Item
                                name="category"
                                label="Category"
                            >
                                <Select size="large" placeholder="Select or create a category">
                                    <Option value="General">General</Option>
                                    <Option value="Booking">Booking</Option>
                                    <Option value="Venue">Venue</Option>
                                    <Option value="Policies">Policies</Option>
                                </Select>
                            </Form.Item>
                        </>
                    ) : (
                        <>
                            <Form.Item
                                name="title"
                                label="Section Title"
                                rules={[{ required: true, message: 'Please enter a title for this section' }]}
                            >
                                <Input size="large" placeholder="e.g., General Information" />
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                            >
                                <TextArea rows={2} placeholder="Brief description of what this section covers" />
                            </Form.Item>

                            <Form.Item
                                name="items"
                                label="Select FAQs"
                                rules={[{ required: true, message: 'Please select at least one FAQ' }]}
                            >
                                <Select
                                    mode="multiple"
                                    size="large"
                                    placeholder="Select existing FAQs to add to this section"
                                    optionFilterProp="children"
                                >
                                    {availableTemplates.map(faq => (
                                        <Option key={faq.id} value={faq.id}>
                                            {faq.question}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '8px', marginBottom: '24px' }}>
                                <Text type="secondary" style={{ fontSize: '13px' }}>
                                    <QuestionCircleOutlined /> Don't see the FAQ you need?
                                    <Link to="/merchant/faqs/create?type=template" target="_blank" style={{ marginLeft: '4px' }}>
                                        Create a new template
                                    </Link>
                                </Text>
                            </div>
                        </>
                    )}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={saving}
                            icon={<SaveOutlined />}
                            style={{
                                background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                                border: 'none',
                                fontWeight: 600
                            }}
                        >
                            {isEditMode ? 'Update' : 'Create'} {type === 'template' ? 'FAQ' : 'Section'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default CreateFAQPage
