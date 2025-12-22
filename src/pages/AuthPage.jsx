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
  UserOutlined, 
  PhoneOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone,
  GoogleOutlined,
  FacebookOutlined
} from '@ant-design/icons'
import { useAuth } from '../context/AuthContext'

const { Title, Paragraph, Text } = Typography

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [form] = Form.useForm()

  const handleSubmit = async (values) => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (isLogin) {
        // Login logic
        const result = await login(values.email, values.password)
        if (result.success) {
          setSuccess('Login successful! Redirecting...')
          setTimeout(() => navigate('/'), 1500)
        } else {
          setError(result.error || 'Login failed')
        }
      } else {
        // Registration logic
        const result = await register(values)
        if (result.success) {
          setSuccess('Account created successfully! Welcome to Set The Table!')
          setTimeout(() => navigate('/'), 2000)
        } else {
          setError(result.error || 'Registration failed')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    
    setLoading(false)
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>S</Text>
            </div>
            <Title level={2} style={{ color: 'white', margin: 0, fontWeight: 700 }}>
              Set The Table
            </Title>
          </Link>
          
          <Title level={1} style={{ 
            color: 'white', 
            marginBottom: 16,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 700,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            {isLogin ? 'Welcome back' : 'Create your account'}
          </Title>
          
          <Paragraph style={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: 18,
            margin: 0,
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            {isLogin 
              ? 'Sign in to your account to continue your culinary journey' 
              : 'Join us and discover amazing dining experiences in Dubai'
            }
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
              {!isLogin && (
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="firstName"
                      label="First Name"
                      rules={[{ required: true, message: 'Please enter your first name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />} 
                        placeholder="John"
                        style={{ borderRadius: 12 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="lastName"
                      label="Last Name"
                      rules={[{ required: true, message: 'Please enter your last name' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Doe"
                        style={{ borderRadius: 12 }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              )}

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
                  placeholder="john@example.com"
                  style={{ borderRadius: 12 }}
                />
              </Form.Item>

              {!isLogin && (
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter your phone number' }]}
                >
                  <Input 
                    prefix={<PhoneOutlined />} 
                    placeholder="+971 50 123 4567"
                    style={{ borderRadius: 12 }}
                  />
                </Form.Item>
              )}

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

              {!isLogin && (
                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve()
                        }
                        return Promise.reject(new Error('Passwords do not match'))
                      },
                    }),
                  ]}
                >
                  <Input.Password 
                    prefix={<LockOutlined />} 
                    placeholder="••••••••"
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    style={{ borderRadius: 12 }}
                  />
                </Form.Item>
              )}

              {isLogin && (
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
              )}

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
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    border: 'none'
                  }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </Form.Item>
            </Form>

            {/* Social Login */}
            <Divider>Or continue with</Divider>

            <Row gutter={12}>
              <Col span={12}>
                <Button 
                  icon={<GoogleOutlined />} 
                  block
                  style={{ borderRadius: 12, height: 44 }}
                >
                  Google
                </Button>
              </Col>
              <Col span={12}>
                <Button 
                  icon={<FacebookOutlined />} 
                  block
                  style={{ borderRadius: 12, height: 44 }}
                >
                  Facebook
                </Button>
              </Col>
            </Row>

            {/* Toggle */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <Text type="secondary">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </Text>
              <Button
                type="link"
                onClick={() => {
                  setIsLogin(!isLogin)
                  form.resetFields()
                  setError('')
                  setSuccess('')
                }}
                style={{ padding: 0, marginLeft: 4 }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </div>
          </div>
        </Card>

        {/* Premium Upgrade CTA */}
        {!isLogin && (
          <Card style={{ 
            borderRadius: 20,
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            textAlign: 'center'
          }}>
            <Title level={4} style={{ color: 'white', marginBottom: 8 }}>
              Upgrade to Premium
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}>
              Get exclusive access to premium venues, earn reward points, and enjoy priority booking
            </Paragraph>
            <Button 
              style={{ 
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                borderRadius: 12
              }}
            >
              Learn More
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

export default AuthPage
