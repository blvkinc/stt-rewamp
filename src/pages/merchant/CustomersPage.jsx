import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import {
  Card,
  Button,
  Input,
  Select,
  Table,
  Tag,
  Avatar,
  Modal,
  Statistic,
  Typography,
  Space,
  Row,
  Col,
  Rate,
  Descriptions,

} from 'antd'
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  UserOutlined,
  StarOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text } = Typography
const { Option } = Select

const CustomersPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock customer data
  const customers = [
    {
      id: 1,
      name: "Sarah Ahmed",
      email: "sarah.ahmed@email.com",
      phone: "+971 50 123 4567",
      location: "Dubai Marina",
      totalBookings: 8,
      totalSpent: 2394,
      averageRating: 4.8,
      lastBooking: "2024-12-15",
      status: "VIP",
      joinDate: "2023-06-15",
      favoriteEvents: ["Weekend Brunch", "Business Lunch"],
      bookingHistory: [
        { date: "2024-12-15", event: "Weekend Brunch", amount: 299, status: "Completed" },
        { date: "2024-11-28", event: "Business Lunch", amount: 149, status: "Completed" },
        { date: "2024-11-10", event: "Anniversary Dinner", amount: 399, status: "Completed" }
      ]
    },
    {
      id: 2,
      name: "Michael Johnson",
      email: "michael.j@email.com",
      phone: "+971 55 987 6543",
      location: "Downtown Dubai",
      totalBookings: 5,
      totalSpent: 1247,
      averageRating: 4.6,
      lastBooking: "2024-12-10",
      status: "Regular",
      joinDate: "2023-09-22",
      favoriteEvents: ["Rooftop Party", "Date Night"],
      bookingHistory: [
        { date: "2024-12-10", event: "Rooftop Party", amount: 199, status: "Completed" },
        { date: "2024-11-25", event: "Date Night", amount: 349, status: "Completed" }
      ]
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      email: "fatima.az@email.com",
      phone: "+971 52 456 7890",
      location: "Jumeirah",
      totalBookings: 12,
      totalSpent: 3567,
      averageRating: 4.9,
      lastBooking: "2024-12-18",
      status: "VIP",
      joinDate: "2023-03-10",
      favoriteEvents: ["Luxury Brunch", "Family Gathering"],
      bookingHistory: [
        { date: "2024-12-18", event: "Luxury Brunch", amount: 449, status: "Confirmed" },
        { date: "2024-12-05", event: "Family Gathering", amount: 599, status: "Completed" }
      ]
    },
    {
      id: 4,
      name: "Ahmed Hassan",
      email: "ahmed.hassan@email.com",
      phone: "+971 56 234 5678",
      location: "Business Bay",
      totalBookings: 3,
      totalSpent: 897,
      averageRating: 4.3,
      lastBooking: "2024-12-08",
      status: "New",
      joinDate: "2024-10-15",
      favoriteEvents: ["Business Lunch"],
      bookingHistory: [
        { date: "2024-12-08", event: "Business Lunch", amount: 149, status: "Completed" },
        { date: "2024-11-20", event: "Weekend Brunch", amount: 299, status: "Completed" }
      ]
    }
  ]

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'VIP':
        return 'purple'
      case 'Regular':
        return 'blue'
      case 'New':
        return 'green'
      default:
        return 'default'
    }
  }

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar style={{ backgroundColor: '#667eea' }}>
            {record.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <div style={{ fontWeight: 500 }}>{record.name}</div>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              <EnvironmentOutlined style={{ marginRight: '4px' }} />
              {record.location}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div style={{ fontSize: '12px', marginBottom: '4px' }}>
            <MailOutlined style={{ marginRight: '4px' }} />
            {record.email}
          </div>
          <div style={{ fontSize: '12px' }}>
            <PhoneOutlined style={{ marginRight: '4px' }} />
            {record.phone}
          </div>
        </div>
      ),
    },
    {
      title: 'Bookings',
      dataIndex: 'totalBookings',
      key: 'totalBookings',
      render: (bookings) => (
        <div>
          <div style={{ fontWeight: 500 }}>{bookings}</div>
          <Text type="secondary" style={{ fontSize: '12px' }}>bookings</Text>
        </div>
      ),
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (amount) => (
        <Text style={{ color: '#667eea', fontWeight: 500 }}>
          AED {amount.toLocaleString()}
        </Text>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'averageRating',
      key: 'averageRating',
      render: (rating) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <StarOutlined style={{ color: '#faad14' }} />
          <span style={{ fontWeight: 500 }}>{rating}</span>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: 'Last Booking',
      dataIndex: 'lastBooking',
      key: 'lastBooking',
      render: (date) => <Text type="secondary">{date}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => setSelectedCustomer(record)}
        />
      ),
    },
  ]

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <Title level={1} style={{ margin: 0, marginBottom: '8px' }}>Customer Management</Title>
          <Text type="secondary">Manage your customer relationships and insights</Text>
        </div>
        <Button
          icon={<DownloadOutlined />}
          style={{
            borderRadius: '8px'
          }}
        >
          Export Data
        </Button>
      </div>

      {/* Stats */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={customers.length}
              prefix={<UserOutlined style={{ color: '#667eea' }} />}
              styles={{ content: { color: '#1f2937' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="VIP Customers"
              value={customers.filter(c => c.status === 'VIP').length}
              prefix={<StarOutlined style={{ color: '#f093fb' }} />}
              styles={{ content: { color: '#1f2937' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg. Customer Value"
              value={Math.round(customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length)}
              prefix={<DollarOutlined style={{ color: '#667eea' }} />}
              suffix="AED"
              styles={{ content: { color: '#1f2937' } }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Retention Rate"
              value={87}
              suffix="%"
              prefix={<ArrowUpOutlined style={{ color: '#f093fb' }} />}
              styles={{ content: { color: '#1f2937' } }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Search */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={12} lg={14}>
            <Input
              placeholder="Search customers by name or email..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
            />
          </Col>
          <Col xs={24} md={12} lg={10}>
            <Space>
              <Select
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 120 }}
                size="large"
              >
                <Option value="all">All Status</Option>
                <Option value="vip">VIP</Option>
                <Option value="regular">Regular</Option>
                <Option value="new">New</Option>
              </Select>
              <Button
                icon={<FilterOutlined />}
                size="large"
              >
                More Filters
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Customer List */}
      <Card>
        <div style={{ marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>
            Customers ({filteredCustomers.length})
          </Title>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCustomers}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} customers`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Customer Detail Modal */}
      <Modal
        title={
          <div>
            <Title level={3} style={{ margin: 0 }}>{selectedCustomer?.name}</Title>
            <Text type="secondary">Customer since {selectedCustomer?.joinDate}</Text>
          </div>
        }
        open={!!selectedCustomer}
        onCancel={() => setSelectedCustomer(null)}
        footer={null}
        width={800}
        style={{ top: 20 }}
      >
        {selectedCustomer && (
          <div>
            {/* Customer Stats */}
            <Row gutter={16} style={{ marginBottom: '24px' }}>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Total Bookings"
                    value={selectedCustomer.totalBookings}
                    styles={{ content: { color: '#667eea' } }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Total Spent"
                    value={selectedCustomer.totalSpent}
                    prefix="AED"
                    styles={{ content: { color: '#667eea' } }}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" style={{ textAlign: 'center' }}>
                  <Statistic
                    title="Avg Rating"
                    value={selectedCustomer.averageRating}
                    styles={{ content: { color: '#667eea' } }}
                  />
                </Card>
              </Col>
            </Row>

            {/* Contact Info */}
            <Card size="small" style={{ marginBottom: '16px' }}>
              <Title level={5}>Contact Information</Title>
              <Descriptions column={1} size="small">
                <Descriptions.Item label={<><MailOutlined /> Email</>}>
                  {selectedCustomer.email}
                </Descriptions.Item>
                <Descriptions.Item label={<><PhoneOutlined /> Phone</>}>
                  {selectedCustomer.phone}
                </Descriptions.Item>
                <Descriptions.Item label={<><EnvironmentOutlined /> Location</>}>
                  {selectedCustomer.location}
                </Descriptions.Item>
              </Descriptions>
            </Card>

            {/* Favorite Events */}
            <Card size="small" style={{ marginBottom: '16px' }}>
              <Title level={5}>Favorite Events</Title>
              <Space wrap>
                {selectedCustomer.favoriteEvents.map((event, index) => (
                  <Tag key={index} color="blue">{event}</Tag>
                ))}
              </Space>
            </Card>

            {/* Booking History */}
            <Card size="small">
              <Title level={5}>Recent Bookings</Title>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedCustomer.bookingHistory.map((booking, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#fafafa',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{booking.event}</div>
                      <Text type="secondary" style={{ fontSize: '13px' }}>{booking.date}</Text>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 500, color: '#667eea' }}>
                        AED {booking.amount}
                      </div>
                      <Tag color={booking.status === 'Completed' ? 'green' : 'blue'}>
                        {booking.status}
                      </Tag>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </Modal>
    </div>

  )
}

export default CustomersPage