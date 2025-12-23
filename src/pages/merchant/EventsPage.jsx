import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
  Button,
  Input,
  Select,
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Dropdown,
  Space,
  Statistic,
  Empty,
  Rate,
  Avatar
} from 'antd'
import {
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  EditOutlined,
  CopyOutlined,
  DeleteOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  MoreOutlined,
  StarFilled
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text } = Typography
const { Option } = Select

const EventsPage = () => {
  const navigate = useNavigate()
  const { merchant, events, cloneEvent, deleteEvent, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showDropdown, setShowDropdown] = useState(null)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock events data if none exist
  const mockEvents = events.length > 0 ? events : [
    {
      id: 1,
      title: "Weekend Brunch Buffet",
      description: "All-you-can-eat brunch with live cooking stations",
      status: "Published",
      date: "2024-12-15",
      time: "11:00 AM - 3:00 PM",
      price: 299,
      capacity: 50,
      bookings: 24,
      views: 156,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
      createdAt: "2024-11-01"
    },
    {
      id: 2,
      title: "Business Lunch Special",
      description: "Perfect for corporate meetings and business discussions",
      status: "Draft",
      date: "2024-12-20",
      time: "12:00 PM - 3:00 PM",
      price: 149,
      capacity: 30,
      bookings: 0,
      views: 23,
      rating: 0,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop",
      createdAt: "2024-11-15"
    },
    {
      id: 3,
      title: "Romantic Dinner Experience",
      description: "Intimate dining experience for couples",
      status: "Published",
      date: "2024-12-25",
      time: "7:00 PM - 11:00 PM",
      price: 399,
      capacity: 20,
      bookings: 15,
      views: 89,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=300&h=200&fit=crop",
      createdAt: "2024-10-20"
    }
  ]

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || event.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleCloneEvent = (eventId) => {
    cloneEvent(eventId)
    setShowDropdown(null)
  }

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(eventId)
      setShowDropdown(null)
    }
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'success'
      case 'draft':
        return 'warning'
      case 'pending approval':
        return 'processing'
      case 'rejected':
        return 'error'
      default:
        return 'default'
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
        <Col>
          <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>Events</Title>
          <Text type="secondary">Manage your dining experiences and events</Text>
        </Col>
        <Col>
          <Link to="/merchant/events/create">
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
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16}>
          <Col flex="auto">
            <Input
              size="large"
              placeholder="Search events..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col>
            <Select
              size="large"
              value={statusFilter}
              onChange={setStatusFilter}
              style={{ width: 200 }}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="published">Published</Option>
              <Option value="draft">Draft</Option>
              <Option value="pending approval">Pending Approval</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Col>
        </Row>
      </Card>

      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <Row gutter={[24, 24]}>
          {filteredEvents.map((event) => (
            <Col key={event.id} xs={24} md={12} lg={8}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative' }}>
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                      <Tag color={getStatusColor(event.status)}>
                        {event.status}
                      </Tag>
                    </div>
                    <div style={{ position: 'absolute', top: '12px', right: '12px' }}>
                      <Dropdown
                        menu={{
                          items: [
                            {
                              key: 'edit',
                              icon: <EditOutlined />,
                              label: <Link to={`/merchant/events/${event.id}/edit`}>Edit</Link>
                            },
                            {
                              key: 'clone',
                              icon: <CopyOutlined />,
                              label: 'Clone',
                              onClick: () => handleCloneEvent(event.id)
                            },
                            {
                              key: 'view',
                              icon: <EyeOutlined />,
                              label: <Link to={`/events/${event.id}`}>View Public</Link>
                            },
                            { type: 'divider' },
                            {
                              key: 'delete',
                              icon: <DeleteOutlined />,
                              label: 'Delete',
                              danger: true,
                              onClick: () => handleDeleteEvent(event.id)
                            }
                          ]
                        }}
                        trigger={['click']}
                      >
                        <Button
                          type="text"
                          icon={<MoreOutlined />}
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(8px)'
                          }}
                        />
                      </Dropdown>
                    </div>
                  </div>
                }
                actions={[
                  <Space key="date">
                    <CalendarOutlined />
                    <Text type="secondary">{event.date}</Text>
                  </Space>,
                  <Space key="price">
                    <DollarOutlined />
                    <Text type="secondary">AED {event.price}</Text>
                  </Space>
                ]}
              >
                <Card.Meta
                  title={event.title}
                  description={
                    <div>
                      <Text type="secondary" ellipsis>
                        {event.description}
                      </Text>
                      <Row gutter={16} style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f0f0f0' }}>
                        <Col span={8} style={{ textAlign: 'center' }}>
                          <Statistic
                            title="Bookings"
                            value={event.bookings}
                            styles={{ content: { fontSize: '16px', color: '#1890ff' } }}
                          />
                        </Col>
                        <Col span={8} style={{ textAlign: 'center' }}>
                          <Statistic
                            title="Views"
                            value={event.views}
                            styles={{ content: { fontSize: '16px', color: '#1890ff' } }}
                          />
                        </Col>
                        <Col span={8} style={{ textAlign: 'center' }}>
                          <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>Rating</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <StarFilled style={{ color: '#faad14', marginRight: '4px' }} />
                              <Text style={{ fontSize: '16px', color: '#1890ff', fontWeight: 'bold' }}>
                                {event.rating || 'N/A'}
                              </Text>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Empty
            image={<CalendarOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
            styles={{ image: { height: 80 } }}
            description={
              <div>
                <Title level={4}>No events found</Title>
                <Text type="secondary">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Create your first event to start attracting customers'
                  }
                </Text>
              </div>
            }
          >
            {!searchTerm && statusFilter === 'all' && (
              <Link to="/merchant/events/create">
                <Button type="primary" size="large" icon={<PlusOutlined />}>
                  Create Your First Event
                </Button>
              </Link>
            )}
          </Empty>
        </Card>
      )}
    </div>
  )
}

export default EventsPage
