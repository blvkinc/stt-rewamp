import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Card, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Row, 
  Col, 
  Alert, 
  Checkbox,
  Form,
  Divider
} from 'antd'
import { 
  MailOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  BankOutlined
} from '@ant-design/icons'
import { useMerchant } from '../../context/MerchantContext'

const { Title, Paragraph, Text } = Typography

const MerchantAuthPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { loginMerchant } = useMerchant()
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await loginMerchant(values.email, values.password)
      if (result.success) {
        setSuccess('Login successful! Redirecting to dashboard...')
        // Redirect based on role
        const redirectPath = values.email === 'admin@stt.com' ? '/admin/dashboard' : '/merchant/dashboard'
        setTimeout(() => navigate(redirectPath), 1500)
      } else {
        setError(result.error || 'Login failed')
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    
    setLoading(false)
  }

  const fillDemoCredentials = (type) => {
    if (type === 'merchant') {
      form.setFieldsValue({ email: 'merchant@example.com', password: 'password123' })
    } else {
      form.setFieldsValue({ email: 'admin@stt.com', password: 'admin123' })
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 24px'
    }}>
      <div style={{ maxWidth: 480, width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Link to="/" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginBottom: 32,
            textDecoration: 'none'
          }}>
            <div style={{
              width: 48,
              height: 48,
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 12,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}>
              <BankOutlined style={{ color: 'white', fontSize: 24 }} />
            </div>
            <Title level={2} style={{ color: 'white', margin: 0, fontWeight: 700 }}>
              STT Business
            </Title>
          </Link>
          
          <Title level={1} style={{ 
            color: 'white', 
            marginBottom: 16,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Welcome Back
          </Title>
          
          <Paragraph style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: 18,
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Sign in to your merchant dashboard
          </Paragraph>
        </div>

        {/* Form */}
        <Card style={{ 
          borderRadius: 20,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          border: 'none',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          marginBottom: 24
        }}>
          <div style={{ padding: 32 }}>
            {/* Error/Success Messages */}
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: 24, borderRadius: 12 }}
              />
            )}
            
            {success && (
              <Alert
                message={success}
                type="success"
                showIcon
                style={{ marginBottom: 24, borderRadius: 12 }}
              />
            )}

            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="business@example.com"
                  style={{ borderRadius: 12 }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter your password' }]}
              >
                <Input.Password 
                  prefix={<LockOutlined />} 
                  placeholder="••••••••"
                  iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  style={{ borderRadius: 12 }}
                />
              </Form.Item>

              <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                  <Checkbox>Remember me</Checkbox>
                </Col>
                <Col>
                  <Link to="#" style={{ color: '#1890ff' }}>
                    Forgot password?
                  </Link>
                </Col>
              </Row>

              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                  block
                  style={{ 
                    borderRadius: 12,
                    height: 48,
                    fontSize: 16,
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #764ba2, #667eea)',
                    border: 'none'
                  }}
                >
                  Sign In
                </Button>
              </Form.Item>
            </Form>

            {/* Demo Credentials */}
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Divider>Demo Credentials</Divider>
              
              {/* Merchant Credentials */}
              <Card size="small" style={{ background: '#e6f7ff', border: '1px solid #91d5ff' }}>
                <Title level={5} style={{ margin: 0, marginBottom: 8, color: '#0050b3' }}>
                  🏢 Merchant Demo
                </Title>
                <Text style={{ display: 'block', marginBottom: 8, color: '#096dd9' }}>
                  Regular merchant account:
                </Text>
                <Text code style={{ display: 'block', marginBottom: 4 }}>
                  Email: merchant@example.com
                </Text>
                <Text code style={{ display: 'block', marginBottom: 12 }}>
                  Password: password123
                </Text>
                <Button 
                  size="small" 
                  onClick={() => fillDemoCredentials('merchant')}
                  style={{ background: '#40a9ff', color: 'white', border: 'none' }}
                >
                  Fill Merchant Credentials
                </Button>
              </Card>

              {/* Super Admin Credentials */}
              <Card size="small" style={{ background: '#fff2e8', border: '1px solid #ffbb96' }}>
                <Title level={5} style={{ margin: 0, marginBottom: 8, color: '#d4380d' }}>
                  🛡️ Super Admin Demo
                </Title>
                <Text style={{ display: 'block', marginBottom: 8, color: '#fa541c' }}>
                  Platform administrator access:
                </Text>
                <Text code style={{ display: 'block', marginBottom: 4 }}>
                  Email: admin@stt.com
                </Text>
                <Text code style={{ display: 'block', marginBottom: 8 }}>
                  Password: admin123
                </Text>
                <Text style={{ display: 'block', marginBottom: 12, fontSize: 12, color: '#fa541c' }}>
                  ⚠️ Full platform management access
                </Text>
                <Button 
                  size="small" 
                  onClick={() => fillDemoCredentials('admin')}
                  style={{ background: '#ff7a45', color: 'white', border: 'none' }}
                >
                  Fill Admin Credentials
                </Button>
              </Card>

              {/* Debug Clear Storage */}
              <Button
                block
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
                style={{ background: '#f5f5f5', border: '1px solid #d9d9d9' }}
              >
                🔧 Clear Storage & Refresh (Debug)
              </Button>
            </Space>

            {/* Sign Up Link */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Text type="secondary">New to Set The Table?</Text>
              <Link
                to="/merchant/onboarding"
                style={{ marginLeft: 4, color: '#1890ff' }}
              >
                Apply to become a partner
              </Link>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <Card style={{ 
          borderRadius: 20,
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          textAlign: 'center',
          marginBottom: 24
        }}>
          <Title level={4} style={{ color: 'white', marginBottom: 16 }}>
            Why Partner with STT?
          </Title>
          <Row gutter={16}>
            <Col span={8} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📈</div>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                Increase Revenue
              </Text>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>👥</div>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                Reach More Customers
              </Text>
            </Col>
            <Col span={8} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>
                Analytics & Insights
              </Text>
            </Col>
          </Row>
        </Card>

        {/* Back to Customer Site */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14 }}>
            ← Back to customer site
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MerchantAuthPage