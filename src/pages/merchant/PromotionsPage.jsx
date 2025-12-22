import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Card, 
  Button, 
  Statistic, 
  Progress, 
  Tag as AntTag, 
  Switch, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  InputNumber,
  Typography,
  Space,
  Dropdown,
  message,
  Empty,
  Row,
  Col
} from 'antd'
import { 
  PlusOutlined,
  TagOutlined,
  PercentageOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  AimOutlined,
  GiftOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const PromotionsPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [promotions, setPromotions] = useState([
    {
      id: 1,
      name: 'Weekend Special',
      type: 'percentage',
      value: 20,
      code: 'WEEKEND20',
      description: '20% off on weekend brunch bookings',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      usageLimit: 100,
      usedCount: 23,
      minAmount: 200,
      applicableEvents: ['Weekend Brunch Buffet'],
      isActive: true,
      createdAt: '2024-11-15'
    },
    {
      id: 2,
      name: 'Early Bird Discount',
      type: 'fixed',
      value: 50,
      code: 'EARLY50',
      description: 'AED 50 off for bookings made 7 days in advance',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      usageLimit: 200,
      usedCount: 67,
      minAmount: 300,
      applicableEvents: ['All Events'],
      isActive: true,
      createdAt: '2024-10-28'
    },
    {
      id: 3,
      name: 'Group Booking Deal',
      type: 'percentage',
      value: 15,
      code: 'GROUP15',
      description: '15% off for groups of 6 or more',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      usageLimit: 50,
      usedCount: 8,
      minAmount: 500,
      applicableEvents: ['Business Lunch Special', 'Family Gathering'],
      isActive: false,
      createdAt: '2024-11-20'
    }
  ])

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const [newPromotion, setNewPromotion] = useState({
    name: '',
    type: 'percentage',
    value: '',
    code: '',
    description: '',
    startDate: '',
    endDate: '',
    usageLimit: '',
    minAmount: '',
    applicableEvents: []
  })

  const [form] = Form.useForm()

  const togglePromotion = (id, checked) => {
    setPromotions(promotions.map(promo => 
      promo.id === id ? { ...promo, isActive: checked } : promo
    ))
    message.success(`Promotion ${checked ? 'activated' : 'deactivated'} successfully`)
  }

  const deletePromotion = (id) => {
    Modal.confirm({
      title: 'Delete Promotion',
      content: 'Are you sure you want to delete this promotion? This action cannot be undone.',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk() {
        setPromotions(promotions.filter(promo => promo.id !== id))
        message.success('Promotion deleted successfully')
      }
    })
  }

  const duplicatePromotion = (promo) => {
    const newPromo = {
      ...promo,
      id: Date.now(),
      name: `${promo.name} (Copy)`,
      code: `${promo.code}COPY`,
      usedCount: 0,
      isActive: false,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setPromotions([...promotions, newPromo])
    message.success('Promotion duplicated successfully')
  }

  const handleCreatePromotion = (values) => {
    const promotion = {
      ...values,
      id: Date.now(),
      usedCount: 0,
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0],
      startDate: values.dateRange[0].format('YYYY-MM-DD'),
      endDate: values.dateRange[1].format('YYYY-MM-DD')
    }
    setPromotions([...promotions, promotion])
    setShowCreateModal(false)
    form.resetFields()
    message.success('Promotion created successfully')
  }

  const getPromotionStatus = (promo) => {
    const now = new Date()
    const start = new Date(promo.startDate)
    const end = new Date(promo.endDate)
    
    if (!promo.isActive) return { status: 'Inactive', color: 'default' }
    if (now < start) return { status: 'Scheduled', color: 'blue' }
    if (now > end) return { status: 'Expired', color: 'red' }
    if (promo.usedCount >= promo.usageLimit) return { status: 'Limit Reached', color: 'orange' }
    return { status: 'Active', color: 'green' }
  }

  const getPromotionActions = (promo) => [
    {
      key: 'duplicate',
      label: 'Duplicate',
      icon: <CopyOutlined />,
      onClick: () => duplicatePromotion(promo)
    },
    {
      key: 'edit',
      label: 'Edit',
      icon: <EditOutlined />
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <DeleteOutlined />,
      danger: true,
      onClick: () => deletePromotion(promo.id)
    }
  ]

  return (
    <MerchantLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <Title level={1} style={{ margin: 0, marginBottom: '8px' }}>Promotions</Title>
            <Text type="secondary">Create and manage discounts to boost your sales</Text>
          </div>
          <Button 
            type="primary" 
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setShowCreateModal(true)}
            style={{ 
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              boxShadow: '0 4px 15px 0 rgba(116, 79, 168, 0.75)'
            }}
          >
            Create Promotion
          </Button>
        </div>

        {/* Stats Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Active Promotions"
                value={promotions.filter(p => p.isActive).length}
                prefix={<TagOutlined style={{ color: '#667eea' }} />}
                valueStyle={{ color: '#1f2937' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Total Usage"
                value={promotions.reduce((sum, p) => sum + p.usedCount, 0)}
                prefix={<UserOutlined style={{ color: '#f093fb' }} />}
                valueStyle={{ color: '#1f2937' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Avg. Discount"
                value={Math.round(promotions.reduce((sum, p) => sum + (p.type === 'percentage' ? p.value : 0), 0) / promotions.filter(p => p.type === 'percentage').length)}
                suffix="%"
                prefix={<PercentageOutlined style={{ color: '#667eea' }} />}
                valueStyle={{ color: '#1f2937' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="Success Rate"
                value={Math.round((promotions.reduce((sum, p) => sum + p.usedCount, 0) / promotions.reduce((sum, p) => sum + p.usageLimit, 0)) * 100)}
                suffix="%"
                prefix={<AimOutlined style={{ color: '#f093fb' }} />}
                valueStyle={{ color: '#1f2937' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Promotions List */}
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {promotions.map((promo) => {
            const status = getPromotionStatus(promo)
            
            return (
              <Card 
                key={promo.id}
                style={{ 
                  borderRadius: '12px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease'
                }}
                hoverable
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Title level={4} style={{ margin: 0 }}>{promo.name}</Title>
                      <AntTag color={status.color}>{status.status}</AntTag>
                    </div>
                    
                    <Paragraph type="secondary" style={{ marginBottom: '16px' }}>
                      {promo.description}
                    </Paragraph>
                    
                    <Row gutter={[16, 8]} style={{ marginBottom: '16px' }}>
                      <Col xs={12} sm={6}>
                        <Text type="secondary">Code:</Text>
                        <div>
                          <Text code strong style={{ color: '#667eea' }}>{promo.code}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Text type="secondary">Discount:</Text>
                        <div>
                          <Text strong>
                            {promo.type === 'percentage' ? `${promo.value}%` : `AED ${promo.value}`}
                          </Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Text type="secondary">Usage:</Text>
                        <div>
                          <Text strong>{promo.usedCount} / {promo.usageLimit}</Text>
                        </div>
                      </Col>
                      <Col xs={12} sm={6}>
                        <Text type="secondary">Valid Until:</Text>
                        <div>
                          <Text strong>{new Date(promo.endDate).toLocaleDateString()}</Text>
                        </div>
                      </Col>
                    </Row>
                    
                    <Progress 
                      percent={Math.round((promo.usedCount / promo.usageLimit) * 100)}
                      strokeColor={{
                        '0%': '#667eea',
                        '100%': '#764ba2',
                      }}
                      style={{ marginBottom: '8px' }}
                    />
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Switch 
                      checked={promo.isActive}
                      onChange={(checked) => togglePromotion(promo.id, checked)}
                      style={{ 
                        background: promo.isActive ? '#667eea' : undefined
                      }}
                    />
                    
                    <Dropdown 
                      menu={{ items: getPromotionActions(promo) }}
                      trigger={['click']}
                    >
                      <Button type="text" icon={<EditOutlined />} />
                    </Dropdown>
                  </div>
                </div>
              </Card>
            )
          })}
        </Space>

        {promotions.length === 0 && (
          <Card style={{ textAlign: 'center', padding: '48px 24px' }}>
            <Empty
              image={<GiftOutlined style={{ fontSize: '64px', color: '#d1d5db' }} />}
              description={
                <div>
                  <Title level={4}>No promotions yet</Title>
                  <Paragraph type="secondary">
                    Create your first promotion to attract more customers and boost sales
                  </Paragraph>
                </div>
              }
            >
              <Button 
                type="primary" 
                size="large"
                icon={<PlusOutlined />}
                onClick={() => setShowCreateModal(true)}
                style={{ 
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none'
                }}
              >
                Create Your First Promotion
              </Button>
            </Empty>
          </Card>
        )}

        {/* Create Promotion Modal */}
        <Modal
          title="Create New Promotion"
          open={showCreateModal}
          onCancel={() => {
            setShowCreateModal(false)
            form.resetFields()
          }}
          footer={null}
          width={800}
          style={{ top: 20 }}
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleCreatePromotion}
            style={{ marginTop: '24px' }}
          >
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="name"
                  label="Promotion Name"
                  rules={[{ required: true, message: 'Please enter promotion name' }]}
                >
                  <Input placeholder="Weekend Special" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  name="code"
                  label="Promo Code"
                  rules={[{ required: true, message: 'Please enter promo code' }]}
                >
                  <Input 
                    placeholder="WEEKEND20" 
                    style={{ fontFamily: 'monospace' }}
                    onChange={(e) => {
                      form.setFieldsValue({ code: e.target.value.toUpperCase() })
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="description"
              label="Description"
            >
              <TextArea 
                rows={3} 
                placeholder="Brief description of the promotion..."
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="type"
                  label="Discount Type"
                  rules={[{ required: true, message: 'Please select discount type' }]}
                  initialValue="percentage"
                >
                  <Select>
                    <Option value="percentage">Percentage</Option>
                    <Option value="fixed">Fixed Amount</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="value"
                  label="Discount Value"
                  rules={[{ required: true, message: 'Please enter discount value' }]}
                >
                  <InputNumber 
                    style={{ width: '100%' }}
                    placeholder="20"
                    min={1}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="usageLimit"
                  label="Usage Limit"
                  rules={[{ required: true, message: 'Please enter usage limit' }]}
                >
                  <InputNumber 
                    style={{ width: '100%' }}
                    placeholder="100"
                    min={1}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={16}>
                <Form.Item
                  name="dateRange"
                  label="Promotion Period"
                  rules={[{ required: true, message: 'Please select promotion period' }]}
                >
                  <RangePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={8}>
                <Form.Item
                  name="minAmount"
                  label="Minimum Amount"
                >
                  <InputNumber 
                    style={{ width: '100%' }}
                    placeholder="200"
                    min={0}
                    addonBefore="AED"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
              <Space>
                <Button onClick={() => {
                  setShowCreateModal(false)
                  form.resetFields()
                }}>
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none'
                  }}
                >
                  Create Promotion
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MerchantLayout>
  )
}

export default PromotionsPage