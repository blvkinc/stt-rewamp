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
  Avatar,
  Table,
  theme
} from 'antd'
import {
  BarChartOutlined,
  CalendarOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  StarFilled,
  PlusOutlined,
  UserOutlined,
  RightOutlined,
  RiseOutlined
} from '@ant-design/icons'
import { useMerchant } from '@shared/context/MerchantContext'


const { Title, Text } = Typography

const MerchantDashboard = () => {
  const { merchant, events, isMerchantAuthenticated, loading } = useMerchant()
  const {
    token: { colorPrimary },
  } = theme.useToken()

  if (loading) {
    return <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Loading...</div>
  }

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/auth" replace />
  }

  // Redirect super admins to their dashboard
  if (merchant?.role === 'super_admin') {
    return <Navigate to="/admin/dashboard" replace />
  }

  // Mock analytics data
  const analytics = {
    totalRevenue: merchant?.totalRevenue || 124500,
    totalBookings: merchant?.totalBookings || 342,
    totalEvents: events.length || 18,
    avgRating: merchant?.rating || 4.9,
    monthlyGrowth: 22.5,
    recentBookings: [
      {
        id: 1,
        customerName: "Sarah Ahmed",
        event: "Saiana Brunch @ BeBeach",
        date: "Today, 12:30 PM",
        amount: 840,
        status: "Confirmed",
        avatar: "https://i.pravatar.cc/150?u=1"
      },
      {
        id: 2,
        customerName: "Michael Johnson",
        event: "Luxury Brunch @ Burj Al Arab",
        date: "Yesterday, 1:00 PM",
        amount: 1098,
        status: "Completed",
        avatar: "https://i.pravatar.cc/150?u=2"
      },
      {
        id: 3,
        customerName: "Fatima Al-Zahra",
        event: "Rooftop Party Experience",
        date: "Oct 24, 8:00 PM",
        amount: 796,
        status: "Pending",
        avatar: "https://i.pravatar.cc/150?u=3"
      },
      {
        id: 4,
        customerName: "John Smith",
        event: "Beach Club Brunch",
        date: "Oct 23, 9:00 PM",
        amount: 498,
        status: "Cancelled",
        avatar: "https://i.pravatar.cc/150?u=4"
      }
    ],
    topEvents: [
      {
        id: 1,
        name: "Saiana Brunch @ BeBeach",
        bookings: 64,
        revenue: 26880,
        rating: 4.9,
        growth: 25
      },
      {
        id: 2,
        name: "Luxury Brunch @ Burj",
        bookings: 42,
        revenue: 23058,
        rating: 4.8,
        growth: 15
      },
      {
        id: 3,
        name: "Rooftop Party Experience",
        bookings: 35,
        revenue: 6965,
        rating: 4.7,
        growth: 12
      }
    ]
  }

  const StatCard = ({ title, value, icon, change, color = colorPrimary, prefix = "" }) => (
    <Card
      hoverable
      style={{
        height: '100%',
        borderRadius: 16,
        border: '1px solid #f0f0f0',
        boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
      }}
      styles={{ body: { padding: 24 } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 12,
          background: `${color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {React.cloneElement(icon, { style: { fontSize: 24, color: color } })}
        </div>
        {change !== undefined && (
          <Tag color={change >= 0 ? 'success' : 'error'} style={{ borderRadius: 100, border: 'none', padding: '0 8px' }}>
            {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {Math.abs(change)}%
          </Tag>
        )}
      </div>

      <Statistic
        title={<Text type="secondary" style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.6px' }}>{title}</Text>}
        value={value}
        prefix={prefix}
        styles={{ content: { fontSize: 30, fontWeight: 700, color: '#111827' } }}
      />
    </Card>
  )

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} icon={<UserOutlined />} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'Confirmed') color = 'success';
        if (status === 'Completed') color = 'blue';
        if (status === 'Pending') color = 'warning';
        if (status === 'Cancelled') color = 'error';
        return <Tag color={color} style={{ borderRadius: 100 }}>{status}</Tag>;
      },
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
      align: 'right',
      render: (amount) => <Text strong>AED {amount}</Text>,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>

      {/* Header Section */}
      <Card
        style={{
          borderRadius: 18,
          border: '1px solid #f0f0f0',
          background: 'linear-gradient(120deg, #f7fbff 0%, #ffffff 65%)',
          boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)'
        }}
        styles={{ body: { padding: 24 } }}
      >
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <Space direction="vertical" size={6}>
              <Text type="secondary" style={{ fontSize: 13, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Overview
              </Text>
              <Title level={2} style={{ margin: 0, fontWeight: 700 }}>
                Welcome back, {merchant?.businessName || 'Merchant'}
              </Title>
              <Text type="secondary">
                Here is a clean snapshot of your events, revenue, and recent bookings.
              </Text>
            </Space>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space size={12}>
              <Link to="/analytics">
                <Button size="large">View Analytics</Button>
              </Link>
              <Link to="/events/create">
                <Button
                  type="primary"
                  size="large"
                  icon={<PlusOutlined />}
                  style={{
                    background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                    border: 'none',
                    boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)',
                    fontWeight: 600
                  }}
                >
                  Create Event
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Status Alert */}
      {merchant?.status === 'Pending Approval' && (
        <Alert
          message="Account Verification Pending"
          description="Your merchant account is currently under review. Full features will be unlocked upon approval."
          type="info"
          showIcon
          style={{ borderRadius: 12, border: '1px solid #1890ff40', background: '#e6f7ff' }}
        />
      )}

      {/* Stats Grid */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Revenue"
            value={analytics.totalRevenue.toLocaleString()}
            prefix="AED "
            icon={<DollarOutlined />}
            change={analytics.monthlyGrowth}
            color="#52c41a"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Bookings"
            value={analytics.totalBookings}
            icon={<CalendarOutlined />}
            change={8.2}
            color="#1890ff"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Total Events"
            value={analytics.totalEvents}
            icon={<BarChartOutlined />}
            change={-2.4}
            color="#722ed1"
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <StatCard
            title="Avg Rating"
            value={analytics.avgRating}
            icon={<StarFilled />}
            color="#faad14"
          />
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} xl={8}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Quick Actions</Title>}
            style={{
              borderRadius: 16,
              border: '1px solid #f0f0f0',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)'
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Link to="/events/create">
                <Button type="primary" icon={<PlusOutlined />} block>
                  Create Event
                </Button>
              </Link>
              <Link to="/packages">
                <Button icon={<BarChartOutlined />} block>
                  Manage Packages
                </Button>
              </Link>
              <Link to="/bookings">
                <Button icon={<CalendarOutlined />} block>
                  View Bookings
                </Button>
              </Link>
            </Space>
          </Card>
        </Col>
        <Col xs={24} xl={16}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Performance Snapshot</Title>}
            style={{
              borderRadius: 16,
              border: '1px solid #f0f0f0',
              boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
              height: '100%'
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Statistic
                  title="This Month Revenue"
                  value={`AED ${analytics.totalRevenue.toLocaleString()}`}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="This Month Bookings"
                  value={analytics.totalBookings}
                />
              </Col>
              <Col xs={24} md={8}>
                <Statistic
                  title="Active Events"
                  value={analytics.totalEvents}
                />
              </Col>
            </Row>
            <div style={{ marginTop: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Tag color="success" style={{ borderRadius: 999 }}>
                <ArrowUpOutlined /> {analytics.monthlyGrowth}%
              </Tag>
              <Tag color="gold" style={{ borderRadius: 999 }}>
                <StarFilled /> {analytics.avgRating}
              </Tag>
              <Tag color="processing" style={{ borderRadius: 999 }}>
                AED 8,240 next payout
              </Tag>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tables Section */}
      <Row gutter={[24, 24]}>
        {/* Recent Bookings */}
        <Col xs={24} xl={16}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Recent Bookings</Title>}
            extra={<Link to="/bookings"><Button type="link">View All <RightOutlined /></Button></Link>}
            style={{ borderRadius: 16, border: '1px solid #f0f0f0', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)' }}
            styles={{ body: { padding: 0 } }}
          >
            <Table
              columns={columns}
              dataSource={analytics.recentBookings}
              pagination={false}
              rowKey="id"
              size="middle"
            />
          </Card>
        </Col>

        {/* Top Performing Events */}
        <Col xs={24} xl={8}>
          <Card
            title={<Title level={4} style={{ margin: 0 }}>Top Events</Title>}
            style={{ borderRadius: 16, border: '1px solid #f0f0f0', boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)', height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {analytics.topEvents.map((event, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: index !== analytics.topEvents.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: index === 0 ? '#fff1b8' : index === 1 ? '#e6f7ff' : '#f5f5f5',
                      color: index === 0 ? '#faad14' : index === 1 ? '#1890ff' : '#595959',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}>
                      {index + 1}
                    </div>
                    <div>
                      <Text strong style={{ display: 'block' }}>{event.name}</Text>
                      <Space style={{ marginTop: 4 }}>
                        <StarFilled style={{ color: '#faad14', fontSize: 12 }} />
                        <Text type="secondary" style={{ fontSize: 12 }}>{event.rating}</Text>
                        <Text type="secondary" style={{ fontSize: 12 }}>- {event.bookings} bookings</Text>
                      </Space>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <Text strong style={{ display: 'block' }}>AED {event.revenue.toLocaleString()}</Text>
                    <Text type="success" style={{ fontSize: 12 }}><RiseOutlined /> {event.growth}%</Text>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/events">
              <Button type="dashed" block style={{ marginTop: 16 }} icon={<PlusOutlined />}>
                Manage Events
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Space>

  )
}

export default MerchantDashboard

