import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Card,
  Button,
  Statistic,
  Progress,
  Tag,
  Tabs,
  Modal,
  Typography,
  Space,
  Row,
  Col,
  Badge,
  message
} from 'antd'
import {
  EyeOutlined,
  AimOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  BarChartOutlined,
  InstagramOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkOutlined,
  StarOutlined,
  ThunderboltOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

const AdvertisingPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [activeTab, setActiveTab] = useState('internal')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock advertising data
  const internalPackages = [
    {
      id: 1,
      name: 'Featured Event',
      description: 'Highlight your event at the top of search results',
      price: 299,
      duration: '7 days',
      features: [
        'Top position in search results',
        'Featured badge on event card',
        'Priority in category listings',
        'Enhanced visibility'
      ],
      metrics: {
        impressions: 12500,
        clicks: 890,
        bookings: 23
      },
      isActive: true
    },
    {
      id: 2,
      name: 'Homepage Banner',
      description: 'Display your venue on the homepage banner',
      price: 599,
      duration: '14 days',
      features: [
        'Homepage banner placement',
        'High-resolution image display',
        'Direct link to your events',
        'Maximum exposure'
      ],
      metrics: {
        impressions: 45000,
        clicks: 2100,
        bookings: 67
      },
      isActive: false
    },
    {
      id: 3,
      name: 'Category Spotlight',
      description: 'Feature in specific category sections',
      price: 199,
      duration: '30 days',
      features: [
        'Category page prominence',
        'Spotlight badge',
        'Enhanced listing details',
        'Category-specific targeting'
      ],
      metrics: {
        impressions: 8900,
        clicks: 445,
        bookings: 18
      },
      isActive: true
    }
  ]

  const externalServices = [
    {
      id: 1,
      name: 'Social Media Management',
      description: 'Complete social media marketing across all platforms',
      price: 1299,
      duration: 'Monthly',
      features: [
        'Instagram, Facebook, Twitter management',
        'Content creation and posting',
        'Engagement management',
        'Monthly analytics report'
      ],
      platforms: ['instagram', 'facebook', 'twitter'],
      isActive: true
    },
    {
      id: 2,
      name: 'Influencer Partnerships',
      description: 'Connect with food bloggers and influencers',
      price: 2499,
      duration: 'Campaign',
      features: [
        'Influencer matching and outreach',
        'Campaign coordination',
        'Content approval process',
        'Performance tracking'
      ],
      platforms: ['instagram', 'tiktok'],
      isActive: false
    },
    {
      id: 3,
      name: 'Professional Photography',
      description: 'High-quality food and venue photography',
      price: 899,
      duration: 'One-time',
      features: [
        '4-hour photo session',
        '50+ edited high-res images',
        'Food styling included',
        'Commercial usage rights'
      ],
      platforms: [],
      isActive: false
    }
  ]

  const currentCampaigns = [
    {
      id: 1,
      name: 'Weekend Brunch Promotion',
      type: 'Featured Event',
      startDate: '2024-12-01',
      endDate: '2024-12-07',
      budget: 299,
      spent: 156,
      impressions: 8900,
      clicks: 234,
      bookings: 12,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Holiday Special Campaign',
      type: 'Social Media Management',
      startDate: '2024-12-01',
      endDate: '2024-12-31',
      budget: 1299,
      spent: 432,
      impressions: 25600,
      clicks: 1200,
      bookings: 45,
      status: 'Active'
    }
  ]

  const toggleCampaign = (id) => {
    message.success(`Campaign ${id} status toggled!`)
  }

  const purchasePackage = (packageId, type) => {
    Modal.confirm({
      title: 'Purchase Package',
      content: `Are you sure you want to purchase this ${type} package?`,
      okText: 'Purchase',
      cancelText: 'Cancel',
      onOk() {
        message.success(`Purchasing ${type} package ${packageId}. Redirecting to payment...`)
      }
    })
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'instagram': return <InstagramOutlined />
      case 'facebook': return <FacebookOutlined />
      case 'twitter': return <TwitterOutlined />
      default: return <LinkOutlined />
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={1} style={{ margin: 0, marginBottom: '8px' }}>Advertising</Title>
        <Text type="secondary">Boost your visibility and reach more customers</Text>
      </div>

      {/* Performance Overview */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Impressions"
              value={67.4}
              suffix="K"
              prefix={<EyeOutlined style={{ color: '#667eea' }} />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Click-through Rate"
              value={3.2}
              suffix="%"
              prefix={<AimOutlined style={{ color: '#f093fb' }} />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Ad Spend"
              value={588}
              prefix={<DollarOutlined style={{ color: '#667eea' }} />}
              suffix="AED"
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Bookings from Ads"
              value={57}
              prefix={<ArrowUpOutlined style={{ color: '#f093fb' }} />}
              valueStyle={{ color: '#1f2937' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Current Campaigns */}
      <Card style={{ marginBottom: '32px' }}>
        <Title level={3} style={{ marginBottom: '24px' }}>Active Campaigns</Title>

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {currentCampaigns.map((campaign) => (
            <Card
              key={campaign.id}
              style={{
                background: '#fafafa',
                borderRadius: '12px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: '300px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <Title level={4} style={{ margin: 0 }}>{campaign.name}</Title>
                    <Tag color="green">{campaign.status}</Tag>
                  </div>

                  <Paragraph type="secondary" style={{ marginBottom: '16px' }}>
                    {campaign.type}
                  </Paragraph>

                  <Row gutter={[16, 8]} style={{ marginBottom: '16px' }}>
                    <Col xs={24} sm={12} md={8} lg={4}>
                      <Text type="secondary">Duration:</Text>
                      <div>
                        <Text strong>
                          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                        </Text>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Text type="secondary">Budget:</Text>
                      <div>
                        <Text strong>AED {campaign.budget}</Text>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Text type="secondary">Impressions:</Text>
                      <div>
                        <Text strong>{campaign.impressions.toLocaleString()}</Text>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Text type="secondary">Clicks:</Text>
                      <div>
                        <Text strong>{campaign.clicks}</Text>
                      </div>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={4}>
                      <Text type="secondary">Bookings:</Text>
                      <div>
                        <Text strong>{campaign.bookings}</Text>
                      </div>
                    </Col>
                  </Row>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Text type="secondary">Budget Used</Text>
                      <Text>{Math.round((campaign.spent / campaign.budget) * 100)}%</Text>
                    </div>
                    <Progress
                      percent={Math.round((campaign.spent / campaign.budget) * 100)}
                      strokeColor={{
                        '0%': '#667eea',
                        '100%': '#764ba2',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Button
                    type="text"
                    icon={campaign.status === 'Active' ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                    onClick={() => toggleCampaign(campaign.id)}
                  />

                  <Button
                    type="text"
                    icon={<BarChartOutlined />}
                  />
                </div>
              </div>
            </Card>
          ))}
        </Space>
      </Card>

      {/* Advertising Packages */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          size="large"
          style={{ marginBottom: '24px' }}
        >
          <TabPane tab="Platform Advertising" key="internal">

            <div style={{ marginBottom: '24px' }}>
              <Title level={3} style={{ marginBottom: '8px' }}>Platform Advertising Packages</Title>
              <Text type="secondary">Boost your visibility within the Set The Table platform</Text>
            </div>

            <Row gutter={[24, 24]}>
              {internalPackages.map((pkg) => (
                <Col xs={24} md={12} lg={8} key={pkg.id}>
                  <Card
                    style={{
                      height: '100%',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    hoverable
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Title level={4} style={{ margin: 0 }}>{pkg.name}</Title>
                      {pkg.isActive && <Badge status="success" text="Active" />}
                    </div>

                    <Paragraph type="secondary" style={{ marginBottom: '24px' }}>
                      {pkg.description}
                    </Paragraph>

                    <div style={{ marginBottom: '24px' }}>
                      <Title level={2} style={{ color: '#667eea', margin: 0, marginBottom: '4px' }}>
                        AED {pkg.price}
                      </Title>
                      <Text type="secondary">{pkg.duration}</Text>
                    </div>

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                      {pkg.features.map((feature, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#667eea',
                            borderRadius: '50%',
                            marginRight: '12px'
                          }}></div>
                          <Text>{feature}</Text>
                        </li>
                      ))}
                    </ul>

                    {pkg.isActive && (
                      <Card
                        size="small"
                        style={{
                          marginBottom: '24px',
                          background: '#e6f7ff',
                          border: '1px solid #91d5ff'
                        }}
                      >
                        <Title level={5} style={{ color: '#1890ff', marginBottom: '12px' }}>
                          Current Performance
                        </Title>
                        <Row gutter={8}>
                          <Col span={8} style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                              {pkg.metrics.impressions.toLocaleString()}
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>Impressions</Text>
                          </Col>
                          <Col span={8} style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                              {pkg.metrics.clicks}
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>Clicks</Text>
                          </Col>
                          <Col span={8} style={{ textAlign: 'center' }}>
                            <div style={{ fontWeight: 'bold', color: '#1890ff' }}>
                              {pkg.metrics.bookings}
                            </div>
                            <Text type="secondary" style={{ fontSize: '12px' }}>Bookings</Text>
                          </Col>
                        </Row>
                      </Card>
                    )}

                    <Button
                      type={pkg.isActive ? "default" : "primary"}
                      size="large"
                      block
                      disabled={pkg.isActive}
                      onClick={() => purchasePackage(pkg.id, 'internal')}
                      style={!pkg.isActive ? {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      } : {}}
                    >
                      {pkg.isActive ? 'Currently Active' : 'Purchase Package'}
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>

          <TabPane tab="Marketing Services" key="external">

            <div style={{ marginBottom: '24px' }}>
              <Title level={3} style={{ marginBottom: '8px' }}>Marketing Services</Title>
              <Text type="secondary">Professional marketing services to grow your brand</Text>
            </div>

            <Row gutter={[24, 24]}>
              {externalServices.map((service) => (
                <Col xs={24} md={12} lg={8} key={service.id}>
                  <Card
                    style={{
                      height: '100%',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                    hoverable
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Title level={4} style={{ margin: 0 }}>{service.name}</Title>
                      {service.isActive && <Badge status="success" text="Active" />}
                    </div>

                    <Paragraph type="secondary" style={{ marginBottom: '24px' }}>
                      {service.description}
                    </Paragraph>

                    <div style={{ marginBottom: '24px' }}>
                      <Title level={2} style={{ color: '#667eea', margin: 0, marginBottom: '4px' }}>
                        AED {service.price}
                      </Title>
                      <Text type="secondary">{service.duration}</Text>
                    </div>

                    {service.platforms.length > 0 && (
                      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                        {service.platforms.map((platform) => (
                          <div
                            key={platform}
                            style={{
                              width: '32px',
                              height: '32px',
                              backgroundColor: '#f5f5f5',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {getPlatformIcon(platform)}
                          </div>
                        ))}
                      </div>
                    )}

                    <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px' }}>
                      {service.features.map((feature, index) => (
                        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#667eea',
                            borderRadius: '50%',
                            marginRight: '12px'
                          }}></div>
                          <Text>{feature}</Text>
                        </li>
                      ))}
                    </ul>

                    <Button
                      type={service.isActive ? "default" : "primary"}
                      size="large"
                      block
                      disabled={service.isActive}
                      onClick={() => purchasePackage(service.id, 'external')}
                      style={!service.isActive ? {
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        border: 'none'
                      } : {}}
                    >
                      {service.isActive ? 'Currently Active' : 'Get Started'}
                    </Button>
                  </Card>
                </Col>
              ))}
            </Row>
          </TabPane>
        </Tabs>
      </Card>

      {/* Contact CTA */}
      <Card
        style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #e0e7ff 0%, #fce7f3 100%)',
          border: '1px solid #e5e7eb'
        }}
      >
        <Title level={3} style={{ marginBottom: '16px' }}>
          Need Custom Marketing Solutions?
        </Title>
        <Paragraph
          type="secondary"
          style={{
            marginBottom: '24px',
            maxWidth: '600px',
            margin: '0 auto 24px auto'
          }}
        >
          Our marketing team can create tailored advertising strategies for your venue.
          Get in touch to discuss your specific needs and goals.
        </Paragraph>
        <Button
          type="primary"
          size="large"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '8px'
          }}
        >
          Contact Marketing Team
        </Button>
      </Card>
    </div>

  )
}

export default AdvertisingPage