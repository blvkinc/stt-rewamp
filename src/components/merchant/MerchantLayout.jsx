import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Layout, 
  Menu, 
  Button, 
  Avatar, 
  Badge, 
  Typography, 
  Space, 
  Tag as AntTag,
  Dropdown
} from 'antd'
import {
  DashboardOutlined,
  CalendarOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuOutlined,
  ShopOutlined,
  PlusOutlined,
  TagOutlined,
  ArrowUpOutlined,
  BellOutlined,
  InboxOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const MerchantLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { merchant, logoutMerchant } = useMerchant()

  const menuItems = [
    {
      key: '/merchant/dashboard',
      icon: <DashboardOutlined />,
      label: <Link to="/merchant/dashboard">Dashboard</Link>,
    },
    {
      key: '/merchant/events',
      icon: <CalendarOutlined />,
      label: <Link to="/merchant/events">Events</Link>,
    },
    {
      key: '/merchant/packages',
      icon: <InboxOutlined />,
      label: <Link to="/merchant/packages">Packages</Link>,
    },
    {
      key: '/merchant/bookings',
      icon: <TeamOutlined />,
      label: <Link to="/merchant/bookings">Bookings</Link>,
    },
    {
      key: '/merchant/customers',
      icon: <TeamOutlined />,
      label: <Link to="/merchant/customers">Customers</Link>,
    },
    {
      key: '/merchant/analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/merchant/analytics">Analytics</Link>,
    },
    {
      key: '/merchant/promotions',
      icon: <TagOutlined />,
      label: <Link to="/merchant/promotions">Promotions</Link>,
    },
    {
      key: '/merchant/advertising',
      icon: <ArrowUpOutlined />,
      label: <Link to="/merchant/advertising">Advertising</Link>,
    },
    {
      key: '/merchant/settings',
      icon: <SettingOutlined />,
      label: <Link to="/merchant/settings">Settings</Link>,
    },
  ]

  const handleLogout = () => {
    logoutMerchant()
    navigate('/merchant/auth')
  }

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: handleLogout,
      danger: true,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={280}
        style={{
          background: '#fff',
          boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
        }}
        breakpoint="lg"
        collapsedWidth="0"
      >
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column'
        }}>
          {/* Logo */}
          <div style={{ 
            padding: '24px 16px', 
            borderBottom: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start'
          }}>
            <Link to="/merchant/dashboard" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 12,
              textDecoration: 'none'
            }}>
              <Avatar 
                size={40} 
                icon={<ShopOutlined />} 
                style={{ 
                  background: 'linear-gradient(135deg, #1890ff, #096dd9)',
                  flexShrink: 0
                }}
              />
              {!collapsed && (
                <Text strong style={{ fontSize: 18, color: '#262626' }}>
                  STT Business
                </Text>
              )}
            </Link>
          </div>

          {/* Merchant Info */}
          {!collapsed && (
            <div style={{ 
              padding: '24px 16px', 
              borderBottom: '1px solid #f0f0f0' 
            }}>
              <Space align="start" size={12}>
                <Avatar 
                  size={48} 
                  icon={<ShopOutlined />} 
                  style={{ background: '#e6f7ff', color: '#1890ff' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text strong style={{ display: 'block' }}>
                    {merchant?.businessName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                    {merchant?.email}
                  </Text>
                  <AntTag 
                    color={merchant?.status === 'Approved' ? 'success' : 'warning'}
                    style={{ marginTop: 4 }}
                  >
                    {merchant?.status}
                  </AntTag>
                </div>
              </Space>
            </div>
          )}

          {/* Navigation */}
          <div style={{ flex: 1, padding: '16px 0' }}>
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              style={{ 
                border: 'none',
                background: 'transparent'
              }}
            />
          </div>

          {/* Quick Actions */}
          <div style={{ 
            padding: '16px', 
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            flexDirection: 'column',
            gap: 8
          }}>
            <Link to="/merchant/events/create">
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                block={!collapsed}
                style={{ borderRadius: 8 }}
              >
                {!collapsed && 'Create Event'}
              </Button>
            </Link>
            
            <Button 
              icon={<LogoutOutlined />} 
              onClick={handleLogout}
              danger
              block={!collapsed}
              style={{ borderRadius: 8 }}
            >
              {!collapsed && 'Sign Out'}
            </Button>
          </div>
        </div>
      </Sider>

      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="lg:hidden"
          />

          <Space size={16} style={{ marginLeft: 'auto' }}>
            {/* Notifications */}
            <Badge count={5} size="small">
              <Button 
                type="text" 
                icon={<BellOutlined />} 
                size="large"
                style={{ borderRadius: 8 }}
              />
            </Badge>

            {/* Profile */}
            <Dropdown
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Button type="text" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 12,
                height: 'auto',
                padding: '8px 12px',
                borderRadius: 8
              }}>
                <div style={{ textAlign: 'right' }}>
                  <Text strong style={{ display: 'block', fontSize: 14 }}>
                    {merchant?.businessName}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {merchant?.subscriptionType} Plan
                  </Text>
                </div>
                <Avatar 
                  icon={<ShopOutlined />} 
                  style={{ background: '#e6f7ff', color: '#1890ff' }}
                />
              </Button>
            </Dropdown>
          </Space>
        </Header>

        <Content style={{ 
          margin: '24px',
          padding: '24px',
          background: '#f5f5f5',
          borderRadius: 8,
          overflow: 'auto'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default MerchantLayout