import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Card,
  Button,
  Form,
  Input,
  Switch,
  Alert,
  Typography,
  Space,
  Row,
  Col,
  Menu,
  message
} from 'antd'
import {
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
  BellOutlined,
  SafetyOutlined,
  GlobalOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SaveOutlined,
  EyeOutlined,
  EyeInvisibleOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Password } = Input

const SettingsPage = () => {
  const { merchant, updateMerchant, isMerchantAuthenticated } = useMerchant()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [alertMessage, setAlertMessage] = useState({ type: '', text: '' })
  const [profileForm] = Form.useForm()
  const [venueForm] = Form.useForm()
  const [bankingForm] = Form.useForm()
  const [securityForm] = Form.useForm()

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [formData, setFormData] = useState({
    // Profile
    businessName: merchant?.businessName || '',
    email: merchant?.email || '',
    phone: merchant?.phone || '',
    website: '',
    description: '',

    // Venue
    venueName: '',
    address: '',
    city: 'Dubai',
    capacity: '',

    // Banking
    bankName: '',
    accountNumber: '',
    iban: '',

    // Notifications
    emailBookings: true,
    emailPromotions: false,
    smsReminders: true,
    pushNotifications: true,

    // Security
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleSave = async (section, values) => {
    setLoading(true)
    setAlertMessage({ type: '', text: '' })

    try {
      // Mock save functionality
      await new Promise(resolve => setTimeout(resolve, 1000))

      if (section === 'profile') {
        updateMerchant({
          businessName: values.businessName,
          email: values.email,
          phone: values.phone
        })
      }

      setAlertMessage({ type: 'success', text: `${section} settings saved successfully!` })
      message.success(`${section} settings saved successfully!`)
    } catch (error) {
      setAlertMessage({ type: 'error', text: 'Failed to save settings. Please try again.' })
      message.error('Failed to save settings. Please try again.')
    }

    setLoading(false)
  }

  const menuItems = [
    { key: 'profile', label: 'Profile', icon: <UserOutlined /> },
    { key: 'venue', label: 'Venue', icon: <HomeOutlined /> },
    { key: 'banking', label: 'Banking', icon: <CreditCardOutlined /> },
    { key: 'notifications', label: 'Notifications', icon: <BellOutlined /> },
    { key: 'security', label: 'Security', icon: <SafetyOutlined /> }
  ]

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={1} style={{ margin: 0, marginBottom: '8px' }}>Settings</Title>
        <Text type="secondary">Manage your account and business preferences</Text>
      </div>

      {/* Message */}
      {alertMessage.text && (
        <Alert
          message={alertMessage.text}
          type={alertMessage.type}
          showIcon
          closable
          onClose={() => setAlertMessage({ type: '', text: '' })}
          style={{ marginBottom: '24px' }}
        />
      )}

      <Row gutter={24}>
        {/* Sidebar */}
        <Col xs={24} lg={6}>
          <Card>
            <Menu
              mode="vertical"
              selectedKeys={[activeTab]}
              onClick={({ key }) => setActiveTab(key)}
              items={menuItems}
              style={{ border: 'none' }}
            />
          </Card>
        </Col>

        {/* Content */}
        <Col xs={24} lg={18}>
          <Card>
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div>
                <Title level={3} style={{ marginBottom: '24px' }}>Profile Information</Title>

                <Form
                  form={profileForm}
                  layout="vertical"
                  onFinish={(values) => handleSave('profile', values)}
                  initialValues={{
                    businessName: formData.businessName,
                    email: formData.email,
                    phone: formData.phone,
                    website: formData.website,
                    description: formData.description
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="businessName"
                        label="Business Name"
                        rules={[{ required: true, message: 'Please enter business name' }]}
                      >
                        <Input
                          prefix={<HomeOutlined />}
                          placeholder="Your Business Name"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                          { required: true, message: 'Please enter email address' },
                          { type: 'email', message: 'Please enter a valid email' }
                        ]}
                      >
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="your@email.com"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please enter phone number' }]}
                      >
                        <Input
                          prefix={<PhoneOutlined />}
                          placeholder="+971 50 123 4567"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="website"
                        label="Website"
                        rules={[{ type: 'url', message: 'Please enter a valid URL' }]}
                      >
                        <Input
                          prefix={<GlobalOutlined />}
                          placeholder="https://yourwebsite.com"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="description"
                    label="Business Description"
                  >
                    <TextArea
                      rows={4}
                      placeholder="Tell customers about your business..."
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SaveOutlined />}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}

            {/* Venue Settings */}
            {activeTab === 'venue' && (
              <div>
                <Title level={3} style={{ marginBottom: '24px' }}>Venue Information</Title>

                <Form
                  form={venueForm}
                  layout="vertical"
                  onFinish={(values) => handleSave('venue', values)}
                  initialValues={{
                    venueName: formData.venueName,
                    capacity: formData.capacity,
                    address: formData.address,
                    city: formData.city
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="venueName"
                        label="Venue Name"
                        rules={[{ required: true, message: 'Please enter venue name' }]}
                      >
                        <Input placeholder="Your Venue Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="capacity"
                        label="Capacity"
                      >
                        <Input
                          type="number"
                          placeholder="Maximum guests"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: 'Please enter venue address' }]}
                  >
                    <TextArea
                      rows={3}
                      placeholder="Full venue address"
                      prefix={<EnvironmentOutlined />}
                    />
                  </Form.Item>

                  <Form.Item
                    name="city"
                    label="City"
                    rules={[{ required: true, message: 'Please enter city' }]}
                  >
                    <Input placeholder="Dubai" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SaveOutlined />}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}

            {/* Banking Settings */}
            {activeTab === 'banking' && (
              <div>
                <Title level={3} style={{ marginBottom: '24px' }}>Banking Information</Title>

                <Alert
                  message="Secure Information"
                  description="Your banking information is encrypted and secure. This is used for payment processing only."
                  type="info"
                  showIcon
                  icon={<SafetyOutlined />}
                  style={{ marginBottom: '24px' }}
                />

                <Form
                  form={bankingForm}
                  layout="vertical"
                  onFinish={(values) => handleSave('banking', values)}
                  initialValues={{
                    bankName: formData.bankName,
                    accountNumber: formData.accountNumber,
                    iban: formData.iban
                  }}
                >
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="bankName"
                        label="Bank Name"
                        rules={[{ required: true, message: 'Please enter bank name' }]}
                      >
                        <Input placeholder="Emirates NBD" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="accountNumber"
                        label="Account Number"
                        rules={[{ required: true, message: 'Please enter account number' }]}
                      >
                        <Input placeholder="Account number" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item
                    name="iban"
                    label="IBAN"
                    rules={[{ required: true, message: 'Please enter IBAN' }]}
                  >
                    <Input placeholder="AE07 0331 2345 6789 0123 456" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SaveOutlined />}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}

            {/* Notifications Settings */}
            {activeTab === 'notifications' && (
              <div>
                <Title level={3} style={{ marginBottom: '24px' }}>Notification Preferences</Title>

                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                  <Card size="small" style={{ background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                          Email Notifications for Bookings
                        </Title>
                        <Text type="secondary">Get notified when customers make new bookings</Text>
                      </div>
                      <Switch
                        checked={formData.emailBookings}
                        onChange={(checked) => setFormData({ ...formData, emailBookings: checked })}
                      />
                    </div>
                  </Card>

                  <Card size="small" style={{ background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                          Promotional Emails
                        </Title>
                        <Text type="secondary">Receive marketing tips and platform updates</Text>
                      </div>
                      <Switch
                        checked={formData.emailPromotions}
                        onChange={(checked) => setFormData({ ...formData, emailPromotions: checked })}
                      />
                    </div>
                  </Card>

                  <Card size="small" style={{ background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                          SMS Reminders
                        </Title>
                        <Text type="secondary">Get SMS alerts for important updates</Text>
                      </div>
                      <Switch
                        checked={formData.smsReminders}
                        onChange={(checked) => setFormData({ ...formData, smsReminders: checked })}
                      />
                    </div>
                  </Card>

                  <Card size="small" style={{ background: '#fafafa' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <Title level={5} style={{ margin: 0, marginBottom: '4px' }}>
                          Push Notifications
                        </Title>
                        <Text type="secondary">Receive push notifications in your browser</Text>
                      </div>
                      <Switch
                        checked={formData.pushNotifications}
                        onChange={(checked) => setFormData({ ...formData, pushNotifications: checked })}
                      />
                    </div>
                  </Card>
                </Space>

                <div style={{ marginTop: '32px' }}>
                  <Button
                    type="primary"
                    loading={loading}
                    icon={<SaveOutlined />}
                    size="large"
                    onClick={() => handleSave('notifications', formData)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      border: 'none'
                    }}
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div>
                <Title level={3} style={{ marginBottom: '24px' }}>Security Settings</Title>

                <Alert
                  message="Password Security"
                  description="Use a strong password with at least 8 characters, including numbers and special characters."
                  type="warning"
                  showIcon
                  icon={<SafetyOutlined />}
                  style={{ marginBottom: '24px' }}
                />

                <Form
                  form={securityForm}
                  layout="vertical"
                  onFinish={(values) => handleSave('security', values)}
                >
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[{ required: true, message: 'Please enter current password' }]}
                  >
                    <Password placeholder="Enter current password" />
                  </Form.Item>

                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      { required: true, message: 'Please enter new password' },
                      { min: 8, message: 'Password must be at least 8 characters' }
                    ]}
                  >
                    <Password placeholder="Enter new password" />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label="Confirm New Password"
                    dependencies={['newPassword']}
                    rules={[
                      { required: true, message: 'Please confirm new password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(new Error('Passwords do not match'))
                        },
                      }),
                    ]}
                  >
                    <Password placeholder="Confirm new password" />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SaveOutlined />}
                      size="large"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      }}
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>

  )
}

export default SettingsPage