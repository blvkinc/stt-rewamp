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
  Divider,
  theme
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
  PlusOutlined,
  RightOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'
import SuperAdminLayout from '../../components/admin/SuperAdminLayout'

const { Title, Text } = Typography
const { Option } = Select

const SuperAdminDashboard = () => {
  const { merchant, isMerchantAuthenticated } = useMerchant()
  const [timeRange, setTimeRange] = useState('7d')
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

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
    pendingApprovals: 5, // Super Admin specific
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
      title: 'High Server Load',
      description: 'CPU usage exceeded 85% on Instance A',
      severity: 'medium',
      timestamp: '15 minutes ago',
      status: 'investigating'
    },
    {
      id: 3,
      type: 'system',
      title: 'DB Backup Success',
      description: 'Nightly backup completed successfully',
      severity: 'info',
      timestamp: '6 hours ago',
      status: 'resolved'
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

  const StatCard = ({ title, value, icon, change, color = "var(--brand-purple)", subtitle, prefix = "" }) => (
    <Card
      hoverable
      variant="borderless"
      style={{
        height: '100%',
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
      }}
      styles={{ body: { padding: 24 } }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
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
        {change && (
          <Tag color={change >= 0 ? 'success' : 'error'} style={{ borderRadius: 100, border: 'none', padding: '0 8px' }}>
            {change >= 0 ? <ArrowUpOutlined /> : <ArrowUpOutlined rotate={180} />} {Math.abs(change)}%
          </Tag>
        )}
      </div>

      <Statistic
        title={<Text type="secondary" style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{title}</Text>}
        value={value}
        prefix={prefix}
        styles={{ content: { fontSize: 28, fontWeight: 700, color: '#1f1f1f' } }}
      />
      {subtitle && <Text type="secondary" style={{ fontSize: 12 }}>{subtitle}</Text>}
    </Card>
  )

  const approvalColumns = [
    {
      title: 'Item',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <Text strong style={{ display: 'block' }}>{text}</Text>
          <Text type="secondary" style={{ fontSize: 12 }}>by {record.submittedBy}</Text>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => <Tag color="blue" style={{ borderRadius: 100, textTransform: 'capitalize' }}>{type}</Tag>
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        let color = 'default';
        if (priority === 'critical') color = 'red';
        if (priority === 'high') color = 'orange';
        if (priority === 'medium') color = 'gold';
        return <Tag color={color} style={{ borderRadius: 100, textTransform: 'capitalize' }}>{priority}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button type="primary" size="small" icon={<CheckCircleOutlined />} style={{ background: '#52c41a' }} />
          <Button type="primary" danger size="small" icon={<CloseCircleOutlined />} />
        </Space>
      )
    }
  ];

  return (
    <SuperAdminLayout>
      <div style={{ padding: '0 8px' }}>
        {/* Header */}
        <Row justify="space-between" align="middle" style={{ marginBottom: 32 }}>
          <Col>
            <Title level={2} style={{ margin: 0 }}>System Overview</Title>
            <Text type="secondary">Real-time platform monitoring</Text>
          </Col>
          <Col>
            <Space>
              <Select defaultValue="7d" size="large" style={{ width: 140 }}>
                <Option value="24h">Last 24 Hours</Option>
                <Option value="7d">Last 7 Days</Option>
                <Option value="30d">Last 30 Days</Option>
              </Select>
              <Button
                type="primary"
                size="large"
                icon={<FileTextOutlined />}
                className="btn-primary shadow-lg"
              >
                Generate Report
              </Button>
            </Space>
          </Col>
        </Row>

        {/* System Overview Metrics */}
        <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
          <Col xs={24} sm={12} lg={6} xl={6}>
            <StatCard
              title="Platform Revenue"
              value={(platformStats.totalRevenue / 1000000).toFixed(2)}
              prefix="AED "
              subtitle="M (Millions)"
              icon={<DollarOutlined />}
              change={platformStats.monthlyGrowth.revenue}
              color="var(--brand-purple)"
            />
          </Col>
          <Col xs={24} sm={12} lg={6} xl={6}>
            <StatCard
              title="Active Venues"
              value={platformStats.totalVenues}
              subtitle="Operational Venues"
              icon={<HomeOutlined />}
              change={platformStats.monthlyGrowth.venues}
              color="var(--brand-blue)"
            />
          </Col>
          <Col xs={24} sm={12} lg={6} xl={6}>
            <StatCard
              title="Total Users"
              value={platformStats.totalUsers}
              subtitle="Admins & Merchants"
              icon={<TeamOutlined />}
              change={platformStats.monthlyGrowth.users}
              color="var(--brand-red)"
            />
          </Col>
          <Col xs={24} sm={12} lg={6} xl={6}>
            <StatCard
              title="Approvals Pending"
              value={platformStats.pendingApprovals}
              subtitle="Action Required"
              icon={<ClockCircleOutlined />}
              change={-5}
              color="#faad14"
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {/* System Alerts */}
          <Col xs={24} lg={14}>
            <Card
              title={<Title level={4} style={{ margin: 0 }}>System Alerts</Title>}
              variant="borderless"
              style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {systemAlerts.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: '1px solid #f0f0f0' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                      <Avatar
                        icon={item.type === 'security' ? <SafetyOutlined /> : item.type === 'performance' ? <ThunderboltOutlined /> : <DatabaseOutlined />}
                        style={{
                          backgroundColor: item.severity === 'high' ? 'rgba(215, 65, 92, 0.1)' : item.severity === 'medium' ? 'rgba(242, 109, 64, 0.1)' : 'rgba(108, 181, 248, 0.1)',
                          color: item.severity === 'high' ? 'var(--brand-red)' : item.severity === 'medium' ? 'var(--brand-orange)' : 'var(--brand-blue)'
                        }}
                      />
                      <div>
                        <Text strong style={{ display: 'block' }}>{item.title}</Text>
                        <Text type="secondary">{item.description}</Text>
                      </div>
                    </div>
                    <div>
                      <Tag color={item.status === 'active' ? 'error' : item.status === 'investigating' ? 'warning' : 'success'}>
                        {item.status.toUpperCase()}
                      </Tag>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          {/* Approval Queue */}
          <Col xs={24} lg={10}>
            <Card
              title={<Title level={4} style={{ margin: 0 }}>Approval Queue</Title>}
              extra={<Link to="/admin/approvals"><Button type="link">View All</Button></Link>}
              variant="borderless"
              style={{ borderRadius: 16, boxShadow: '0 4px 20px rgba(0,0,0,0.03)', height: '100%' }}
              styles={{ body: { padding: 0 } }}
            >
              <Table
                dataSource={approvalQueue}
                columns={approvalColumns}
                pagination={false}
                rowKey="id"
                size="small"
                style={{ marginTop: 8 }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </SuperAdminLayout>
  )
}

export default SuperAdminDashboard