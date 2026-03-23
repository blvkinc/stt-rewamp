import React from 'react'
import { Row, Col, Card, Typography, Button, List, Tag, Space, Badge } from 'antd'
import { CheckOutlined, CloseOutlined, CrownFilled, RocketOutlined } from '@ant-design/icons'
import { useMerchant } from '../../shared/context/MerchantContext'
import { useNavigate } from 'react-router-dom'

const { Title, Text, Paragraph } = Typography

const MerchantPlansPage = () => {
    const { merchant } = useMerchant()
    const navigate = useNavigate()

    const currentPlan = merchant?.subscriptionType || 'Free'

    const plans = [
        {
            title: 'Starter',
            price: 'Free',
            period: 'forever',
            description: 'Essential tools to start selling tickets and managing events.',
            features: [
                'Unlimited Events',
                'Basic Analytics Dashboard',
                'Standard Payment Processing',
                'Email Support',
                'Up to 1000 Attendees/mo'
            ],
            notIncluded: [
                'Exportable Reports',
                'Advanced Customer Insights',
                'Priority Support',
                'White-labeling'
            ],
            color: '#595959',
            buttonText: 'Current Plan',
            isCurrent: currentPlan === 'Free',
            type: 'Free'
        },
        {
            title: 'Business',
            price: 'AED 299',
            period: '/ month',
            description: 'Advanced features for growing event businesses.',
            features: [
                'Everything in Starter',
                'Advanced Analytics & Reports',
                'Export Data (CSV, PDF)',
                'Priority 24/7 Support',
                'Unlimited Attendees',
                'Promotional Tools'
            ],
            notIncluded: [
                'Dedicated Account Manager',
                'API Access'
            ],
            color: '#1890ff',
            highlight: true,
            buttonText: 'Upgrade to Business',
            isCurrent: currentPlan === 'Premium',
            type: 'Premium'
        },
        {
            title: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'Tailored solutions for large scale organizations.',
            features: [
                'Everything in Business',
                'Dedicated Account Manager',
                'API Access',
                'Custom Integrations',
                'White-label Widget',
                'SLA Guarantees'
            ],
            notIncluded: [],
            color: '#722ed1',
            buttonText: 'Contact Sales',
            isCurrent: currentPlan === 'Enterprise',
            type: 'Enterprise'
        }
    ]

    const handleSubscribe = (planType) => {
        if (planType === 'Enterprise') {
            window.location.href = 'mailto:sales@stt.com'
        } else {
            // Placeholder for payment flow
            alert(`Proceeding to payment for ${planType} plan`)
        }
    }

    return (
        <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
                <Title level={1}>Choose the Right Plan for Your Business</Title>
                <Paragraph type="secondary" style={{ fontSize: 18 }}>
                    Upgrade your event management capabilities with our premium tools.
                </Paragraph>
            </div>

            <Row gutter={[24, 24]} align="top">
                {plans.map((plan, index) => (
                    <Col xs={24} md={8} key={index}>
                        <Badge.Ribbon
                            text="RECOMMENDED"
                            color="#faad14"
                            style={{ display: plan.highlight ? 'block' : 'none' }}
                        >
                            <Card
                                hoverable
                                style={{
                                    height: '100%',
                                    border: plan.highlight ? '2px solid #1890ff' : '1px solid #f0f0f0',
                                    borderRadius: 16,
                                    boxShadow: plan.highlight ? '0 8px 24px rgba(24,144,255,0.15)' : 'none'
                                }}
                                bodyStyle={{ padding: 32, display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                                    <Title level={3} style={{ marginBottom: 8, color: plan.color }}>
                                        {plan.title === 'Business' && <RocketOutlined style={{ marginRight: 8 }} />}
                                        {plan.title === 'Enterprise' && <CrownFilled style={{ marginRight: 8 }} />}
                                        {plan.title}
                                    </Title>
                                    <Paragraph type="secondary">{plan.description}</Paragraph>
                                    <div style={{ marginTop: 24, marginBottom: 24 }}>
                                        <Text style={{ fontSize: 36, fontWeight: 'bold' }}>{plan.price}</Text>
                                        <Text type="secondary" style={{ fontSize: 16 }}> {plan.period}</Text>
                                    </div>
                                    <Button
                                        type={plan.highlight ? 'primary' : 'default'}
                                        size="large"
                                        block
                                        style={{
                                            height: 48,
                                            fontWeight: 600,
                                            borderRadius: 8,
                                            background: plan.highlight ? 'linear-gradient(90deg, #1890ff, #40a9ff)' : undefined,
                                            border: plan.highlight ? 'none' : undefined
                                        }}
                                        disabled={plan.isCurrent}
                                        onClick={() => handleSubscribe(plan.type)}
                                    >
                                        {plan.isCurrent ? 'Current Plan' : plan.buttonText}
                                    </Button>
                                </div>

                                <div style={{ flex: 1 }}>
                                    <List
                                        dataSource={[...plan.features, ...plan.notIncluded]}
                                        split={false}
                                        renderItem={(item, i) => {
                                            const isIncluded = i < plan.features.length;
                                            return (
                                                <List.Item style={{ padding: '8px 0', border: 'none' }}>
                                                    <Space align="start">
                                                        {isIncluded ? (
                                                            <CheckOutlined style={{ color: '#52c41a', marginTop: 4 }} />
                                                        ) : (
                                                            <CloseOutlined style={{ color: '#d9d9d9', marginTop: 4 }} />
                                                        )}
                                                        <Text style={{ color: isIncluded ? '#262626' : '#bfbfbf' }}>
                                                            {item}
                                                        </Text>
                                                    </Space>
                                                </List.Item>
                                            )
                                        }}
                                    />
                                </div>
                            </Card>
                        </Badge.Ribbon>
                    </Col>
                ))}
            </Row>

            <div style={{ marginTop: 64, textAlign: 'center', padding: 40, background: '#fafafa', borderRadius: 16 }}>
                <Title level={3}>Frequently Asked Questions</Title>
                <Row gutter={[48, 24]} style={{ marginTop: 32, textAlign: 'left' }}>
                    <Col xs={24} md={12}>
                        <Title level={5}>Can I cancel my subscription anytime?</Title>
                        <Paragraph type="secondary">
                            Yes, you can downgrade to the free plan at any time. Your premium features will remain active until the end of your billing cycle.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={5}>Do you charge transaction fees?</Title>
                        <Paragraph type="secondary">
                            We charge a standard processing fee for ticket sales on the Free tier. The Business tier offers reduced transaction fees.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={5}>What happens if I exceed my attendee limit?</Title>
                        <Paragraph type="secondary">
                            We'll notify you if you're nearing your limit. You can upgrade to the next tier or pay a small overage fee for additional checking-ins.
                        </Paragraph>
                    </Col>
                    <Col xs={24} md={12}>
                        <Title level={5}>Can I request a custom feature?</Title>
                        <Paragraph type="secondary">
                            Enterprise clients have access to our roadmap and can request custom integrations and features tailored to their needs.
                        </Paragraph>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default MerchantPlansPage

