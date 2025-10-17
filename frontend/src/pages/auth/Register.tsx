import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, TeamOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { RegisterData } from '../../types/user';

const { Title, Text } = Typography;

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values: RegisterData) => {
    setLoading(true);
    try {
      await register(values);
      navigate('/dashboard');
    } catch (error) {
      // Error handled in AuthContext
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please input your password!'));
    }
    if (value.length < 8) {
      return Promise.reject(new Error('Password must be at least 8 characters!'));
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      return Promise.reject(new Error('Password must contain both uppercase and lowercase letters!'));
    }
    if (!/(?=.*\d)/.test(value)) {
      return Promise.reject(new Error('Password must contain at least one number!'));
    }
    if (!/(?=.*[!@#$%^&*])/.test(value)) {
      return Promise.reject(new Error('Password must contain at least one special character!'));
    }
    return Promise.resolve();
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      background: '#f0f2f5' 
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <Title level={2}>Create Account</Title>
            <Text type="secondary">Join the apartment management system</Text>
          </div>

          <Form
            form={form}
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="full_name"
              rules={[{ required: true, message: 'Please input your full name!' }]}
            >
              <Input
                prefix={<TeamOutlined />}
                placeholder="Full Name"
              />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
                { min: 3, message: 'Username must be at least 3 characters!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ validator: validatePassword }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ width: '100%' }}
              >
                Sign Up
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center' }}>
            <Text>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Register;