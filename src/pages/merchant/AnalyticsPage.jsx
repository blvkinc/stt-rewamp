import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { 
  Card,
  Row,
  Col,
  Typography,
  Select,
  Button,
  Statistic,
  Progress,
  List,
  Avatar,
  Space,
  Tag,
  Divider
} from 'antd'
import { 
  ArrowUpOutlined,
  DollarOutlined,
  UserOutlined,
  CalendarOutlined,
  EyeOutlined,
  StarFilled,
  DownloadOutlined,
  ArrowDownOutlined,
  BarChartOutlined,
  PieChartOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text } = Typography
const { Option } = Select

const AnalyticsPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [timeRange, setTimeRange] = useState('30days')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock analytics data
  const analytics = {
    overview: {
      totalRevenue: 45680,
      revenueGrowth: 12.5,
      totalBookings: 234,
      bookingsGrowth: 8.3,
      totalViews: 12450,
      viewsGrowth: -2.1,
      avgRating: 4.6,
      ratingChange: 0.2
    },
    revenueData: [
      { month: 'Jan', revenue: 3200, bookings: 18 },
      { month: 'Feb', revenue: 3800, bookings: 22 },
      { month: 'Mar', revenue: 4200, bookings: 25 },
      { month: 'Apr', revenue: 3900, bookings: 21 },
      { month: 'May', revenue: 4800, bookings: 28 },
      { month: 'Jun', revenue: 5200, bookings: 32 },
      { month: 'Jul', revenue: 4900, bookings: 29 },
      { month: 'Aug', revenue: 5600, bookings: 35 },
      { month: 'Sep', revenue: 5100, bookings: 31 },
      { month: 'Oct', revenue: 5800, bookings: 38 },
      { month: 'Nov', revenue: 6200, bookings: 42 },
      { month: 'Dec', revenue: 4500, bookings: 28 }
    ],
    topEvents: [
      { name: 'Weekend Brunch Buffet', revenue: 12450, bookings: 45, views: 1250, rating: 4.8 },
      { name: 'Business Lunch Special', revenue: 8900, bookings: 32, views: 890, rating: 4.5 },
      { name: 'Romantic Dinner', revenue: 15600, bookings: 28, views: 1100, rating: 4.9 },
      { name: 'Family Gathering', revenue: 6700, bookings: 22, views: 650, rating: 4.4 },
      { name: 'High Tea Experience', revenue: 4200, bookings: 18, views: 420, rating: 4.6 }
    ],
    customerDemographics: {
      ageGroups: [
        { range: '18-25', percentage: 15, count: 35 },
        { range: '26-35', percentage: 35, count: 82 },
        { range: '36-45', percentage: 28, count: 66 },
        { range: '46-55', percentage: 15, count: 35 },
        { range: '55+', percentage: 7, count: 16 }
      ],
      bookingTypes: [
        { type: 'Individual', percentage: 25, count: 59 },
        { type: 'Couple', percentage: 45, count: 105 },
        { type: 'Group', percentage: 30, count: 70 }
      ]
    },
    peakTimes: [
      { time: '11:00 AM', bookings: 25 },
      { time: '12:00 PM', bookings: 45 },
      { time: '1:00 PM', bookings: 38 },
      { time: '7:00 PM', bookings: 52 },
      { time: '8:00 PM', bookings: 41 },
      { time: '9:00 PM', bookings: 33 }
    ]
  }

  const StatCard = ({ title, value, change, icon: Icon, color = "#1890ff", prefix = "", suffix = "" }) => (
    <Card hoverable>
      <Row justify="space-between" align="middle">
        <Col>
          <Statistic
            title={title}
            value={`${prefix}${value}${suffix}`}
            valueStyle={{ color: '#262626', fontSize: '28px', fontWeight: 'bold' }}
            suffix={
              change !== undefined && (
                <div style={{ fontSize: '14px', marginTop: '8px' }}>
                  <Space>
                    {change >= 0 ? (
                      <ArrowUpOutlined style={{ color: '#52c41a' }} />
                    ) : (
                      <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                    )}
                    <Text type={change >= 0 ? 'success' : 'danger'} strong>
                      {Math.abs(change)}%
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>vs last period</Text>
                  </Space>
                </div>
              )
            }
          />
        </Col>
        <Col>
          <Avatar
            size={48}
            style={{ backgroundColor: color }}
            icon={<Icon />}
          />
        </Col>
      </Row>
    </Card>
  )

  const exportReport = () => {
    alert('Analytics report exported successfully!')
  }

  return (
    <MerchantLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
          <Col>
            <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>Analytics</Title>
            <Text type="secondary">Track your performance and business insights</Text>
          </Col>
          <Col>
            <Space>
              <Select
                value={timeRange}
                onChange={setTimeRange}
                style={{ width: 150 }}
              >
                <Option value="7days">Last 7 days</Option>
                <Option value="30days">Last 30 days</Option>
                <Option value="90days">Last 90 days</Option>
                <Option value="1year">Last year</Option>
              </Select>
              <Button 
                onClick={exportReport}
                icon={<DownloadOutlined />}
              >
                Export Report
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Overview Stats */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Revenue"
              value={analytics.overview.totalRevenue.toLocaleString()}
              change={analytics.overview.revenueGrowth}
              icon={DollarOutlined}
              color="#52c41a"
              prefix="AED "
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Bookings"
              value={analytics.overview.totalBookings}
              change={analytics.overview.bookingsGrowth}
              icon={CalendarOutlined}
              color="#722ed1"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Profile Views"
              value={analytics.overview.totalViews.toLocaleString()}
              change={analytics.overview.viewsGrowth}
              icon={EyeOutlined}
              color="#1890ff"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Average Rating"
              value={analytics.overview.avgRating}
              change={analytics.overview.ratingChange > 0 ? analytics.overview.ratingChange * 10 : undefined}
              icon={StarFilled}
              color="#faad14"
            />
          </Col>
        </Row>

        {/* Revenue Chart */}
        <Row gutter={[32, 32]} style={{ marginBottom: '32px' }}>
          <Col xs={24} lg={12}>
            <Card>
              <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Revenue Trend</Title>
                </Col>
                <Col>
                  <BarChartOutlined style={{ fontSize: '20px', color: '#8c8c8c' }} />
                </Col>
              </Row>
              
              <List
                dataSource={analytics.revenueData.slice(-6)}
                renderItem={(data) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          backgroundColor: '#1890ff', 
                          borderRadius: '50%' 
                        }} />
                      }
                      title={<Text strong>{data.month}</Text>}
                      description={`${data.bookings} bookings`}
                    />
                    <div style={{ textAlign: 'right' }}>
                      <Text strong style={{ fontSize: '16px' }}>
                        AED {data.revenue.toLocaleString()}
                      </Text>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Top Events */}
          <Col xs={24} lg={12}>
            <Card>
              <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Top Performing Events</Title>
                </Col>
                <Col>
                  <ArrowUpOutlined style={{ fontSize: '20px', color: '#8c8c8c' }} />
                </Col>
              </Row>
              
              <List
                dataSource={analytics.topEvents.slice(0, 5)}
                renderItem={(event, index) => (
                  <List.Item style={{ padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px', marginBottom: '8px' }}>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{ backgroundColor: '#1890ff' }}
                          size="small"
                        >
                          {index + 1}
                        </Avatar>
                      }
                      title={<Text strong>{event.name}</Text>}
                      description={
                        <Space>
                          <Text type="secondary">{event.bookings} bookings</Text>
                          <Text type="secondary">•</Text>
                          <Text type="secondary">{event.views} views</Text>
                        </Space>
                      }
                    />
                    <div style={{ textAlign: 'right' }}>
                      <Text strong style={{ color: '#1890ff', fontSize: '16px' }}>
                        AED {event.revenue.toLocaleString()}
                      </Text>
                      <div>
                        <Space>
                          <StarFilled style={{ color: '#faad14', fontSize: '12px' }} />
                          <Text type="secondary" style={{ fontSize: '12px' }}>{event.rating}</Text>
                        </Space>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Customer Demographics */}
        <Row gutter={[32, 32]} style={{ marginBottom: '32px' }}>
          <Col xs={24} lg={12}>
            <Card>
              <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Customer Age Groups</Title>
                </Col>
                <Col>
                  <PieChartOutlined style={{ fontSize: '20px', color: '#8c8c8c' }} />
                </Col>
              </Row>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {analytics.customerDemographics.ageGroups.map((group) => (
                  <Row key={group.range} justify="space-between" align="middle">
                    <Col>
                      <Space>
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          backgroundColor: '#1890ff', 
                          borderRadius: '50%' 
                        }} />
                        <Text strong>{group.range} years</Text>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <Progress
                          percent={group.percentage}
                          size="small"
                          style={{ width: '100px' }}
                          showInfo={false}
                        />
                        <Text strong style={{ width: '40px', textAlign: 'right' }}>
                          {group.percentage}%
                        </Text>
                      </Space>
                    </Col>
                  </Row>
                ))}
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card>
              <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Booking Types</Title>
                </Col>
                <Col>
                  <UserOutlined style={{ fontSize: '20px', color: '#8c8c8c' }} />
                </Col>
              </Row>
              
              <Row gutter={[16, 16]} justify="space-around">
                {analytics.customerDemographics.bookingTypes.map((type) => (
                  <Col key={type.type} span={8} style={{ textAlign: 'center' }}>
                    <Avatar
                      size={64}
                      style={{ 
                        backgroundColor: '#1890ff',
                        marginBottom: '12px',
                        fontSize: '18px',
                        fontWeight: 'bold'
                      }}
                    >
                      {type.percentage}%
                    </Avatar>
                    <div>
                      <Text strong style={{ display: 'block' }}>{type.type}</Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        {type.count} bookings
                      </Text>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>

        {/* Peak Times */}
        <Card style={{ marginBottom: '32px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
            <Col>
              <Title level={4} style={{ margin: 0 }}>Peak Booking Times</Title>
            </Col>
            <Col>
              <BarChartOutlined style={{ fontSize: '20px', color: '#8c8c8c' }} />
            </Col>
          </Row>
          
          <Row gutter={[16, 16]}>
            {analytics.peakTimes.map((time) => (
              <Col key={time.time} xs={12} sm={8} md={6} lg={4}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fafafa' }}>
                  <Text strong style={{ display: 'block', marginBottom: '4px' }}>
                    {time.time}
                  </Text>
                  <Text style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: '#1890ff',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    {time.bookings}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    bookings
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </Card>

        {/* Insights */}
        <Card>
          <Title level={4} style={{ marginBottom: '24px' }}>Key Insights</Title>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card 
                size="small" 
                style={{ 
                  backgroundColor: '#f6ffed', 
                  border: '1px solid #b7eb8f' 
                }}
              >
                <Space style={{ marginBottom: '12px' }}>
                  <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
                  <Text strong style={{ color: '#389e0d' }}>Revenue Growth</Text>
                </Space>
                <Text style={{ color: '#52c41a', fontSize: '14px' }}>
                  Your revenue increased by 12.5% compared to last period. Weekend brunches are your top performer.
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card 
                size="small" 
                style={{ 
                  backgroundColor: '#f0f5ff', 
                  border: '1px solid #91d5ff' 
                }}
              >
                <Space style={{ marginBottom: '12px' }}>
                  <UserOutlined style={{ color: '#1890ff', fontSize: '16px' }} />
                  <Text strong style={{ color: '#096dd9' }}>Customer Preference</Text>
                </Space>
                <Text style={{ color: '#1890ff', fontSize: '14px' }}>
                  Couple bookings make up 45% of your reservations. Consider creating more romantic packages.
                </Text>
              </Card>
            </Col>

            <Col xs={24} md={8}>
              <Card 
                size="small" 
                style={{ 
                  backgroundColor: '#fffbe6', 
                  border: '1px solid #ffe58f' 
                }}
              >
                <Space style={{ marginBottom: '12px' }}>
                  <StarFilled style={{ color: '#faad14', fontSize: '16px' }} />
                  <Text strong style={{ color: '#d48806' }}>Rating Improvement</Text>
                </Space>
                <Text style={{ color: '#faad14', fontSize: '14px' }}>
                  Your average rating improved to 4.6. Keep focusing on service quality to reach 4.8+.
                </Text>
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
    </MerchantLayout>
  )
}

export default AnalyticsPage