import React, { useState } from 'react'
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom'
import {
  Layout,
  Menu,
  Button,
  Avatar,
  Badge,
  Typography,
  Space,
  Tag as AntTag,
  Dropdown,
  theme
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
  InboxOutlined,
  UserOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'

const { Header, Sider, Content } = Layout
const { Text, Title } = Typography

const MerchantLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { merchant, logoutMerchant } = useMerchant()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

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
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => navigate('/merchant/profile'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: handleLogout,
      danger: true,
    },
  ]

  // Add click handler for mobile or explicit trigger
  const handleProfileClick = (e) => {
    e.preventDefault();
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        style={{
          background: '#001529', // Dark premium sidebar
          boxShadow: '2px 0 8px rgba(0,0,0,0.15)',
          zIndex: 10
        }}
        breakpoint="lg"
        collapsedWidth="80"
      >
        <div style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Logo */}
          <div style={{
            padding: '24px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            transition: 'all 0.2s',
            background: 'rgba(255,255,255,0.05)'
          }}>
            <Link to="/merchant/dashboard" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              textDecoration: 'none',
              width: '100%',
              justifyContent: collapsed ? 'center' : 'flex-start'
            }}>
              <Avatar
                size={32}
                icon={<ShopOutlined />}
                style={{
                  background: 'linear-gradient(135deg, #40a9ff, #096dd9)',
                  flexShrink: 0
                }}
              />
              {!collapsed && (
                <Text strong style={{ fontSize: 18, color: '#fff', letterSpacing: '0.5px' }}>
                  STT Business
                </Text>
              )}
            </Link>
          </div>

          {/* Navigation */}
          <div style={{ flex: 1, padding: '16px 0', overflowY: 'auto' }}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[location.pathname]}
              items={menuItems}
              style={{
                background: 'transparent',
                border: 'none',
                fontWeight: 500
              }}
            />
          </div>

          {/* Quick Action Button - Bottom */}
          {!collapsed && (
            <div style={{ padding: '16px 24px' }}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                block
                size="large"
                shape="round"
                style={{
                  background: 'linear-gradient(90deg, #1890ff, #40a9ff)',
                  border: 'none',
                  boxShadow: '0 4px 10px rgba(24, 144, 255, 0.3)',
                  fontWeight: 600
                }}
                onClick={() => navigate('/merchant/events/create')}
              >
                Create Event
              </Button>
            </div>
          )}
        </div>
      </Sider>

      <Layout>
        <Header style={{
          background: colorBgContainer,
          padding: '0 24px',
          height: 72,
          boxShadow: '0 1px 4px rgba(0,0,0,0.02)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 999
        }}>
          <Space>
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 48,
                height: 48,
              }}
            />
            <Title level={4} style={{ margin: 0, fontSize: 18, color: '#001529' }}>
              Dashboard
            </Title>
          </Space>

          <Space size={16}>
            <Badge count={5} size="small" offset={[-2, 2]}>
              <Button
                type="text"
                icon={<BellOutlined style={{ fontSize: 18, color: '#595959' }} />}
                shape="circle"
                size="large"
              />
            </Badge>

            <div style={{ position: 'relative' }}>
              <div
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  transition: 'background 0.3s'
                }}
                className="hover:bg-gray-100"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              >
                <Space>
                  <div style={{ textAlign: 'right' }} className="hidden md:block">
                    <Text strong style={{ display: 'block', fontSize: 14, color: '#262626' }}>
                      {merchant?.businessName || 'Business Name'}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>
                      {merchant?.subscriptionType || 'Premium'} Merchant
                    </Text>
                  </div>
                  <Avatar
                    size={40}
                    icon={<UserOutlined />}
                    style={{ background: '#001529', color: '#fff' }}
                    src={merchant?.logo}
                  />
                </Space>
              </div>

              {/* Manual Dropdown Menu */}
              {profileDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '160px',
                    marginTop: '4px',
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '4px',
                    zIndex: 2000,
                    border: '1px solid #f0f0f0',
                    transformOrigin: 'top right',
                    animation: 'slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <div
                    onClick={() => {
                      navigate('/merchant/profile')
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#262626',
                      borderRadius: '4px',
                      fontSize: '13px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <UserOutlined style={{ fontSize: '14px' }} /> <span style={{ fontWeight: 500 }}>My Profile</span>
                  </div>
                  <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '2px 0' }} />
                  <div
                    onClick={() => {
                      handleLogout()
                      setProfileDropdownOpen(false)
                    }}
                    style={{
                      padding: '6px 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ff4d4f',
                      borderRadius: '4px',
                      fontSize: '13px',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff1f0'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <LogoutOutlined style={{ fontSize: '14px' }} /> <span style={{ fontWeight: 500 }}>Sign Out</span>
                  </div>
                  {/* Backdrop */}
                  <div
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: -1,
                      cursor: 'default'
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setProfileDropdownOpen(false)
                    }}
                  />
                </div>
              )}
            </div>
          </Space>
        </Header>

        <Content style={{
          margin: '24px',
          padding: 0,
          minHeight: 280,
          background: 'transparent',
          position: 'relative'
        }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MerchantLayout