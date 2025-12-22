import React from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  Row, 
  Col, 
  Card, 
  Statistic, 
  Button, 
  Typography, 
  Space, 
  Tag, 
  Alert,
  List,
  Avatar,
  Rate
} from 'antd'
import {
  BarChartOutlined,
  CalendarOutlined,
  TeamOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  StarFilled,
  ClockCircleOutlined,
  PlusOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text: AntText } = Typography

const MerchantDashboard = () => {
  const { merchant, events, isMerchantAuthenticated } = useMerchant()

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Redirect super admins to their dashboard
  if (merchant?.role === 'super_admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  // Mock analytics data
  const analytics = {
    totalRevenue: merchant?.totalRevenue || 15420,
    totalBookings: merchant?.totalBookings || 89,
    totalEvents: events.length || 12,
    avgRating: merchant?.rating || 4.6,
    monthlyGrowth: 12.5,
    recentBookings: [
      {
        id: 1,
        customerName: "Sarah Ahmed",
        event: "Weekend Brunch",
        date: "2024-12-15",
        amount: 299,
        status: "Confirmed"
      },
      {
        id: 2,
        customerName: "Michael Johnson",
        event: "Business Lunch",
        date: "2024-12-14",
        amount: 149,
        status: "Completed"
      },
      {
        id: 3,
        customerName: "Fatima Al-Zahra",
        event: "Anniversary Dinner",
        date: "2024-12-13",
        amount: 399,
        status: "Confirmed"
      }
    ],
    topEvents: [
      {
        id: 1,
        name: "Weekend Brunch Buffet",
        bookings: 24,
        revenue: 7176,
        rating: 4.8
      },
      {
        id: 2,
        name: "Business Lunch Special",
        bookings: 18,
        revenue: 2682,
        rating: 4.5
      },
      {
        id: 3,
        name: "Romantic Dinner",
        bookings: 15,
        revenue: 5985,
        rating: 4.9
      }
    ]
  }

  const StatCard = ({ title, value, icon, change, color = "#1890ff" }) => (
    <Card hoverable style={{ borderRadius: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <Statistic
            title={title}
            value={value}
            valueStyle={{ color: '#262626', fontSize: '2rem', fontWeight: 'bold' }}
            suffix={change && (
              <div style={{ fontSize: '0.875rem', marginTop: 8 }}>
                <Space>
                  <ArrowUpOutlined style={{ color: '#52c41a' }} />
                  <AntText type="success">+{change}%</AntText>
                  <AntText type="secondary">vs last month</AntText>
                </Space>
              </div>
            )}
          />
        </div>
        <Avatar 
          size={48} 
          icon={icon} 
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}dd)`,
            flexShrink: 0
          }}
        />
      </div>
    </Card>
  )

  return (
    <MerchantLayout>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        {/* Header */}
        <Row justify="space-between" align="middle">
          <Col xs={24} md={16}>
            <Title level={2} style={{ marginBottom: 8 }}>
              Welcome back, {merchant?.businessName}!
            </Title>
            <AntText type="secondary" style={{ fontSize: 16 }}>
              Here's what's happening with your business today.
            </AntText>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Link to="/merchant/events/create">
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                size="large"
                style={{ borderRadius: 8 }}
              >
                Create Event
              </Button>
            </Link>
          </Col>
        </Row>

        {/* Status Alert */}
        {merchant?.status === 'Pending Approval' && (
          <Alert
            message="Application Under Review"
            description="Your venue application is being reviewed. You'll be notified once approved."
            type="warning"
            icon={<ClockCircleOutlined />}
            showIcon
            style={{ borderRadius: 12 }}
          />
        )}

        {/* Stats Grid */}
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Revenue"
              value={`AED ${analytics.totalRevenue.toLocaleString()}`}
              icon={<DollarOutlined />}
              change={analytics.monthlyGrowth}
              color="#1890ff"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Total Bookings"
              value={analytics.totalBookings}
              icon={<CalendarOutlined />}
              change={8.2}
              color="#722ed1"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Active Events"
              value={analytics.totalEvents}
              icon={<BarChartOutlined />}
              color="#1890ff"
            />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <StatCard
              title="Average Rating"
              value={analytics.avgRating}
              icon={<StarFilled />}
              color="#faad14"
            />
          </Col>
        </Row>

        {/* Charts and Tables */}
        <Row gutter={[24, 24]}>
          {/* Recent Bookings */}
          <Col xs={24} lg={12}>
            <Card title="Recent Bookings" extra={<Button type="link">View All</Button>}>
              <List
                dataSource={analytics.recentBookings}
                renderItem={(booking) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} style={{ backgroundColor: '#e6f7ff' }} />}
                      title={booking.customerName}
                      description={
                        <div>
                          <AntText type="secondary">{booking.event}</AntText>
                          <br />
                          <AntText type="secondary" style={{ fontSize: 12 }}>{booking.date}</AntText>
                        </div>
                      }
                    />
                    <div style={{ textAlign: 'right' }}>
                      <Title level={5} style={{ margin: 0, color: '#1890ff' }}>
                        AED {booking.amount}
                      </Title>
                      <Tag color={booking.status === 'Confirmed' ? 'success' : 'processing'}>
                        {booking.status}
                      </Tag>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>

          {/* Top Performing Events */}
          <Col xs={24} lg={12}>
            <Card title="Top Performing Events" extra={<Button type="link">View All</Button>}>
              <List
                dataSource={analytics.topEvents}
                renderItem={(event, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar 
                          style={{ 
                            backgroundColor: '#1890ff',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        >
                          {index + 1}
                        </Avatar>
                      }
                      title={event.name}
                      description={
                        <Space>
                          <AntText type="secondary">{event.bookings} bookings</AntText>
                          <Rate disabled defaultValue={1} count={1} style={{ fontSize: 14 }} />
                          <AntText type="secondary">{event.rating}</AntText>
                        </Space>
                      }
                    />
                    <Title level={5} style={{ margin: 0, color: '#1890ff' }}>
                      AED {event.revenue.toLocaleString()}
                    </Title>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        {/* Quick Actions */}
        <Card title="Quick Actions">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Link to="/merchant/events/create">
                <Card 
                  hoverable 
                  style={{ textAlign: 'center', borderRadius: 12 }}
                  styles={{ body: { padding: 24 } }}
                >
                  <Avatar 
                    size={48} 
                    icon={<PlusOutlined />} 
                    style={{ 
                      backgroundColor: '#1890ff',
                      marginBottom: 16
                    }}
                  />
                  <Title level={4} style={{ marginBottom: 8 }}>Create New Event</Title>
                  <AntText type="secondary">Add a new dining experience</AntText>
                </Card>
              </Link>
            </Col>
            <Col xs={24} md={8}>
              <Link to="/merchant/analytics">
                <Card 
                  hoverable 
                  style={{ textAlign: 'center', borderRadius: 12 }}
                  styles={{ body: { padding: 24 } }}
                >
                  <Avatar 
                    size={48} 
                    icon={<BarChartOutlined />} 
                    style={{ 
                      backgroundColor: '#722ed1',
                      marginBottom: 16
                    }}
                  />
                  <Title level={4} style={{ marginBottom: 8 }}>View Analytics</Title>
                  <AntText type="secondary">Track your performance</AntText>
                </Card>
              </Link>
            </Col>
            <Col xs={24} md={8}>
              <Link to="/merchant/packages/create">
                <Card 
                  hoverable 
                  style={{ textAlign: 'center', borderRadius: 12 }}
                  styles={{ body: { padding: 24 } }}
                >
                  <Avatar 
                    size={48} 
                    icon={<ArrowUpOutlined />} 
                    style={{ 
                      backgroundColor: '#52c41a',
                      marginBottom: 16
                    }}
                  />
                  <Title level={4} style={{ marginBottom: 8 }}>Create Package</Title>
                  <AntText type="secondary">Build custom packages</AntText>
                </Card>
              </Link>
            </Col>
          </Row>
        </Card>
      </Space>
    </MerchantLayout>
  )
}

export default MerchantDashboard