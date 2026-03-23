import React, { useState } from 'react'
import { Link, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
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
  Tag,
  Checkbox,
  Radio
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
import { useMerchant } from '../../shared/context/MerchantContext'
import dayjs from 'dayjs'


const { Title, Text } = Typography
const { TextArea } = Input
const { Option } = Select
const { Dragger } = Upload

const CreateEventPage = () => {
  const { merchant, addEvent, updateEvent, events, faqs, packageTemplates, isMerchantAuthenticated, loading: authLoading } = useMerchant()
  const { id } = useParams()
  const isEditMode = !!id
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const [form] = Form.useForm()

  const [images, setImages] = useState([])
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: '',
      type: 'individual',
      price: '',
      guestCount: 1,
      description: '',
      includes: [''],
      paymentMode: 'full',
      depositAmount: 0,
      defaultInventory: null,
      rules: {
        inventoryConsumption: 'per_guest',
        maxBookingsPerDate: null,
        cutoffHours: null
      },
      pricingOverrides: {
        genderEnabled: false,
        ladiesPrice: '',
        gentsPrice: '',
        kidsPrice: '',
        earlyBirdEnabled: false,
        earlyBirdDate: '',
        earlyBirdPrice: ''
      }
    }
  ])
  const [scheduleType, setScheduleType] = useState('one_time')
  const [recurrencePattern, setRecurrencePattern] = useState('weekly')
  const [recurrenceOpenEnded, setRecurrenceOpenEnded] = useState(false)
  const [templateToAdd, setTemplateToAdd] = useState('')
  const [blackoutDates, setBlackoutDates] = useState([])
  const [occurrenceOverrides, setOccurrenceOverrides] = useState([])
  const [videoUrls, setVideoUrls] = useState([''])
  const [highlightPackageId, setHighlightPackageId] = useState(null)

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
          date: eventToEdit.date ? dayjs(eventToEdit.date) : null,
          scheduleType: eventToEdit.scheduleType || 'one_time',
          recurrencePattern: eventToEdit.recurrence?.pattern || 'weekly',
          recurrenceEnd: eventToEdit.recurrence?.endDate ? dayjs(eventToEdit.recurrence.endDate) : null,
          recurrenceDays: eventToEdit.recurrence?.days || [],
          recurrenceDayOfMonth: eventToEdit.recurrence?.dayOfMonth || 1,
          recurrenceMonth: eventToEdit.recurrence?.month || 'jan',
          specialRequirements: eventToEdit.specialRequirements,
          cancellationPolicy: eventToEdit.cancellationPolicy,
          selectedFaqs: eventToEdit.selectedFaqs,
          primaryCategory: eventToEdit.primaryCategory,
          subcategories: eventToEdit.subcategories || [],
          tags: eventToEdit.tags || [],
          accessibility: eventToEdit.accessibility || '',
          seoTitle: eventToEdit.seo?.metaTitle,
          seoDescription: eventToEdit.seo?.metaDescription,
          seoSlug: eventToEdit.seo?.slug,
          seoImage: eventToEdit.seo?.ogImage,
          availabilityStatus: eventToEdit.availabilityStatus || 'open'
        })
        setScheduleType(eventToEdit.scheduleType || 'one_time')
        setRecurrencePattern(eventToEdit.recurrence?.pattern || 'weekly')
        setRecurrenceOpenEnded(Boolean(eventToEdit.recurrence?.openEnded))
        setPackages((eventToEdit.packages || []).map((pkg) => ({
          rules: {
            inventoryConsumption: 'per_guest',
            maxBookingsPerDate: null,
            cutoffHours: null,
            ...(pkg.rules || {})
          },
          ...pkg
        })))
        setImages(eventToEdit.images || [])
        setBlackoutDates(eventToEdit.blackoutDates || [])
        setOccurrenceOverrides(eventToEdit.occurrenceOverrides || [])
        setVideoUrls(eventToEdit.videos && eventToEdit.videos.length ? eventToEdit.videos : [''])
        // Cannot easily pre-fill images due to File object requirements
      }
    }
  }, [isEditMode, id, events, form])

  React.useEffect(() => {
    const params = new URLSearchParams(location.search)
    const packageId = params.get('package')
    if (packageId) {
      const numericId = parseInt(packageId, 10)
      setHighlightPackageId(Number.isNaN(numericId) ? packageId : numericId)
      setTimeout(() => {
        document.getElementById(`package-${packageId}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 200)
    }
  }, [location.search])

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

  const primaryCategories = [
    'Brunch',
    'Nightlife',
    'Dining',
    'Beach Club',
    'Business',
    'Family',
    'Wellness'
  ]

  const subcategoryOptions = [
    'Ladies Night',
    'Birthday Offer',
    'Outdoor',
    'Indoor',
    'Live Music',
    'Pool Access',
    'Rooftop'
  ]

  const readFileAsDataUrl = (file) => new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => resolve('')
    reader.readAsDataURL(file)
  })

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
      includes: [''],
      templateId: null,
      templateName: null,
      paymentMode: 'full',
      depositAmount: 0,
      defaultInventory: null,
      rules: {
        inventoryConsumption: 'per_guest',
        maxBookingsPerDate: null,
        cutoffHours: null
      },
      pricingOverrides: {
        genderEnabled: false,
        ladiesPrice: '',
        gentsPrice: '',
        kidsPrice: '',
        earlyBirdEnabled: false,
        earlyBirdDate: '',
        earlyBirdPrice: ''
      }
    }
    setPackages([...packages, newPackage])
  }

  const addPackageFromTemplate = () => {
    const selected = (packageTemplates || []).find(t => t.id === parseInt(templateToAdd, 10) || t.id === templateToAdd)
    if (!selected) return
    const templateIncludes = Array.isArray(selected.inclusions) && selected.inclusions.length > 0
      ? selected.inclusions
      : (Array.isArray(selected.features) ? selected.features : [])
    const newPackage = {
      id: Date.now(),
      name: selected.name,
      type: selected.pricingRules?.type || 'individual',
      price: selected.pricingRules?.basePrice || selected.basePrice || '',
      guestCount: selected.maxGuests || 1,
      description: selected.description || '',
      includes: templateIncludes.length > 0 ? templateIncludes : [''],
      templateId: selected.id,
      templateName: selected.name,
      paymentMode: 'full',
      depositAmount: 0,
      defaultInventory: null,
      rules: {
        inventoryConsumption: 'per_guest',
        maxBookingsPerDate: null,
        cutoffHours: null
      },
      pricingOverrides: {
        genderEnabled: false,
        ladiesPrice: '',
        gentsPrice: '',
        kidsPrice: '',
        earlyBirdEnabled: false,
        earlyBirdDate: '',
        earlyBirdPrice: ''
      }
    }
    setPackages([...packages, newPackage])
    setTemplateToAdd('')
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

  const updatePackageRule = (packageId, field, value) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId
        ? {
          ...pkg,
          rules: {
            inventoryConsumption: 'per_guest',
            maxBookingsPerDate: null,
            cutoffHours: null,
            ...(pkg.rules || {}),
            [field]: value
          }
        }
        : pkg
    ))
  }

  const updatePackageOverride = (packageId, field, value) => {
    setPackages(packages.map(pkg =>
      pkg.id === packageId
        ? {
          ...pkg,
          pricingOverrides: {
            genderEnabled: false,
            ladiesPrice: '',
            gentsPrice: '',
            kidsPrice: '',
            earlyBirdEnabled: false,
            earlyBirdDate: '',
            earlyBirdPrice: '',
            ...(pkg.pricingOverrides || {}),
            [field]: value
          }
        }
        : pkg
    ))
  }

  const addBlackoutDate = () => {
    setBlackoutDates(prev => [...prev, dayjs().format('YYYY-MM-DD')])
  }

  const updateBlackoutDate = (index, value) => {
    setBlackoutDates(prev => prev.map((date, i) => (i === index ? value : date)))
  }

  const removeBlackoutDate = (index) => {
    setBlackoutDates(prev => prev.filter((_, i) => i !== index))
  }

  const addOccurrenceOverride = () => {
    setOccurrenceOverrides(prev => ([
      ...prev,
      { id: Date.now(), date: dayjs().format('YYYY-MM-DD'), status: 'available', inventory: 0 }
    ]))
  }

  const updateOccurrenceOverride = (id, field, value) => {
    setOccurrenceOverrides(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row))
  }

  const removeOccurrenceOverride = (id) => {
    setOccurrenceOverrides(prev => prev.filter(row => row.id !== id))
  }

  const updateVideoUrl = (index, value) => {
    setVideoUrls(prev => prev.map((url, i) => (i === index ? value : url)))
  }

  const addVideoUrl = () => {
    setVideoUrls(prev => [...prev, ''])
  }

  const removeVideoUrl = (index) => {
    setVideoUrls(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (values, isDraft = true, statusOverride = '') => {
    setLoading(true)
    setError('')

    try {
      const payload = {
        ...values,
        date: values.date ? values.date.format('YYYY-MM-DD') : '',
        startTime: values.startTime ? values.startTime.format('HH:mm') : '',
        endTime: values.endTime ? values.endTime.format('HH:mm') : '',
        scheduleType: values.scheduleType || scheduleType,
        recurrence: (values.scheduleType || scheduleType) === 'recurring' ? {
          startDate: values.date ? values.date.format('YYYY-MM-DD') : '',
          endDate: recurrenceOpenEnded ? '' : (values.recurrenceEnd ? values.recurrenceEnd.format('YYYY-MM-DD') : ''),
          openEnded: recurrenceOpenEnded,
          pattern: values.recurrencePattern || recurrencePattern,
          days: values.recurrenceDays || [],
          dayOfMonth: values.recurrenceDayOfMonth || 1,
          month: values.recurrenceMonth || 'jan'
        } : null,
        packages: packages
          .filter(pkg => String(pkg.name || '').trim().length > 0)
          .map(pkg => ({
          ...pkg,
          rules: {
            inventoryConsumption: 'per_guest',
            maxBookingsPerDate: null,
            cutoffHours: null,
            ...(pkg.rules || {})
          }
        })),
        blackoutDates,
        occurrenceOverrides,
        videos: videoUrls.filter(url => url.trim().length > 0),
        primaryCategory: values.primaryCategory || values.eventType,
        subcategories: values.subcategories || [],
        tags: values.tags || [],
        accessibility: values.accessibility
          ? values.accessibility.split(',').map(item => item.trim()).filter(Boolean)
          : [],
        availabilityStatus: values.availabilityStatus || 'open',
        seo: {
          metaTitle: values.seoTitle || '',
          metaDescription: values.seoDescription || '',
          slug: values.seoSlug || '',
          ogImage: values.seoImage || ''
        },
        images: images && images.length > 0 ? images : undefined,
        image: images && images.length > 0 ? images[0] : undefined,
        status: statusOverride || (isDraft ? 'Draft' : 'Pending Approval')
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
        onValuesChange={(changedValues) => {
          if (Object.prototype.hasOwnProperty.call(changedValues, 'scheduleType')) {
            setScheduleType(changedValues.scheduleType)
          }
          if (Object.prototype.hasOwnProperty.call(changedValues, 'recurrencePattern')) {
            setRecurrencePattern(changedValues.recurrencePattern)
          }
        }}
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

            <Col xs={24} md={12}>
              <Form.Item
                label="Primary Category"
                name="primaryCategory"
                rules={[{ required: true, message: 'Please select primary category' }]}
              >
                <Select
                  size="large"
                  placeholder="Select category"
                >
                  {primaryCategories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Subcategories"
                name="subcategories"
              >
                <Select
                  mode="multiple"
                  size="large"
                  placeholder="Select subcategories"
                >
                  {subcategoryOptions.map(sub => (
                    <Option key={sub} value={sub}>{sub}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                label="Event Schedule"
                name="scheduleType"
                initialValue="one_time"
                rules={[{ required: true, message: 'Please select schedule type' }]}
              >
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  size="large"
                  style={{ width: '100%', display: 'flex' }}
                  value={scheduleType}
                  onChange={(e) => {
                    setScheduleType(e.target.value)
                    form.setFieldsValue({ scheduleType: e.target.value })
                  }}
                >
                  <Radio.Button value="one_time" style={{ flex: 1, textAlign: 'center' }}>
                    One-time
                  </Radio.Button>
                  <Radio.Button value="recurring" style={{ flex: 1, textAlign: 'center' }}>
                    Recurring
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>

            {scheduleType === 'recurring' && (
              <Col xs={24} md={12}>
                <Form.Item
                  label="Recurrence Pattern"
                  name="recurrencePattern"
                  initialValue="weekly"
                  rules={[{ required: true, message: 'Please select recurrence pattern' }]}
                >
                  <Select size="large">
                    <Option value="daily">Daily</Option>
                    <Option value="weekly">Weekly</Option>
                    <Option value="monthly">Monthly</Option>
                    <Option value="yearly">Yearly</Option>
                  </Select>
                </Form.Item>
              </Col>
            )}

            <Col xs={24} md={8}>
              <Form.Item
                label={scheduleType === 'recurring' ? 'Start Date' : 'Date'}
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

            {scheduleType === 'recurring' && (
              <>
                <Col xs={24} md={8}>
                  <Form.Item
                    label="Recurrence End"
                    name="recurrenceEnd"
                    rules={recurrenceOpenEnded ? [] : [{ required: true, message: 'Please select recurrence end date' }]}
                  >
                    <DatePicker
                      size="large"
                      style={{ width: '100%' }}
                      suffixIcon={<CalendarOutlined />}
                      disabled={recurrenceOpenEnded}
                    />
                  </Form.Item>
                  <Checkbox
                    checked={recurrenceOpenEnded}
                    onChange={(e) => setRecurrenceOpenEnded(e.target.checked)}
                  >
                    Open-ended (no end date)
                  </Checkbox>
                </Col>

                {recurrencePattern === 'weekly' && (
                  <Col xs={24} md={16}>
                    <Form.Item
                      label="Repeat Days"
                      name="recurrenceDays"
                      rules={[{ required: true, message: 'Please select recurring days' }]}
                    >
                      <Checkbox.Group
                        options={[
                          { label: 'Mon', value: 'mon' },
                          { label: 'Tue', value: 'tue' },
                          { label: 'Wed', value: 'wed' },
                          { label: 'Thu', value: 'thu' },
                          { label: 'Fri', value: 'fri' },
                          { label: 'Sat', value: 'sat' },
                          { label: 'Sun', value: 'sun' }
                        ]}
                      />
                    </Form.Item>
                  </Col>
                )}

                {recurrencePattern === 'monthly' && (
                  <Col xs={24} md={16}>
                    <Form.Item
                      label="Day of Month"
                      name="recurrenceDayOfMonth"
                      rules={[{ required: true, message: 'Please select day of month' }]}
                    >
                      <InputNumber min={1} max={31} style={{ width: '100%' }} />
                    </Form.Item>
                  </Col>
                )}

                {recurrencePattern === 'yearly' && (
                  <Col xs={24} md={16}>
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="Month"
                          name="recurrenceMonth"
                          rules={[{ required: true, message: 'Select month' }]}
                        >
                          <Select>
                            <Option value="jan">January</Option>
                            <Option value="feb">February</Option>
                            <Option value="mar">March</Option>
                            <Option value="apr">April</Option>
                            <Option value="may">May</Option>
                            <Option value="jun">June</Option>
                            <Option value="jul">July</Option>
                            <Option value="aug">August</Option>
                            <Option value="sep">September</Option>
                            <Option value="oct">October</Option>
                            <Option value="nov">November</Option>
                            <Option value="dec">December</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item
                          label="Day of Month"
                          name="recurrenceDayOfMonth"
                          rules={[{ required: true, message: 'Select day of month' }]}
                        >
                          <InputNumber min={1} max={31} style={{ width: '100%' }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                )}
              </>
            )}
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
              onChange={async ({ fileList }) => {
                const limited = fileList.slice(0, 5)
                const dataUrls = await Promise.all(
                  limited.map(file => file.originFileObj ? readFileAsDataUrl(file.originFileObj) : '')
                )
                setImages(dataUrls.filter(Boolean))
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
                      src={image}
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

          <Divider style={{ margin: '24px 0' }} />
          <Title level={5} style={{ marginBottom: '12px' }}>Video URLs</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            {videoUrls.map((url, index) => (
              <Space key={`video-${index}`} style={{ width: '100%' }}>
                <Input
                  value={url}
                  onChange={(e) => updateVideoUrl(index, e.target.value)}
                  placeholder="https://youtube.com/..."
                />
                {videoUrls.length > 1 && (
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeVideoUrl(index)} />
                )}
              </Space>
            ))}
            <Button type="dashed" icon={<PlusOutlined />} onClick={addVideoUrl}>Add Video</Button>
          </Space>
        </Card>

        {/* Packages */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: 16 }}>
            <Title level={4} style={{ margin: 0 }}>Packages</Title>
            <Space>
              <Select
                size="middle"
                placeholder="Add from template"
                value={templateToAdd || undefined}
                onChange={setTemplateToAdd}
                style={{ width: 220 }}
                allowClear
              >
                {(packageTemplates || []).map((template) => (
                  <Option key={template.id} value={template.id}>
                    {template.name}
                  </Option>
                ))}
              </Select>
              <Button onClick={addPackageFromTemplate} disabled={!templateToAdd}>
                Add Template
              </Button>
              <Link to="/merchant/packages/create" target="_blank">
                <Button type="link">New Template</Button>
              </Link>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={addPackage}
              >
                Add Package
              </Button>
            </Space>
          </div>

          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {packages.map((pkg, index) => (
              <Card
                key={pkg.id}
                size="small"
                id={`package-${pkg.id}`}
                style={{
                  background: '#fafafa',
                  border: pkg.id === highlightPackageId ? '1px solid #1890ff' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <Title level={5} style={{ margin: 0 }}>Package {index + 1}</Title>
                  {pkg.templateName && (
                    <Tag color="blue">Template: {pkg.templateName}</Tag>
                  )}
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

                <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
                  <Col xs={24} md={8}>
                    <Form.Item label="Payment Mode">
                      <Select
                        value={pkg.paymentMode || 'full'}
                        onChange={(value) => updatePackage(pkg.id, 'paymentMode', value)}
                      >
                        <Option value="full">Full</Option>
                        <Option value="deposit">Deposit</Option>
                        <Option value="no_upfront">No Upfront</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label="Deposit Amount (AED)">
                      <InputNumber
                        style={{ width: '100%' }}
                        value={pkg.depositAmount}
                        onChange={(value) => updatePackage(pkg.id, 'depositAmount', value)}
                        prefix={<DollarOutlined />}
                        min={0}
                        disabled={pkg.paymentMode !== 'deposit'}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label="Default Inventory">
                      <InputNumber
                        style={{ width: '100%' }}
                        value={pkg.defaultInventory}
                        onChange={(value) => updatePackage(pkg.id, 'defaultInventory', value)}
                        min={0}
                        placeholder="Optional"
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

                <Divider style={{ margin: '16px 0' }} />
                <Title level={5} style={{ marginBottom: '12px' }}>Event Rules</Title>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Form.Item label="Inventory Consumption">
                      <Select
                        value={pkg.rules?.inventoryConsumption || 'per_guest'}
                        onChange={(value) => updatePackageRule(pkg.id, 'inventoryConsumption', value)}
                      >
                        <Option value="per_guest">Per guest</Option>
                        <Option value="per_package">Per package</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label="Max Bookings per Date">
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        value={pkg.rules?.maxBookingsPerDate}
                        onChange={(value) => updatePackageRule(pkg.id, 'maxBookingsPerDate', value)}
                        placeholder="No limit"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item label="Booking Cutoff (hours)">
                      <InputNumber
                        style={{ width: '100%' }}
                        min={0}
                        value={pkg.rules?.cutoffHours}
                        onChange={(value) => updatePackageRule(pkg.id, 'cutoffHours', value)}
                        placeholder="e.g. 6"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider style={{ margin: '16px 0' }} />
                <Title level={5} style={{ marginBottom: '12px' }}>Pricing Overrides (Optional)</Title>
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={8}>
                    <Checkbox
                      checked={pkg.pricingOverrides?.genderEnabled}
                      onChange={(e) => updatePackageOverride(pkg.id, 'genderEnabled', e.target.checked)}
                    >
                      Enable Gender Pricing
                    </Checkbox>
                  </Col>
                  <Col xs={24} md={8}>
                    <Checkbox
                      checked={pkg.pricingOverrides?.earlyBirdEnabled}
                      onChange={(e) => updatePackageOverride(pkg.id, 'earlyBirdEnabled', e.target.checked)}
                    >
                      Enable Early Bird
                    </Checkbox>
                  </Col>
                </Row>
                {pkg.pricingOverrides?.genderEnabled && (
                  <Row gutter={[16, 16]} style={{ marginTop: 12 }}>
                    <Col xs={24} md={8}>
                      <Form.Item label="Ladies Price">
                        <InputNumber
                          style={{ width: '100%' }}
                          value={pkg.pricingOverrides?.ladiesPrice}
                          onChange={(value) => updatePackageOverride(pkg.id, 'ladiesPrice', value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item label="Gents Price">
                        <InputNumber
                          style={{ width: '100%' }}
                          value={pkg.pricingOverrides?.gentsPrice}
                          onChange={(value) => updatePackageOverride(pkg.id, 'gentsPrice', value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item label="Kids Price">
                        <InputNumber
                          style={{ width: '100%' }}
                          value={pkg.pricingOverrides?.kidsPrice}
                          onChange={(value) => updatePackageOverride(pkg.id, 'kidsPrice', value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
                {pkg.pricingOverrides?.earlyBirdEnabled && (
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <Form.Item label="Early Bird Cutoff Date">
                        <DatePicker
                          style={{ width: '100%' }}
                          value={pkg.pricingOverrides?.earlyBirdDate ? dayjs(pkg.pricingOverrides.earlyBirdDate) : null}
                          onChange={(value) => updatePackageOverride(pkg.id, 'earlyBirdDate', value ? value.format('YYYY-MM-DD') : '')}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item label="Early Bird Price">
                        <InputNumber
                          style={{ width: '100%' }}
                          value={pkg.pricingOverrides?.earlyBirdPrice}
                          onChange={(value) => updatePackageOverride(pkg.id, 'earlyBirdPrice', value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                )}
              </Card>
            ))}
          </Space>
        </Card>

        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>Availability & Overrides</Title>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} md={8}>
              <Form.Item label="Event Availability" name="availabilityStatus" initialValue="open">
                <Select>
                  <Option value="open">Open</Option>
                  <Option value="closed">Closed</Option>
                  <Option value="sold_out">Sold Out</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          <Title level={5} style={{ marginBottom: 12 }}>Blackout Dates</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            {blackoutDates.map((date, index) => (
              <Space key={`${date}-${index}`}>
                <DatePicker
                  value={date ? dayjs(date) : null}
                  onChange={(value) => updateBlackoutDate(index, value ? value.format('YYYY-MM-DD') : '')}
                />
                <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeBlackoutDate(index)} />
              </Space>
            ))}
            <Button type="dashed" icon={<PlusOutlined />} onClick={addBlackoutDate}>Add Blackout Date</Button>
          </Space>

          <Divider />
          <Title level={5} style={{ marginBottom: 12 }}>Occurrence Overrides</Title>
          <Space direction="vertical" style={{ width: '100%' }}>
            {occurrenceOverrides.map((override) => (
              <Row key={override.id} gutter={12} align="middle">
                <Col xs={24} md={6}>
                  <DatePicker
                    value={override.date ? dayjs(override.date) : null}
                    onChange={(value) => updateOccurrenceOverride(override.id, 'date', value ? value.format('YYYY-MM-DD') : '')}
                    style={{ width: '100%' }}
                  />
                </Col>
                <Col xs={24} md={6}>
                  <Select
                    value={override.status}
                    onChange={(value) => updateOccurrenceOverride(override.id, 'status', value)}
                    style={{ width: '100%' }}
                  >
                    <Option value="available">Available</Option>
                    <Option value="sold_out">Sold Out</Option>
                    <Option value="closed">Closed</Option>
                  </Select>
                </Col>
                <Col xs={24} md={6}>
                  <InputNumber
                    style={{ width: '100%' }}
                    value={override.inventory}
                    onChange={(value) => updateOccurrenceOverride(override.id, 'inventory', value)}
                    min={0}
                    placeholder="Inventory"
                  />
                </Col>
                <Col xs={24} md={4}>
                  <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeOccurrenceOverride(override.id)} />
                </Col>
              </Row>
            ))}
            <Button type="dashed" icon={<PlusOutlined />} onClick={addOccurrenceOverride}>Add Override</Button>
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

        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>SEO & Accessibility</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Form.Item label="Meta Title" name="seoTitle">
                <Input placeholder="SEO title" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Slug" name="seoSlug">
                <Input placeholder="event-slug" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Meta Description" name="seoDescription">
                <TextArea rows={3} placeholder="SEO description" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="OG Image URL" name="seoImage">
                <Input placeholder="https://example.com/og-image.jpg" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Accessibility Notes" name="accessibility">
                <TextArea rows={3} placeholder="Wheelchair access, accessible restrooms..." />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Tags" name="tags">
                <Select mode="tags" placeholder="Add tags" />
              </Form.Item>
            </Col>
          </Row>
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
              size="large"
              onClick={() => {
                form.validateFields().then(values => {
                  handleSubmit(values, false, 'Published')
                }).catch(info => {
                  console.log('Validate Failed:', info)
                })
              }}
            >
              Publish Now
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

