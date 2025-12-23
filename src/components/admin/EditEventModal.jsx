import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, DatePicker, InputNumber, Button, Row, Col, Space, Typography, App } from 'antd'
import { CalendarOutlined, EnvironmentOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input

const EditEventModal = ({ isOpen, onClose, event, onSave }) => {
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const { message } = App.useApp()

    const categories = [
        'Nightlife', 'Dining', 'Concert', 'Sports', 'Cultural', 'Business'
    ]

    const statuses = [
        { value: 'upcoming', label: 'Upcoming' },
        { value: 'ongoing', label: 'Ongoing' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' }
    ]

    useEffect(() => {
        if (isOpen && event) {
            form.setFieldsValue({
                ...event,
                date: event.date ? dayjs(event.date) : null,
            })
        } else {
            form.resetFields()
        }
    }, [isOpen, event, form])

    const handleFinish = async (values) => {
        setLoading(true)
        try {
            const formattedValues = {
                ...values,
                date: values.date ? values.date.toISOString() : null
            }
            await onSave(formattedValues)
            message.success('Event updated successfully!')
            onClose()
        } catch (err) {
            message.error('Failed to update event. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title={
                <div style={{ paddingBottom: 8, borderBottom: '1px solid #f0f0f0' }}>
                    <Title level={4} style={{ margin: 0 }}>Edit Event</Title>
                    <Text type="secondary" style={{ fontSize: 13 }}>Update event details</Text>
                </div>
            }
            open={isOpen}
            onCancel={onClose}
            footer={null}
            width={720}
            centered
            destroyOnClose
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                initialValues={{}}
                style={{ marginTop: 24 }}
            >
                <Form.Item
                    name="title"
                    label="Event Title"
                    rules={[{ required: true, message: 'Please enter event title' }]}
                >
                    <Input size="large" placeholder="Event Name" />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[{ required: true, message: 'Please select category' }]}
                        >
                            <Select placeholder="Select category" size="large">
                                {categories.map(c => <Option key={c} value={c}>{c}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="status"
                            label="Status"
                        >
                            <Select placeholder="Select status" size="large">
                                {statuses.map(s => <Option key={s.value} value={s.value}>{s.label}</Option>)}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="date"
                            label="Date & Time"
                            rules={[{ required: true, message: 'Please select date and time' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: '100%' }} size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="location"
                            label="Location"
                            rules={[{ required: true, message: 'Please enter location' }]}
                        >
                            <Input prefix={<EnvironmentOutlined />} placeholder="Venue Location" size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item
                            name="ticketPrice"
                            label="Ticket Price (AED)"
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                size="large"
                                min={0}
                                formatter={value => `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/AED\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            name="totalTickets"
                            label="Total Tickets"
                        >
                            <InputNumber style={{ width: '100%' }} size="large" min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        {/* Placeholder for specific logic if any */}
                    </Col>
                </Row>

                <Form.Item
                    name="description"
                    label="Description"
                >
                    <TextArea rows={4} placeholder="Event description..." />
                </Form.Item>

                <Form.Item
                    name="imageUrl"
                    label="Image URL"
                >
                    <Input placeholder="https://example.com/image.jpg" size="large" />
                </Form.Item>


                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, borderTop: '1px solid #f0f0f0', paddingTop: 16 }}>
                    <Button onClick={onClose} size="large">
                        Cancel
                    </Button>
                    <Button type="primary" htmlType="submit" loading={loading} className="btn-primary" size="large">
                        Save Changes
                    </Button>
                </div>
            </Form>
        </Modal>
    )
}

export default EditEventModal
