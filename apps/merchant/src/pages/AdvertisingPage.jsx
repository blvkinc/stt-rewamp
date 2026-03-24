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
import { useMerchant } from '@shared/context/MerchantContext'
import MerchantLayout from '../components/MerchantLayout'

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

const AdvertisingPage = () => {
  const {
    merchant,
    isMerchantAuthenticated,
    adsCampaigns: currentCampaigns,
    adsInternal: internalPackages,
    adsExternal: externalServices,
    toggleCampaignStatus,
    purchaseAdPackage
  } = useMerchant()
  const [activeTab, setActiveTab] = useState('internal')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  const handleToggleCampaign = (id) => {
    toggleCampaignStatus(id)
    message.success(`Campaign status toggled!`)
  }

  const handlePurchasePackage = (packageId, type) => {
    Modal.confirm({
      title: 'Purchase Package',
      content: `Are you sure you want to purchase this ${type} package?`,
      okText: 'Purchase',
      cancelText: 'Cancel',
      onOk() {
        purchaseAdPackage(packageId, type)
        message.success(`Purchased ${type} package!`)
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
              styles={{ content: { color: '#1f2937' } }}
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
              styles={{ content: { color: '#1f2937' } }}
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
              styles={{ content: { color: '#1f2937' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Bookings from Ads"
              value={57}
              prefix={<ArrowUpOutlined style={{ color: '#f093fb' }} />}
              styles={{ content: { color: '#1f2937' } }}
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
                    onClick={() => handleToggleCampaign(campaign.id)}
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
                      onClick={() => handlePurchasePackage(pkg.id, 'internal')}
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
                      onClick={() => handlePurchasePackage(service.id, 'external')}
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


