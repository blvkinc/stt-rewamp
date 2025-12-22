import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  Card,
  Row,
  Col,
  Typography,
  Button,
  Input,
  Select,
  Tag,
  Statistic,
  Dropdown,
  Space,
  Empty,
  Divider
} from 'antd'
import { 
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  EyeOutlined,
  ArrowUpOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  MoreOutlined,
  StarFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import MerchantLayout from '../../components/merchant/MerchantLayout'

const { Title, Text } = Typography
const { Option } = Select

const PackagesPage = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showFilters, setShowFilters] = useState(false)

  // Redirect to auth if not logged in
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }

  // Mock packages data
  const packages = [
    {
      id: 1,
      name: 'Classic Brunch Package',
      description: 'Perfect introduction to our luxury brunch experience',
      price: 299,
      originalPrice: 349,
      status: 'active',
      event: 'Weekend Brunch',
      maxGuests: 2,
      bookings: 45,
      revenue: 13455,
      rating: 4.7,
      reviews: 32,
      features: ['Welcome drink', 'International buffet', 'Soft beverages', '2-hour dining', 'Valet parking'],
      createdAt: '2024-01-15',
      lastModified: '2024-02-01'
    },
    {
      id: 2,
      name: 'Premium Brunch Package',
      description: 'Enhanced experience with premium beverages and extras',
      price: 449,
      originalPrice: 529,
      status: 'active',
      event: 'Weekend Brunch',
      maxGuests: 4,
      bookings: 89,
      revenue: 39961,
      rating: 4.9,
      reviews: 67,
      features: ['Premium cocktail', 'International buffet', 'Premium beverages', '3-hour dining', 'Ocean view', 'Valet parking', 'Dessert selection'],
      createdAt: '2024-01-10',
      lastModified: '2024-02-05',
      popular: true
    },
    {
      id: 3,
      name: 'VIP Experience Package',
      description: 'Ultimate luxury with exclusive perks and personalized service',
      price: 699,
      originalPrice: 799,
      status: 'active',
      event: 'Weekend Brunch',
      maxGuests: 6,
      bookings: 32,
      revenue: 22368,
      rating: 5.0,
      reviews: 28,
      features: ['Private reception', 'VIP buffet', 'Premium champagne', '4-hour dining', 'Panoramic views', 'Personal sommelier', 'Spa access', 'Photography'],
      createdAt: '2024-01-20',
      lastModified: '2024-02-03'
    }
  ]

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.event.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || pkg.status === filterStatus
    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const stats = {
    total: packages.length,
    active: packages.filter(p => p.status === 'active').length,
    totalBookings: packages.reduce((sum, p) => sum + p.bookings, 0),
    totalRevenue: packages.reduce((sum, p) => sum + p.revenue, 0),
    avgRating: (packages.reduce((sum, p) => sum + p.rating, 0) / packages.filter(p => p.rating > 0).length).toFixed(1)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'success'
      case 'inactive': return 'default'
      case 'draft': return 'warning'
      default: return 'default'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return <CheckCircleOutlined />
      case 'inactive': return <CloseCircleOutlined />
      case 'draft': return <ClockCircleOutlined />
      default: return null
    }
  }

  return (
    <MerchantLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
          <Col>
            <Title level={2} style={{ margin: 0, marginBottom: '8px' }}>Packages</Title>
            <Text type="secondary">Create and manage your event packages</Text>
          </Col>
          <Col>
            <Space>
              <Button icon={<CopyOutlined />}>
                Duplicate
              </Button>
              <Link to="/merchant/packages/create">
                <Button type="primary" icon={<PlusOutlined />}>
                  Create Package
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={5}>
            <Card>
              <Statistic
                title="Total Packages"
                value={stats.total}
                prefix={<UserOutlined />}
                suffix={<Text type="secondary" style={{ fontSize: '12px' }}>{stats.active} active</Text>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={5}>
            <Card>
              <Statistic
                title="Total Bookings"
                value={stats.totalBookings}
                prefix={<CalendarOutlined />}
                suffix={
                  <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                    <ArrowUpOutlined /> +12% this month
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={5}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={`AED ${stats.totalRevenue.toLocaleString()}`}
                prefix={<DollarOutlined />}
                suffix={
                  <div style={{ fontSize: '12px', color: '#52c41a', marginTop: '4px' }}>
                    <ArrowUpOutlined /> +18% this month
                  </div>
                }
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <Card>
              <Statistic
                title="Average Rating"
                value={stats.avgRating}
                prefix={<StarFilled style={{ color: '#faad14' }} />}
                suffix={<Text type="secondary" style={{ fontSize: '12px' }}>out of 5.0</Text>}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={5}>
            <Card>
              <Statistic
                title="Avg. Package Price"
                value={`AED ${Math.round(packages.reduce((sum, p) => sum + p.price, 0) / packages.length)}`}
                prefix={<ArrowUpOutlined />}
                suffix={<Text type="secondary" style={{ fontSize: '12px' }}>per person</Text>}
              />
            </Card>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Card style={{ marginBottom: '24px' }}>
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                size="large"
                placeholder="Search packages by name, description, or event..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
            <Col>
              <Select
                size="large"
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: 150 }}
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="draft">Draft</Option>
              </Select>
            </Col>
            <Col>
              <Button
                size="large"
                icon={<FilterOutlined />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </Col>
          </Row>
        </Card>

        {/* Packages Grid */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          {filteredPackages.map((pkg) => (
            <Col key={pkg.id} xs={24} md={12} lg={8}>
              <Card
                hoverable
                style={{ position: 'relative' }}
                actions={[
                  <Button type="text" icon={<EyeOutlined />} key="view">View</Button>,
                  <Button type="text" icon={<EditOutlined />} key="edit">Edit</Button>,
                  <Button type="text" icon={<DeleteOutlined />} key="delete" danger>Delete</Button>
                ]}
                extra={
                  <Dropdown
                    menu={{
                      items: [
                        { key: 'edit', icon: <EditOutlined />, label: 'Edit' },
                        { key: 'copy', icon: <CopyOutlined />, label: 'Duplicate' },
                        { key: 'delete', icon: <DeleteOutlined />, label: 'Delete', danger: true }
                      ]
                    }}
                  >
                    <Button type="text" icon={<MoreOutlined />} />
                  </Dropdown>
                }
              >
                {pkg.popular && (
                  <div style={{ position: 'absolute', top: '-12px', left: '24px', zIndex: 10 }}>
                    <Tag color="gold">Most Popular</Tag>
                  </div>
                )}
                
                <Card.Meta
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong>{pkg.name}</Text>
                      <Tag color={getStatusColor(pkg.status)} icon={getStatusIcon(pkg.status)}>
                        {pkg.status}
                      </Tag>
                    </div>
                  }
                  description={
                    <div>
                      <Text type="secondary" style={{ fontSize: '13px' }}>{pkg.description}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '11px' }}>{pkg.event}</Text>
                    </div>
                  }
                />

                <Divider />

                {/* Price */}
                <div style={{ marginBottom: '16px' }}>
                  <Space>
                    <Text style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                      AED {pkg.price}
                    </Text>
                    {pkg.originalPrice > pkg.price && (
                      <Text delete type="secondary">AED {pkg.originalPrice}</Text>
                    )}
                  </Space>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>per person</Text>
                </div>

                {/* Stats */}
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <Statistic
                      title="Bookings"
                      value={pkg.bookings}
                      valueStyle={{ fontSize: '16px' }}
                    />
                  </Col>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <Statistic
                      title="Revenue"
                      value={pkg.revenue > 0 ? `${(pkg.revenue / 1000).toFixed(1)}K` : '0'}
                      valueStyle={{ fontSize: '16px' }}
                    />
                  </Col>
                  <Col span={8} style={{ textAlign: 'center' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#8c8c8c', marginBottom: '4px' }}>Rating</div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <StarFilled style={{ color: '#faad14', marginRight: '4px' }} />
                        <Text style={{ fontSize: '16px', fontWeight: 'bold' }}>
                          {pkg.rating > 0 ? pkg.rating : 'N/A'}
                        </Text>
                      </div>
                    </div>
                  </Col>
                </Row>

                <Divider />

                {/* Features */}
                <div>
                  <Text strong style={{ fontSize: '12px' }}>Includes:</Text>
                  <div style={{ marginTop: '8px' }}>
                    {pkg.features.slice(0, 3).map((feature, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px', fontSize: '12px' }} />
                        <Text style={{ fontSize: '12px' }}>{feature}</Text>
                      </div>
                    ))}
                    {pkg.features.length > 3 && (
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        +{pkg.features.length - 3} more features
                      </Text>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <Card>
            <Empty
              image={<UserOutlined style={{ fontSize: '64px', color: '#d9d9d9' }} />}
              imageStyle={{ height: 80 }}
              description={
                <div>
                  <Title level={4}>No packages found</Title>
                  <Text type="secondary">Try adjusting your search or filters</Text>
                </div>
              }
            >
              <Button
                onClick={() => {
                  setSearchTerm('')
                  setFilterStatus('all')
                }}
              >
                Clear Filters
              </Button>
            </Empty>
          </Card>
        )}
      </div>
    </MerchantLayout>
  )
}

export default PackagesPage