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
  InboxOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'


const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload

const CreateEventPage = () => {
  const { merchant, addEvent, updateEvent, events, isMerchantAuthenticated, loading: authLoading } = useMerchant()
  const { id } = useParams()
  const isEditMode = !!id
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  if (authLoading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>
  }

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    eventType: '',
    date: '',
    startTime: '',
    endTime: '',
    capacity: '',
    images: [],
    packages: [
      {
        id: 1,
        name: 'Individual Package',
        type: 'individual',
        price: '',
        guestCount: 1,
        description: '',
        includes: ['']
      }
    ],
    tags: [],
    specialRequirements: '',
    cancellationPolicy: '',
    isDraft: true
  })

  // Load event data if in edit mode
  React.useEffect(() => {
    if (isEditMode && events.length > 0) {
      const eventToEdit = events.find(e => e.id === parseInt(id) || e.id === id)
      if (eventToEdit) {
        // Format date and times for Ant Design forms if needed, but since we use local state 'eventData',
        // we just map it directly. Note: DatePicker/TimePicker might need Moment/Dayjs objects depending on Ant version,
        // but here we are using simple state. If the original state was strings, we might need parsing.
        // Assuming context stores them as strings/ISO.
        // For simplicity in this refactor, we populate as is, validation might be needed for Date objects.
        setEventData({
          ...eventToEdit,
          packages: eventToEdit.packages || [] // Ensure packages array exists
        })
      }
    }
  }, [isEditMode, id, events])

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

  const handleInputChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    setEventData({
      ...eventData,
      images: [...eventData.images, ...files.slice(0, 5 - eventData.images.length)]
    })
  }

  const removeImage = (index) => {
    setEventData({
      ...eventData,
      images: eventData.images.filter((_, i) => i !== index)
    })
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
    setEventData({
      ...eventData,
      packages: [...eventData.packages, newPackage]
    })
  }

  const updatePackage = (packageId, field, value) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId ? { ...pkg, [field]: value } : pkg
      )
    })
  }

  const removePackage = (packageId) => {
    if (eventData.packages.length > 1) {
      setEventData({
        ...eventData,
        packages: eventData.packages.filter(pkg => pkg.id !== packageId)
      })
    }
  }

  const addIncludeItem = (packageId) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, includes: [...pkg.includes, ''] }
          : pkg
      )
    })
  }

  const updateIncludeItem = (packageId, index, value) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId
          ? {
            ...pkg,
            includes: pkg.includes.map((item, i) => i === index ? value : item)
          }
          : pkg
      )
    })
  }

  const removeIncludeItem = (packageId, index) => {
    setEventData({
      ...eventData,
      packages: eventData.packages.map(pkg =>
        pkg.id === packageId
          ? { ...pkg, includes: pkg.includes.filter((_, i) => i !== index) }
          : pkg
      )
    })
  }

  const handleSubmit = async (e, isDraft = true) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isEditMode) {
        updateEvent(parseInt(id) || id, {
          ...eventData,
          status: isDraft ? 'Draft' : 'Pending Approval'
        })
        setSuccess(`Event ${isDraft ? 'saved' : 'updated'} successfully!`)
      } else {
        addEvent({
          ...eventData,
          status: isDraft ? 'Draft' : 'Pending Approval'
        })
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
        layout="vertical"
        onFinish={(values) => handleSubmit({ preventDefault: () => { } }, true)}
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
                  value={eventData.title}
                  onChange={handleInputChange}
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
                  value={eventData.description}
                  onChange={handleInputChange}
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
                  value={eventData.eventType}
                  onChange={(value) => setEventData({ ...eventData, eventType: value })}
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
                  value={eventData.capacity}
                  onChange={(value) => setEventData({ ...eventData, capacity: value })}
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
                setEventData({
                  ...eventData,
                  images: fileList.slice(0, 5).map(file => file.originFileObj)
                })
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

          {eventData.images.length > 0 && (
            <Row gutter={[16, 16]}>
              {eventData.images.map((image, index) => (
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
            {eventData.packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                size="small"
                style={{ background: '#fafafa' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Title level={5} style={{ margin: 0 }}>Package {index + 1}</Title>
                  {eventData.packages.length > 1 && (
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
                  value={eventData.specialRequirements}
                  onChange={handleInputChange}
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
                  value={eventData.cancellationPolicy}
                  onChange={handleInputChange}
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
              onClick={(e) => handleSubmit(e, true)}
            >
              {loading ? 'Saving...' : 'Save as Draft'}
            </Button>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={(e) => handleSubmit(e, false)}
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