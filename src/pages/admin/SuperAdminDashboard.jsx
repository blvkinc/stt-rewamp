import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { 
  Card,
  Row,
  Col,
  Typography,
  Select,
  Statistic,
  Badge,
  List,
  Avatar,
  Space,
  Button,
  Tag,
  Table,
  Progress,
  Alert,
  Divider
} from 'antd'
import { 
  BarChartOutlined,
  UserOutlined,
  HomeOutlined,
  CalendarOutlined,
  DollarOutlined,
  ArrowUpOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  StarFilled,
  EnvironmentOutlined,
  EyeOutlined,
  EditOutlined,
  StopOutlined,
  UserAddOutlined,
  SafetyOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  SettingOutlined,
  BellOutlined,
  PlusOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'

const { Title, Text } = Typography
const { Option } = Select

const SuperAdminDashboard = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [timeRange, setTimeRange] = useState('7d')

  // Check if user is authenticated
  if (!isMerchantAuthenticated) {
    return <Navigate to="/merchant/auth" replace />
  }
  
  // Redirect regular merchants to their dashboard
  if (merchant?.role !== 'super_admin') {
    return <Navigate to="/merchant/dashboard" replace />
  }

  // Mock platform-wide data
  const platformStats = {
    totalVenues: 156,
    totalMerchants: 89,
    totalCustomers: 12847,
    totalEvents: 342,
    totalBookings: 5678,
    totalRevenue: 2847392,
    totalUsers: 45, // Super Admin specific
    pendingApprovals: 12, // Super Admin specific
    systemHealth: 98.5, // Super Admin specific
    activeAlerts: 3, // Super Admin specific
    monthlyGrowth: {
      venues: 12.5,
      merchants: 8.3,
      customers: 23.7,
      revenue: 18.9,
      users: 15.2,
      approvals: -8.7
    },
    conversionRate: 14.2,
    averageOrderValue: 287
  }

  // Super Admin specific data
  const systemAlerts = [
    {
      id: 1,
      type: 'security',
      title: 'Multiple Failed Login Attempts',
      description: 'Unusual login activity detected from IP 192.168.1.100',
      severity: 'high',
      timestamp: '5 minutes ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'performance',
      title: 'Database Query Performance',
      description: 'Slow query detected on venues table',
      severity: 'medium',
      timestamp: '15 minutes ago',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'system',
      title: 'Backup Completed Successfully',
      description: 'Daily system backup completed at 02:00 AM',
      severity: 'info',
      timestamp: '6 hours ago',
      status: 'resolved'
    }
  ]

  const userManagement = [
    {
      id: 1,
      name: 'Ahmed Al-Rashid',
      email: 'ahmed@jumeirah.com',
      role: 'Venue Admin',
      assignedVenues: 8,
      lastActive: '2 hours ago',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah@atlantis.com',
      role: 'Venue Admin',
      assignedVenues: 5,
      lastActive: '1 day ago',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael@skyhospitality.ae',
      role: 'Venue Admin',
      assignedVenues: 2,
      lastActive: '3 days ago',
      status: 'Pending Approval'
    }
  ]

  const approvalQueue = [
    {
      id: 1,
      type: 'venue',
      title: 'Atlantis The Palm - Nobu',
      submittedBy: 'Nobu Hospitality',
      submittedAt: '2024-12-18',
      priority: 'high',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event',
      title: 'New Year Gala Dinner',
      submittedBy: 'Burj Al Arab',
      submittedAt: '2024-12-17',
      priority: 'critical',
      status: 'pending'
    },
    {
      id: 3,
      type: 'package',
      title: 'Premium Brunch Package',
      submittedBy: 'Four Seasons Resort',
      submittedAt: '2024-12-16',
      priority: 'medium',
      status: 'under_review'
    }
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'venue_approval',
      title: 'New Venue Application',
      description: 'Azure Beach Club submitted for approval',
      timestamp: '2 hours ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 2,
      type: 'merchant_signup',
      title: 'New Merchant Registration',
      description: 'Sky Lounge Dubai completed onboarding',
      timestamp: '4 hours ago',
      status: 'completed',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'event_flagged',
      title: 'Event Flagged for Review',
      description: 'Luxury Brunch reported by customer',
      timestamp: '6 hours ago',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 4,
      type: 'payment_issue',
      title: 'Payment Processing Issue',
      description: 'Failed payment for Marina Sports Bar',
      timestamp: '8 hours ago',
      status: 'resolved',
      priority: 'critical'
    }
  ]

  const pendingApprovals = [
    {
      id: 1,
      type: 'venue',
      name: 'Atlantis The Palm - Nobu',
      submittedBy: 'Nobu Hospitality',
      submittedAt: '2024-12-18',
      category: 'Fine Dining',
      location: 'Palm Jumeirah',
      status: 'pending'
    },
    {
      id: 2,
      type: 'event',
      name: 'New Year Gala Dinner',
      submittedBy: 'Burj Al Arab',
      submittedAt: '2024-12-17',
      category: 'Special Event',
      price: 1299,
      status: 'pending'
    },
    {
      id: 3,
      type: 'merchant',
      name: 'Dubai Marina Yacht Club',
      submittedBy: 'Marina Holdings LLC',
      submittedAt: '2024-12-16',
      category: 'Yacht Club',
      location: 'Dubai Marina',
      status: 'under_review'
    }
  ]

  const topPerformingVenues = [
    {
      id: 1,
      name: 'Burj Al Arab - Al Muntaha',
      revenue: 145670,
      bookings: 89,
      rating: 4.9,
      growth: 23.5
    },
    {
      id: 2,
      name: 'Atlantis The Palm - Ossiano',
      revenue: 132450,
      bookings: 76,
      rating: 4.8,
      growth: 18.2
    },
    {
      id: 3,
      name: 'Four Seasons - Al Hadheerah',
      revenue: 98320,
      bookings: 124,
      rating: 4.7,
      growth: 15.8
    }
  ]

  const StatCard = ({ title, value, icon: Icon, change, color = "#1890ff", subtitle }) => (
    <Card hoverable>
      <Row justify="space-between" align="middle">
        <Col>
          <Statistic
            title={title}
            value={value}
            valueStyle={{ color: '#262626', fontSize: '28px', fontWeight: 'bold' }}
            suffix={
              <div style={{ fontSize: '12px', marginTop: '4px' }}>
                {subtitle && (
                  <Text type="secondary" style={{ display: 'block', fontSize: '12px' }}>
                    {subtitle}
                  </Text>
                )}
                {change && (
                  <Space style={{ marginTop: '8px' }}>
                    <ArrowUpOutlined style={{ color: '#52c41a', fontSize: '12px' }} />
                    <Text type="success" style={{ fontSize: '12px', fontWeight: 500 }}>
                      +{change}%
                    </Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>vs last month</Text>
                  </Space>
                )}
              </div>
            }
          />
        </Col>
        <Col>
          <Avatar
            size={56}
            style={{ backgroundColor: color }}
            icon={<Icon />}
          />
        </Col>
      </Row>
    </Card>
  )

  const getActivityIcon = (type) => {
    switch (type) {
      case 'venue_approval':
        return Building
      case 'merchant_signup':
        return UserCheck
      case 'event_flagged':
        return AlertTriangle
      case 'payment_issue':
        return DollarSign
      default:
        return Clock
    }
  }

  const getActivityColor = (priority) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-50'
      case 'high':
        return 'text-orange-600 bg-orange-50'
      case 'medium':
        return 'text-blue-600 bg-blue-50'
      default:
        return 'text-neutral-600 bg-neutral-50'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'under_review':
        return 'bg-blue-100 text-blue-700'
      case 'completed':
        return 'bg-green-100 text-green-700'
      case 'resolved':
        return 'bg-green-100 text-green-700'
      default:
        return 'bg-neutral-100 text-neutral-700'
    }
  }

  return (
    <SuperAdminLayout>
      <div style={{ padding: '24px' }}>
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '32px' }}>
          <Col>
            <Title level={1} style={{ margin: 0, marginBottom: '8px', fontSize: '32px' }}>
              System Administration Center
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Complete platform oversight and management
            </Text>
          </Col>
          <Col>
            <Space>
              {/* System Health Indicator */}
              <Badge 
                status="processing" 
                text={
                  <Text style={{ color: '#52c41a', fontWeight: 500 }}>
                    System Health: {platformStats.systemHealth}%
                  </Text>
                }
              />
              
              <Select
                value={timeRange}
                onChange={setTimeRange}
                style={{ width: 150 }}
              >
                <Option value="24h">Last 24 Hours</Option>
                <Option value="7d">Last 7 Days</Option>
                <Option value="30d">Last 30 Days</Option>
                <Option value="90d">Last 90 Days</Option>
              </Select>
            </Space>
          </Col>
        </Row>

        {/* System Overview Metrics */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} sm={12} lg={5}>
            <StatCard
              title="Platform Users"
              value={platformStats.totalUsers}
              subtitle="Admins & Merchants"
              icon={SafetyOutlined}
              change={platformStats.monthlyGrowth.users}
              color="#ff4d4f"
            />
          </Col>
          <Col xs={24} sm={12} lg={5}>
            <StatCard
              title="Pending Approvals"
              value={platformStats.pendingApprovals}
              subtitle="Awaiting review"
              icon={ClockCircleOutlined}
              change={platformStats.monthlyGrowth.approvals}
              color="#faad14"
            />
          </Col>
          <Col xs={24} sm={12} lg={5}>
            <StatCard
              title="Active Venues"
              value={platformStats.totalVenues}
              subtitle="Operational venues"
              icon={HomeOutlined}
              change={platformStats.monthlyGrowth.venues}
              color="#1890ff"
            />
          </Col>
          <Col xs={24} sm={12} lg={4}>
            <StatCard
              title="System Alerts"
              value={platformStats.activeAlerts}
              subtitle="Require attention"
              icon={WarningOutlined}
              color="#fa8c16"
            />
          </Col>
          <Col xs={24} sm={12} lg={5}>
            <StatCard
              title="Total Revenue"
              value={`AED ${(platformStats.totalRevenue / 1000000).toFixed(1)}M`}
              subtitle="Platform earnings"
              icon={DollarOutlined}
              change={platformStats.monthlyGrowth.revenue}
              color="#52c41a"
            />
          </Col>
        </Row>

        {/* Secondary Metrics */}
        <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
          <Col xs={24} md={8}>
            <StatCard
              title="Total Bookings"
              value={platformStats.totalBookings.toLocaleString()}
              icon={CalendarOutlined}
              change={12.8}
              color="#1890ff"
            />
          </Col>
          <Col xs={24} md={8}>
            <StatCard
              title="Conversion Rate"
              value={`${platformStats.conversionRate}%`}
              icon={ArrowUpOutlined}
              change={2.3}
              color="#722ed1"
            />
          </Col>
          <Col xs={24} md={8}>
            <StatCard
              title="Avg Order Value"
              value={`AED ${platformStats.averageOrderValue}`}
              icon={DollarOutlined}
              change={8.7}
              color="#1890ff"
            />
          </Col>
        </Row>

        {/* Main Content Grid */}
        <Row gutter={[32, 32]} style={{ marginBottom: '32px' }}>
          {/* System Alerts & Activity */}
          <Col xs={24} lg={16}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* System Alerts */}
              <Card>
                <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                  <Col>
                    <Title level={4} style={{ margin: 0 }}>System Alerts</Title>
                  </Col>
                  <Col>
                    <Space>
                      <Badge 
                        count={systemAlerts.filter(a => a.status === 'active').length}
                        style={{ backgroundColor: '#ff4d4f' }}
                      >
                        <Text>Active</Text>
                      </Badge>
                      <Link to="/admin/system">
                        <Button type="link" style={{ padding: 0 }}>
                          View All
                        </Button>
                      </Link>
                    </Space>
                  </Col>
                </Row>
                
                <List
                  dataSource={systemAlerts}
                  renderItem={(alert) => (
                    <List.Item
                      style={{ 
                        padding: '16px', 
                        backgroundColor: '#fafafa', 
                        borderRadius: '8px', 
                        marginBottom: '8px' 
                      }}
                      actions={[
                        <Button 
                          type="text" 
                          icon={<EyeOutlined />} 
                          size="small"
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{
                              backgroundColor: 
                                alert.severity === 'high' ? '#ff4d4f' :
                                alert.severity === 'medium' ? '#faad14' : '#1890ff'
                            }}
                            icon={
                              alert.type === 'security' ? <SafetyOutlined /> :
                              alert.type === 'performance' ? <ThunderboltOutlined /> :
                              <DatabaseOutlined />
                            }
                          />
                        }
                        title={<Text strong>{alert.title}</Text>}
                        description={
                          <div>
                            <Text type="secondary" style={{ fontSize: '13px' }}>
                              {alert.description}
                            </Text>
                            <div style={{ marginTop: '8px' }}>
                              <Space>
                                <Text type="secondary" style={{ fontSize: '11px' }}>
                                  {alert.timestamp}
                                </Text>
                                <Tag 
                                  color={
                                    alert.status === 'active' ? 'red' :
                                    alert.status === 'investigating' ? 'orange' : 'green'
                                  }
                                  style={{ fontSize: '10px' }}
                                >
                                  {alert.status}
                                </Tag>
                              </Space>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>

              {/* User Management Preview */}
              <Card>
                <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                  <Col>
                    <Title level={4} style={{ margin: 0 }}>User Management</Title>
                  </Col>
                  <Col>
                    <Link to="/admin/users">
                      <Button type="link" style={{ padding: 0 }}>
                        Manage All Users
                      </Button>
                    </Link>
                  </Col>
                </Row>
                
                <List
                  dataSource={userManagement}
                  renderItem={(user) => (
                    <List.Item
                      style={{ 
                        padding: '16px', 
                        backgroundColor: '#fafafa', 
                        borderRadius: '8px', 
                        marginBottom: '8px' 
                      }}
                      actions={[
                        <Tag 
                          color={user.status === 'Active' ? 'success' : 'warning'}
                          key="status"
                        >
                          {user.status}
                        </Tag>,
                        <Button 
                          type="text" 
                          icon={<EditOutlined />} 
                          size="small"
                          key="edit"
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            style={{ backgroundColor: '#ff4d4f' }}
                            icon={<UserAddOutlined />}
                          />
                        }
                        title={<Text strong>{user.name}</Text>}
                        description={
                          <div>
                            <Text type="secondary" style={{ fontSize: '13px', display: 'block' }}>
                              {user.email}
                            </Text>
                            <Space style={{ fontSize: '11px', color: '#8c8c8c', marginTop: '4px' }}>
                              <span>{user.role}</span>
                              <span>•</span>
                              <span>{user.assignedVenues} venues</span>
                              <span>•</span>
                              <span>Active {user.lastActive}</span>
                            </Space>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>

          {/* Approval Queue */}
          <Col xs={24} lg={8}>
            <Card>
              <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>Approval Queue</Title>
                </Col>
                <Col>
                  <Badge 
                    count={approvalQueue.length}
                    style={{ backgroundColor: '#ff4d4f' }}
                  >
                    <Text>Pending</Text>
                  </Badge>
                </Col>
              </Row>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {approvalQueue.map((item) => (
                  <Card 
                    key={item.id} 
                    size="small"
                    style={{ border: '1px solid #d9d9d9' }}
                    hoverable
                  >
                    <Row justify="space-between" align="top" style={{ marginBottom: '8px' }}>
                      <Col flex="auto">
                        <Text strong style={{ fontSize: '13px', display: 'block' }}>
                          {item.title}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {item.submittedBy}
                        </Text>
                      </Col>
                      <Col>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
                          <Tag 
                            color="red" 
                            style={{ fontSize: '10px', margin: 0 }}
                          >
                            {item.type}
                          </Tag>
                          <Tag 
                            color={
                              item.priority === 'critical' ? 'red' :
                              item.priority === 'high' ? 'orange' : 'gold'
                            }
                            style={{ fontSize: '10px', margin: 0 }}
                          >
                            {item.priority}
                          </Tag>
                        </div>
                      </Col>
                    </Row>
                    
                    <Row justify="space-between" align="middle" style={{ marginTop: '12px' }}>
                      <Col>
                        <Text type="secondary" style={{ fontSize: '11px' }}>
                          {item.submittedAt}
                        </Text>
                      </Col>
                      <Col>
                        <Space size="small">
                          <Button 
                            type="text" 
                            icon={<CheckCircleOutlined />} 
                            size="small"
                            style={{ color: '#52c41a' }}
                          />
                          <Button 
                            type="text" 
                            icon={<CloseCircleOutlined />} 
                            size="small"
                            style={{ color: '#ff4d4f' }}
                          />
                          <Button 
                            type="text" 
                            icon={<EyeOutlined />} 
                            size="small"
                          />
                        </Space>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
              
              <Link to="/admin/approvals">
                <Button 
                  block 
                  style={{ marginTop: '16px' }}
                >
                  View All Approvals
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>

        {/* Top Performing Venues */}
        <Card style={{ marginBottom: '32px' }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
            <Col>
              <Title level={4} style={{ margin: 0 }}>Top Performing Venues</Title>
            </Col>
            <Col>
              <Button type="link" style={{ padding: 0 }}>
                View All Venues
              </Button>
            </Col>
          </Row>
          
          <Table
            dataSource={topPerformingVenues}
            pagination={false}
            size="middle"
            columns={[
              {
                title: 'Venue',
                dataIndex: 'name',
                key: 'name',
                render: (name, record, index) => (
                  <Space>
                    <Avatar
                      style={{ backgroundColor: '#1890ff' }}
                      size="small"
                    >
                      {index + 1}
                    </Avatar>
                    <Text strong>{name}</Text>
                  </Space>
                )
              },
              {
                title: 'Revenue',
                dataIndex: 'revenue',
                key: 'revenue',
                render: (revenue) => (
                  <Text strong style={{ color: '#1890ff' }}>
                    AED {revenue.toLocaleString()}
                  </Text>
                )
              },
              {
                title: 'Bookings',
                dataIndex: 'bookings',
                key: 'bookings'
              },
              {
                title: 'Rating',
                dataIndex: 'rating',
                key: 'rating',
                render: (rating) => (
                  <Space>
                    <StarFilled style={{ color: '#faad14' }} />
                    <Text strong>{rating}</Text>
                  </Space>
                )
              },
              {
                title: 'Growth',
                dataIndex: 'growth',
                key: 'growth',
                render: (growth) => (
                  <Space style={{ color: '#52c41a' }}>
                    <ArrowUpOutlined />
                    <Text strong style={{ color: '#52c41a' }}>+{growth}%</Text>
                  </Space>
                )
              },
              {
                title: 'Actions',
                key: 'actions',
                render: () => (
                  <Space>
                    <Button type="text" icon={<EyeOutlined />} size="small" />
                    <Button type="text" icon={<EditOutlined />} size="small" />
                  </Space>
                )
              }
            ]}
          />
        </Card>

        {/* Administrative Actions */}
        <Card style={{ marginBottom: '32px' }}>
          <Title level={4} style={{ marginBottom: '24px' }}>Administrative Actions</Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
              <Link to="/admin/users">
                <Card 
                  hoverable
                  style={{ 
                    background: 'linear-gradient(135deg, #fff1f0 0%, #ffccc7 100%)',
                    border: '1px solid #ffccc7',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#ff4d4f', marginBottom: '16px' }}
                    icon={<SafetyOutlined />}
                  />
                  <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                    User Management
                  </Title>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    Manage admin users and roles
                  </Text>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Link to="/admin/venues">
                <Card 
                  hoverable
                  style={{ 
                    background: 'linear-gradient(135deg, #f0f5ff 0%, #d6e4ff 100%)',
                    border: '1px solid #d6e4ff',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#1890ff', marginBottom: '16px' }}
                    icon={<HomeOutlined />}
                  />
                  <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                    All Venues
                  </Title>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    System-wide venue oversight
                  </Text>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Link to="/admin/approvals">
                <Card 
                  hoverable
                  style={{ 
                    background: 'linear-gradient(135deg, #fffbe6 0%, #fff1b8 100%)',
                    border: '1px solid #fff1b8',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#faad14', marginBottom: '16px' }}
                    icon={<FileTextOutlined />}
                  />
                  <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                    Approval Queue
                  </Title>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    Review pending submissions
                  </Text>
                </Card>
              </Link>
            </Col>

            <Col xs={24} sm={12} lg={6}>
              <Link to="/admin/system">
                <Card 
                  hoverable
                  style={{ 
                    background: 'linear-gradient(135deg, #f9f0ff 0%, #efdbff 100%)',
                    border: '1px solid #efdbff',
                    textAlign: 'center'
                  }}
                >
                  <Avatar
                    size={48}
                    style={{ backgroundColor: '#722ed1', marginBottom: '16px' }}
                    icon={<SettingOutlined />}
                  />
                  <Title level={5} style={{ margin: 0, marginBottom: '8px' }}>
                    System Settings
                  </Title>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    Platform configuration
                  </Text>
                </Card>
              </Link>
            </Col>
          </Row>
        </Card>

        {/* System Status Overview */}
        <Row gutter={[32, 32]}>
          {/* Platform Performance */}
          <Col xs={24} md={12}>
            <Card>
              <Title level={4} style={{ marginBottom: '24px' }}>Platform Performance</Title>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary">Server Uptime</Text>
                  </Col>
                  <Col>
                    <Text strong style={{ color: '#52c41a' }}>99.9%</Text>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary">Response Time</Text>
                  </Col>
                  <Col>
                    <Text strong style={{ color: '#1890ff' }}>145ms</Text>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary">Active Sessions</Text>
                  </Col>
                  <Col>
                    <Text strong>2,847</Text>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Text type="secondary">Database Health</Text>
                  </Col>
                  <Col>
                    <Text strong style={{ color: '#52c41a' }}>Optimal</Text>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>

          {/* Recent System Changes */}
          <Col xs={24} md={12}>
            <Card>
              <Title level={4} style={{ marginBottom: '24px' }}>Recent System Changes</Title>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: '#52c41a', 
                        borderRadius: '50%' 
                      }} />
                      <Text style={{ fontSize: '13px' }}>Database backup completed</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: '11px' }}>2h ago</Text>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: '#1890ff', 
                        borderRadius: '50%' 
                      }} />
                      <Text style={{ fontSize: '13px' }}>Security patch deployed</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: '11px' }}>6h ago</Text>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: '#faad14', 
                        borderRadius: '50%' 
                      }} />
                      <Text style={{ fontSize: '13px' }}>Performance optimization</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: '11px' }}>1d ago</Text>
                  </Col>
                </Row>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Space>
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        backgroundColor: '#722ed1', 
                        borderRadius: '50%' 
                      }} />
                      <Text style={{ fontSize: '13px' }}>New feature deployment</Text>
                    </Space>
                  </Col>
                  <Col>
                    <Text type="secondary" style={{ fontSize: '11px' }}>2d ago</Text>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </SuperAdminLayout>
  )
}

export default SuperAdminDashboard