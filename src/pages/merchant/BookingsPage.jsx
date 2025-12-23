import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Card,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Statistic,
  Space,
  Avatar
} from 'antd'
import {
  SearchOutlined,
  FilterOutlined,
  CalendarOutlined,
  UserOutlined,
  DollarOutlined,
  EyeOutlined,
  DownloadOutlined,
  PhoneOutlined,
  MailOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  StarFilled
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'


const { Title, Text } = Typography
const { Option } = Select

const BookingsPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dateFilter, setDateFilter] = useState('all')

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      bookingRef: 'STT-001234',
      customerName: 'Sarah Ahmed',
      customerEmail: 'sarah.ahmed@email.com',
      customerPhone: '+971 50 123 4567',
      event: 'Weekend Brunch Buffet',
      date: '2024-12-15',
      time: '11:00 AM - 3:00 PM',
      guests: 2,
      package: 'Couple Package',
      amount: 549,
      commission: 82.35,
      status: 'Confirmed',
      bookingDate: '2024-12-01',
      specialRequests: 'Window table preferred, celebrating anniversary',
      rating: null
    },
    {
      id: 2,
      bookingRef: 'STT-001235',
      customerName: 'Michael Johnson',
      customerEmail: 'michael.j@email.com',
      customerPhone: '+971 55 987 6543',
      event: 'Business Lunch Special',
      date: '2024-12-14',
      time: '12:00 PM - 3:00 PM',
      guests: 4,
      package: 'Group Package',
      amount: 596,
      commission: 89.40,
      status: 'Completed',
      bookingDate: '2024-11-28',
      specialRequests: 'Quiet area for business discussion',
      rating: 4.5
    },
    {
      id: 3,
      bookingRef: 'STT-001236',
      customerName: 'Fatima Al-Zahra',
      customerEmail: 'fatima.az@email.com',
      customerPhone: '+971 52 456 7890',
      event: 'Romantic Dinner Experience',
      date: '2024-12-20',
      time: '7:00 PM - 11:00 PM',
      guests: 2,
      package: 'Couple Package',
      amount: 798,
      commission: 119.70,
      status: 'Confirmed',
      bookingDate: '2024-12-05',
      specialRequests: 'Surprise birthday setup requested',
      rating: null
    },
    {
      id: 4,
      bookingRef: 'STT-001237',
      customerName: 'Ahmed Hassan',
      customerEmail: 'ahmed.hassan@email.com',
      customerPhone: '+971 56 234 5678',
      event: 'Weekend Brunch Buffet',
      date: '2024-12-10',
      time: '11:00 AM - 3:00 PM',
      guests: 6,
      package: 'Group Package',
      amount: 1494,
      commission: 224.10,
      status: 'Cancelled',
      bookingDate: '2024-11-25',
      specialRequests: 'High chairs needed for children',
      rating: null
    }
  ]

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookingRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.event.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || booking.status.toLowerCase() === statusFilter.toLowerCase()

    let matchesDate = true
    if (dateFilter !== 'all') {
      const bookingDate = new Date(booking.date)
      const today = new Date()

      switch (dateFilter) {
        case 'today':
          matchesDate = bookingDate.toDateString() === today.toDateString()
          break
        case 'upcoming':
          matchesDate = bookingDate >= today
          break
        case 'past':
          matchesDate = bookingDate < today
          break
      }
    }

    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success'
      case 'completed':
        return 'processing'
      case 'cancelled':
        return 'error'
      case 'pending':
        return 'warning'
      default:
        return 'default'
    }
  }

  const totalRevenue = filteredBookings.reduce((sum, booking) =>
    booking.status !== 'Cancelled' ? sum + booking.amount : sum, 0
  )

  const totalCommission = filteredBookings.reduce((sum, booking) =>
    booking.status !== 'Cancelled' ? sum + booking.commission : sum, 0
  )

  const exportBookings = () => {
    alert('Booking data exported successfully!')
  }

  const columns = [
    {
      title: 'Booking',
      dataIndex: 'bookingRef',
      key: 'bookingRef',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Booked: {new Date(record.bookingDate).toLocaleDateString()}
          </Text>
        </div>
      )
    },
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Space style={{ fontSize: '12px' }}>
            <MailOutlined />
            <Text type="secondary">{record.customerEmail}</Text>
          </Space>
          <br />
          <Space style={{ fontSize: '12px' }}>
            <PhoneOutlined />
            <Text type="secondary">{record.customerPhone}</Text>
          </Space>
        </div>
      )
    },
    {
      title: 'Event',
      dataIndex: 'event',
      key: 'event',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.package}</Text>
        </div>
      )
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      key: 'date',
      render: (text, record) => (
        <div>
          <Space style={{ marginBottom: '4px' }}>
            <CalendarOutlined style={{ color: '#1890ff' }} />
            <Text strong>{text}</Text>
          </Space>
          <br />
          <Space style={{ fontSize: '12px' }}>
            <ClockCircleOutlined />
            <Text type="secondary">{record.time}</Text>
          </Space>
        </div>
      )
    },
    {
      title: 'Guests',
      dataIndex: 'guests',
      key: 'guests',
      render: (text) => (
        <Space>
          <UserOutlined style={{ color: '#1890ff' }} />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <div>
          <Text strong style={{ color: '#1890ff' }}>AED {text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Commission: AED {record.commission}
          </Text>
        </div>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => (
        <div>
          <Tag color={getStatusColor(text)}>{text}</Tag>
          {record.rating && (
            <div style={{ marginTop: '4px' }}>
              <Space>
                <StarFilled style={{ color: '#faad14', fontSize: '12px' }} />
                <Text style={{ fontSize: '12px' }}>{record.rating}</Text>
              </Space>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Button type="text" icon={<EyeOutlined />} />
      )
    }
  ]

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
        <Col>
          <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>Bookings</Title>
          <Text type="secondary">Manage customer bookings and reservations</Text>
        </Col>
        <Col>
          <Button
            onClick={exportBookings}
            icon={<DownloadOutlined />}
          >
            Export Data
          </Button>
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Bookings"
              value={filteredBookings.length}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={`AED ${totalRevenue.toLocaleString()}`}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Commission Earned"
              value={`AED ${totalCommission.toFixed(2)}`}
              prefix={<StarFilled style={{ color: '#faad14' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Guests"
              value={filteredBookings.reduce((sum, booking) => sum + booking.guests, 0)}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input
              size="large"
              placeholder="Search bookings..."
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
              style={{ width: 150 }}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="confirmed">Confirmed</Option>
              <Option value="completed">Completed</Option>
              <Option value="cancelled">Cancelled</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Col>
          <Col>
            <Select
              size="large"
              value={dateFilter}
              onChange={setDateFilter}
              style={{ width: 150 }}
              suffixIcon={<CalendarOutlined />}
            >
              <Option value="all">All Dates</Option>
              <Option value="today">Today</Option>
              <Option value="upcoming">Upcoming</Option>
              <Option value="past">Past</Option>
            </Select>
          </Col>
          <Col>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} found
            </Text>
          </Col>
        </Row>
      </Card>

      {/* Bookings Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredBookings}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} bookings`
          }}
          locale={{
            emptyText: (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <CalendarOutlined style={{ fontSize: '64px', color: '#d9d9d9', marginBottom: '16px' }} />
                <Title level={4}>No bookings found</Title>
                <Text type="secondary">
                  {searchTerm || statusFilter !== 'all' || dateFilter !== 'all'
                    ? 'Try adjusting your search or filters'
                    : 'Your bookings will appear here once customers start making reservations'
                  }
                </Text>
              </div>
            )
          }}
        />
      </Card>
    </div>
  )
}

export default BookingsPage