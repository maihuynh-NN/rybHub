import React from 'react';
import { Card, Row, Col, Typography, Space, Tag } from 'antd';
import { 
  HomeOutlined, 
  BuildOutlined, 
  ToolOutlined, 
  TeamOutlined 
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';

const { Title, Text } = Typography;

const Dashboard: React.FC = () => {
  const { user, hasRole } = useAuth();

  const statsCards = [
    {
      title: 'Total Apartments',
      value: '8',
      icon: <BuildOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      description: 'Currently managed'
    },
    {
      title: 'Empty Rooms',
      value: '12',
      icon: <HomeOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      description: 'Available for rent'
    },
    {
      title: 'Maintenance Tasks',
      value: '5',
      icon: <ToolOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
      description: 'Pending completion'
    },
    {
      title: 'Total Tenants',
      value: '45',
      icon: <TeamOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      description: 'Active residents'
    }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Welcome Section */}
      <Card>
        <Row align="middle" justify="space-between">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
              Welcome back, {user?.full_name || 'User'}!
            </Title>
            <Text type="secondary">
              Here's what's happening with your apartments today.
            </Text>
          </Col>
          <Col>
            <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px' }}>
              {user?.role? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Guest'} User
            </Tag>
          </Col>
        </Row>
      </Card>

      {/* Stats Cards */}
      <Row gutter={[16, 16]}>
        {statsCards.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Row align="middle" gutter={16}>
                <Col>
                  {stat.icon}
                </Col>
                <Col flex={1}>
                  <div>
                    <Title level={2} style={{ margin: 0, lineHeight: 1 }}>
                      {stat.value}
                    </Title>
                    <Text strong>{stat.title}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {stat.description}
                    </Text>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Feature Cards for different user roles */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Group Forum" extra={<Text type="secondary">Coming Soon</Text>}>
            <Text type="secondary">
              Team discussions and announcements will appear here.
            </Text>
          </Card>
        </Col>
        
        <Col xs={24} lg={12}>
          <Card title="To-Do List" extra={<Text type="secondary">Coming Soon</Text>}>
            <Text type="secondary">
              Track and manage your daily tasks and maintenance requests.
            </Text>
          </Card>
        </Col>

        {hasRole(['admin', 'privileged']) && (
          <Col xs={24}>
            <Card title="Activity Log" extra={<Text type="secondary">Admin Feature</Text>}>
              <Text type="secondary">
                Monitor system activities and changes made by team members.
              </Text>
            </Card>
          </Col>
        )}
      </Row>

      {/* Sprint Progress */}
      <Card title="Development Progress">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card size="small">
              <Tag color="green">✓ Completed</Tag>
              <Title level={5} style={{ marginTop: '8px' }}>Sprint 1</Title>
              <Text type="secondary">Authentication & Basic Navigation</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small">
              <Tag color="orange">In Progress</Tag>
              <Title level={5} style={{ marginTop: '8px' }}>Sprint 2</Title>
              <Text type="secondary">Apartment & Room Management</Text>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card size="small">
              <Tag color="blue">Planned</Tag>
              <Title level={5} style={{ marginTop: '8px' }}>Sprint 3</Title>
              <Text type="secondary">Maintenance & Billing Systems</Text>
            </Card>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default Dashboard;