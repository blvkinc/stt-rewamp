import React, { useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Empty,
  List,
  Rate,
  Row,
  Space,
  Statistic,
  Table,
  Tabs,
  Tag,
  Typography
} from 'antd'
import {
  ArrowLeftOutlined,
  BarChartOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  EditOutlined,
  EyeOutlined,
  MessageOutlined,
  SettingOutlined,
  StarFilled,
  UserOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'

const { Title, Text } = Typography

const EventDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { merchant, events, isMerchantAuthenticated } = useMerchant()
  const [activeTab, setActiveTab] = useState('overview')

  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  const event = useMemo(
    () => events.find(e => e.id === parseInt(id, 10) || e.id === id),
    [events, id]
  )

  if (!event) {
    return (
      <div style={{ padding: '24px' }}>
        <Card>
          <Empty
            description="Event not found"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={() => navigate('/merchant/events')}>
              Back to Events
            </Button>
          </Empty>
        </Card>
      </div>
    )
  }

  const packages = Array.isArray(event.packages) ? event.packages : []
  const avgPackagePrice = packages.length
    ? Math.round(packages.reduce((sum, p) => sum + Number(p.price || 0), 0) / packages.length)
    : 0
  const revenue = Number(event.revenue || 0) || Number(event.bookings || 0) * avgPackagePrice
  const status = event.status || 'Draft'

  const statusColor = (value) => {
    switch (String(value).toLowerCase()) {
      case 'published':
      case 'active':
        return 'success'
      case 'pending approval':
      case 'pending':
        return 'processing'
      case 'rejected':
        return 'error'
      case 'draft':
        return 'warning'
      default:
        return 'default'
    }
  }

  const eventTime = event.startTime && event.endTime
    ? `${event.startTime} - ${event.endTime}`
    : (event.time || 'TBD')

  const eventDate = event.date || 'TBD'

  const recentBookings = [
    {
      id: 1,
      customerName: 'Sarah Ahmed',
      package: 'Premium Package',
      date: '2024-12-15',
      guests: 2,
      amount: 598,
      status: 'Confirmed'
    },
    {
      id: 2,
      customerName: 'Michael Johnson',
      package: 'Individual Package',
      date: '2024-12-14',
      guests: 1,
      amount: 299,
      status: 'Completed'
    },
    {
      id: 3,
      customerName: 'Fatima Al-Zahra',
      package: 'Couple Package',
      date: '2024-12-13',
      guests: 2,
      amount: 498,
      status: 'Confirmed'
    }
  ]

  const reviews = [
    {
      id: 1,
      customerName: 'John Doe',
      rating: 5,
      comment: 'Amazing experience. Excellent service and food.',
      date: '2024-12-10',
      package: 'Premium Package'
    },
    {
      id: 2,
      customerName: 'Lisa Smith',
      rating: 4,
      comment: 'Great atmosphere and delicious food.',
      date: '2024-12-08',
      package: 'Individual Package'
    }
  ]

  const bookingColumns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (value) => <Text strong>{value}</Text>
    },
    {
      title: 'Package',
      dataIndex: 'package',
      key: 'package'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Guests',
      dataIndex: 'guests',
      key: 'guests',
      render: (value) => (
        <Space>
          <UserOutlined />
          <Text>{value}</Text>
        </Space>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'right',
      render: (value) => <Text strong>AED {value}</Text>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value) => <Tag color={statusColor(value)}>{value}</Tag>
    }
  ]

  const overviewContent = (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="Event Details">
            <Descriptions column={1} size="small">
              <Descriptions.Item label="Event Type">
                {event.eventType || 'Not set'}
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {eventDate}
              </Descriptions.Item>
              <Descriptions.Item label="Time">
                {eventTime}
              </Descriptions.Item>
              <Descriptions.Item label="Capacity">
                {event.capacity ? `${event.capacity} guests` : 'Not set'}
              </Descriptions.Item>
              <Descriptions.Item label="Venue">
                {merchant?.businessName || 'Venue'}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={statusColor(status)}>{status}</Tag>
              </Descriptions.Item>
            </Descriptions>
            {event.description && (
              <>
                <Divider />
                <Text type="secondary">{event.description}</Text>
              </>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={`Packages (${packages.length})`}
            extra={
              <Button type="link" onClick={() => navigate('/merchant/packages')}>
                Manage Packages
              </Button>
            }
          >
            {packages.length === 0 ? (
              <Empty description="No packages yet" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <List
                itemLayout="vertical"
                dataSource={packages}
                renderItem={(pkg) => (
                  <List.Item key={pkg.id}>
                    <Space direction="vertical" size={4} style={{ width: '100%' }}>
                      <Space align="start" style={{ justifyContent: 'space-between', width: '100%' }}>
                        <Text strong>{pkg.name}</Text>
                        <Text strong>AED {pkg.price}</Text>
                      </Space>
                      <Text type="secondary">{pkg.description || 'No description'}</Text>
                      <Space size={8} wrap>
                        <Tag>{pkg.type || 'individual'}</Tag>
                        <Tag>{pkg.guestCount || 1} guests</Tag>
                      </Space>
                    </Space>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>
    </Space>
  )

  const bookingsContent = (
    <Card>
      <Table
        columns={bookingColumns}
        dataSource={recentBookings}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Card>
  )

  const reviewsContent = (
    <Card>
      <List
        dataSource={reviews}
        itemLayout="vertical"
        renderItem={(review) => (
          <List.Item key={review.id}>
            <Space direction="vertical" size={4} style={{ width: '100%' }}>
              <Space style={{ justifyContent: 'space-between', width: '100%' }}>
                <Text strong>{review.customerName}</Text>
                <Rate disabled value={review.rating} />
              </Space>
              <Text type="secondary">{review.package} • {review.date}</Text>
              <Text>{review.comment}</Text>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  )

  const analyticsContent = (
    <Card>
      <Empty description="Analytics dashboard coming soon" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Card>
  )

  const settingsContent = (
    <Card>
      <Empty description="Advanced settings coming soon" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    </Card>
  )

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Link to="/merchant/events">
            <Button type="text" icon={<ArrowLeftOutlined />} style={{ padding: 0 }}>
              Back to Events
            </Button>
          </Link>
          <Row justify="space-between" align="middle" style={{ marginTop: 8 }}>
            <Col>
              <Space align="center">
                <Title level={2} style={{ margin: 0 }}>{event.title}</Title>
                <Tag color={statusColor(status)}>{status}</Tag>
              </Space>
              <Space size={16} style={{ marginTop: 8 }}>
                <Space size={6}>
                  <CalendarOutlined />
                  <Text type="secondary">{eventDate}</Text>
                </Space>
                <Space size={6}>
                  <ClockCircleOutlined />
                  <Text type="secondary">{eventTime}</Text>
                </Space>
                <Space size={6}>
                  <EnvironmentOutlined />
                  <Text type="secondary">{merchant?.businessName || 'Venue'}</Text>
                </Space>
              </Space>
            </Col>
            <Col>
              <Space>
                <Button icon={<EditOutlined />} onClick={() => navigate(`/merchant/events/${event.id}/edit`)}>
                  Edit
                </Button>
                <Button type="primary" icon={<EyeOutlined />} onClick={() => navigate(`/events/${event.id}`)}>
                  View Live
                </Button>
              </Space>
            </Col>
          </Row>
        </div>

        {(status === 'Draft' || status === 'Pending Approval' || status === 'Rejected') && (
          <Alert
            type={status === 'Rejected' ? 'error' : 'warning'}
            message={status === 'Rejected' ? 'This event was rejected' : 'This event is not live yet'}
            description={status === 'Rejected'
              ? 'Update the event details and resubmit for approval.'
              : 'Complete the details and submit for approval to make it visible to customers.'}
            showIcon
          />
        )}

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title="Bookings" value={Number(event.bookings || 0)} prefix={<CalendarOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title="Revenue" value={`AED ${Number(revenue).toLocaleString()}`} prefix={<DollarOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title="Views" value={Number(event.views || 0)} prefix={<EyeOutlined />} />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic title="Avg Rating" value={Number(event.rating || 0)} prefix={<StarFilled style={{ color: '#faad14' }} />} />
            </Card>
          </Col>
        </Row>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: 'overview',
              label: (
                <Space>
                  <EyeOutlined />
                  Overview
                </Space>
              ),
              children: overviewContent
            },
            {
              key: 'bookings',
              label: (
                <Space>
                  <CalendarOutlined />
                  Bookings
                </Space>
              ),
              children: bookingsContent
            },
            {
              key: 'reviews',
              label: (
                <Space>
                  <MessageOutlined />
                  Reviews
                </Space>
              ),
              children: reviewsContent
            },
            {
              key: 'analytics',
              label: (
                <Space>
                  <BarChartOutlined />
                  Analytics
                </Space>
              ),
              children: analyticsContent
            },
            {
              key: 'settings',
              label: (
                <Space>
                  <SettingOutlined />
                  Settings
                </Space>
              ),
              children: settingsContent
            }
          ]}
        />
      </Space>
    </div>
  )
}

export default EventDetailPage
