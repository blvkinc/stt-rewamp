import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  InputNumber,
  Upload,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Alert,
  Divider,
  Tag
} from 'antd'
import {
  ArrowLeftOutlined,
  UploadOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
  DollarOutlined,
  PlusOutlined,
  DeleteOutlined,
  InboxOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'


const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload

const CreateEventPage = () => {
  const { merchant, addEvent, updateEvent, events, faqs, isMerchantAuthenticated, loading: authLoading } = useMerchant()
  const { id } = useParams()
  const isEditMode = !!id
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const [images, setImages] = useState([])
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Individual Package',
      type: 'individual',
      price: '',
      guestCount: 1,
      description: '',
      includes: ['']
    }
  ])

  // Load event data if in edit mode
  React.useEffect(() => {
    if (isEditMode && events.length > 0) {
      const eventToEdit = events.find(e => e.id === parseInt(id) || e.id === id)
      if (eventToEdit) {
        form.setFieldsValue({
          title: eventToEdit.title,
          description: eventToEdit.description,
          eventType: eventToEdit.eventType,
          capacity: eventToEdit.capacity,
          // Since date/time are complex objects in AntD usually, we just leave them blank or handle them if they exist
          specialRequirements: eventToEdit.specialRequirements,
          cancellationPolicy: eventToEdit.cancellationPolicy,
          selectedFaqs: eventToEdit.selectedFaqs
        })
        setPackages(eventToEdit.packages || [])
        // Cannot easily pre-fill images due to File object requirements
      }
    }
  }, [isEditMode, id, events, form])

  if (authLoading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>
  }

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const eventTypes = [
    'Brunch',
    'Lunch',
    'Dinner',
    'High Tea',
    'Business Meeting',
    'Private Event',
    'Celebration',
    'Date Night',
    'Family Gathering',
    'Other'
  ]

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addPackage = () => {
    const newPackage = {
      id: Date.now(),
      name: '',
      type: 'individual',
      price: '',
      guestCount: 1,
      description: '',
      includes: ['']
    }
    setPackages([...packages, newPackage])
  }

  const updatePackage = (packageId, field, value) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId ? { ...pkg, [field]: value } : pkg
    ))
  }

  const removePackage = (packageId) => {
    if (packages.length > 1) {
      setPackages(packages.filter(pkg => pkg.id !== packageId))
    }
  }

  const addIncludeItem = (packageId) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId
        ? { ...pkg, includes: [...pkg.includes, ''] }
        : pkg
    ))
  }

  const updateIncludeItem = (packageId, index, value) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId
        ? {
          ...pkg,
          includes: pkg.includes.map((item, i) => i === index ? value : item)
        }
        : pkg
    ))
  }

  const removeIncludeItem = (packageId, index) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId
        ? { ...pkg, includes: pkg.includes.filter((_, i) => i !== index) }
        : pkg
    ))
  }

  const handleSubmit = async (values, isDraft = true) => {
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : '',
        startTime: values.startTime ? values.startTime.format('HH:mm') : '',
        endTime: values.endTime ? values.endTime.format('HH:mm') : '',
        packages: packages,
        status: isDraft ? 'Draft' : 'Pending Approval'
      }

      if (isEditMode) {
        updateEvent(parseInt(id) || id, payload)
        setSuccess(`Event ${isDraft ? 'saved' : 'updated'} successfully!`)
      } else {
        addEvent(payload)
        setSuccess(`Event ${isDraft ? 'saved as draft' : 'submitted for approval'} successfully!`)
      }

      setTimeout(() => {
        navigate('/merchant/events')
      }, 2000)
    } catch (err) {
      console.error(err)
      setError('Failed to save event. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Link to="/merchant/events">
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            style={{ marginBottom: '16px', padding: 0 }}
          >
            Back to Events
          </Button>
        </Link>
        <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>
          {isEditMode ? 'Edit Event' : 'Create New Event'}
        </Title>
        <Text type="secondary">{isEditMode ? 'Update your existing event details' : 'Create a new dining experience for your customers'}</Text>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => handleSubmit(values, false)}
        style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
      >
        {/* Error/Success Messages */}
        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            closable
            onClose={() => setError('')}
          />
        )}

        {success && (
          <Alert
            message={success}
            type="success"
            showIcon
            closable
            onClose={() => setSuccess('')}
          />
        )}

        {/* Basic Information */}
        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>Basic Information</Title>

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Form.Item
                label="Event Title"
                name="title"
                rules={[{ required: true, message: 'Please enter event title' }]}
              >
                <Input
                  size="large"
                  placeholder="e.g., Weekend Brunch Buffet"
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please enter event description' }]}
              >
                <TextArea
                  rows={4}
                  placeholder="Describe your event, cuisine, ambiance, and what makes it special..."
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Event Type"
                name="eventType"
                rules={[{ required: true, message: 'Please select event type' }]}
              >
                <Select
                  size="large"
                  placeholder="Select event type"
                >
                  {eventTypes.map(type => (
                    <Option key={type} value={type}>{type}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Capacity (guests)"
                name="capacity"
              >
                <InputNumber
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Maximum guests"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select date' }]}
              >
                <DatePicker
                  size="large"
                  style={{ width: '100%' }}
                  suffixIcon={<CalendarOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="Start Time"
                name="startTime"
                rules={[{ required: true, message: 'Please select start time' }]}
              >
                <TimePicker
                  size="large"
                  style={{ width: '100%' }}
                  format="HH:mm"
                  suffixIcon={<ClockCircleOutlined />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item
                label="End Time"
                name="endTime"
                rules={[{ required: true, message: 'Please select end time' }]}
              >
                <TimePicker
                  size="large"
                  style={{ width: '100%' }}
                  format="HH:mm"
                  suffixIcon={<ClockCircleOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Images */}
        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>Event Images</Title>

          <Form.Item name="images">
            <Dragger
              multiple
              accept="image/*"
              beforeUpload={() => false}
              onChange={({ fileList }) => {
                setImages(fileList.slice(0, 5).map(file => file.originFileObj))
              }}
              style={{ marginBottom: '24px' }}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined style={{ fontSize: '48px', color: '#d9d9d9' }} />
              </p>
              <p className="ant-upload-text" style={{ fontSize: '16px', fontWeight: 500 }}>
                Upload Event Images
              </p>
              <p className="ant-upload-hint">
                JPG, PNG up to 5MB each. Maximum 5 images.
              </p>
            </Dragger>
          </Form.Item>

          {images.length > 0 && (
            <Row gutter={[16, 16]}>
              {images.map((image, index) => (
                <Col key={index} xs={12} sm={8} md={6} lg={4}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Event ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '8px'
                      }}
                    />
                    <Button
                      type="primary"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        minWidth: '24px',
                        height: '24px',
                        borderRadius: '50%'
                      }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Card>

        {/* Packages */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={4} style={{ margin: 0 }}>Packages</Title>
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={addPackage}
            >
              Add Package
            </Button>
          </div>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                size="small"
                style={{ background: '#fafafa' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Title level={5} style={{ margin: 0 }}>Package {index + 1}</Title>
                  {packages.length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removePackage(pkg.id)}
                    />
                  )}
                </div>

                <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                  <Col xs={24} md={12}>
                    <Form.Item label="Package Name" required>
                      <Input
                        value={pkg.name}
                        onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                        placeholder="e.g., Individual Package"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Package Type" required>
                      <Select
                        value={pkg.type}
                        onChange={(value) => updatePackage(pkg.id, 'type', value)}
                        style={{ width: '100%' }}
                      >
                        <Option value="individual">Individual</Option>
                        <Option value="couple">Couple</Option>
                        <Option value="group">Group</Option>
                      </Select>
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Price (AED)" required>
                      <InputNumber
                        style={{ width: '100%' }}
                        value={pkg.price}
                        onChange={(value) => updatePackage(pkg.id, 'price', value)}
                        prefix={<DollarOutlined />}
                        placeholder="299"
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={24} md={12}>
                    <Form.Item label="Guest Count">
                      <InputNumber
                        style={{ width: '100%' }}
                        value={pkg.guestCount}
                        onChange={(value) => updatePackage(pkg.id, 'guestCount', value)}
                        prefix={<UserOutlined />}
                        min={1}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item label="Package Description" style={{ marginBottom: '16px' }}>
                  <TextArea
                    value={pkg.description}
                    onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                    rows={2}
                    placeholder="Brief description of what's included..."
                  />
                </Form.Item>

                <Form.Item label="What's Included">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {pkg.includes.map((item, itemIndex) => (
                      <div key={itemIndex} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Input
                          value={item}
                          onChange={(e) => updateIncludeItem(pkg.id, itemIndex, e.target.value)}
                          placeholder="e.g., Buffet access, Welcome drink"
                          style={{ flex: 1 }}
                        />
                        {pkg.includes.length > 1 && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => removeIncludeItem(pkg.id, itemIndex)}
                          />
                        )}
                      </div>
                    ))}
                    <Button
                      type="dashed"
                      icon={<PlusOutlined />}
                      onClick={() => addIncludeItem(pkg.id)}
                      style={{ width: '100%' }}
                    >
                      Add Item
                    </Button>
                  </Space>
                </Form.Item>
              </Card>
            ))}
          </Space>
        </Card>

        {/* FAQs */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <Title level={4} style={{ margin: 0 }}>Frequently Asked Questions</Title>
            <Link to="/merchant/faqs/create" target="_blank">
              <Button type="link" icon={<PlusOutlined />}>Create New FAQ</Button>
            </Link>
          </div>

          <Form.Item
            label="Select FAQ Sections or Templates"
            help="Choose FAQ sections or individual questions to display on the event page"
          >
            <Select
              mode="multiple"
              size="large"
              placeholder="Select FAQs..."
              style={{ width: '100%' }}
              optionFilterProp="children"
            >
              <Select.OptGroup label="FAQ Sections">
                {faqs.filter(f => f.type === 'section').map(section => (
                  <Option key={section.id} value={section.id}>
                    <Space>
                      <InboxOutlined /> {section.title}
                    </Space>
                  </Option>
                ))}
              </Select.OptGroup>
              <Select.OptGroup label="Individual Questions">
                {faqs.filter(f => f.type === 'template').map(faq => (
                  <Option key={faq.id} value={faq.id}>
                    <Space>
                      <QuestionCircleOutlined /> {faq.question}
                    </Space>
                  </Option>
                ))}
              </Select.OptGroup>
            </Select>
          </Form.Item>
        </Card>

        {/* Additional Information */}
        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>Additional Information</Title>

          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Form.Item
                label="Special Requirements"
                name="specialRequirements"
              >
                <TextArea
                  rows={3}
                  placeholder="Dress code, age restrictions, dietary accommodations, etc."
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Cancellation Policy"
                name="cancellationPolicy"
              >
                <TextArea
                  rows={3}
                  placeholder="Cancellation and refund policy for this event..."
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Action Buttons */}
        <Row justify="end">
          <Space>
            <Button
              size="large"
              loading={loading}
              onClick={() => {
                form.validateFields().then(values => {
                  handleSubmit(values, true);
                }).catch(info => {
                  console.log('Validate Failed:', info);
                });
              }}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              style={{
                background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                border: 'none',
                boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)',
                fontWeight: 600
              }}
            >
              {loading ? 'Submitting...' : 'Submit for Approval'}
            </Button>
          </Space>
        </Row>
      </Form>
    </div>

  )
}

export default CreateEventPage