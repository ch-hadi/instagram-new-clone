import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Tabs } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import apiRequest from '../../utils/axiosIntercepter/apiClient';

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(true);

  const [loginForm, setLoginForm] = React.useState({
    email: '',
    password: '',
  });

  const [signupForm, setSignupForm] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value,
    });
  };

  const onFinishLogin = async () => {
    setLoading(true);
    setError(null);
    console.log('first',loginForm)
    try {
      const response = await apiRequest('POST','auth/login', loginForm);

      console.log('Login successful', response.data);
    //   localStorage.setItem('token', response.data.token);
    //   navigate('/dashboard');
    } catch (err) {
        console.log('err',err)
      if (err.response && err.response.status === 404) {
        setError('Invalid credentials. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } 
    finally {
      setLoading(false);
    }
  };

  const onFinishSignup = async () => {
    
    try {
      const response = await apiRequest('POST', '/users/register', signupForm);
      console.log('Signup successful', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
        console.log('err',err)
      if (err.response && err.response.status === 409) {
        setError(err.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  console.log(loginForm)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#f0f2f5' }}>
      <div style={{ display: 'flex', maxWidth: '100%', background: '#fff', boxShadow: '0 0 15px rgba(0,0,0,0.1)' }}>
        <div style={{ flex: 1, background: '#000842', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src="https://readymadeui.com/signin-image.webp"
            alt="login"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: 1, padding: '40px' }}>
          <Tabs defaultActiveKey="1" onChange={(key) => setIsLogin(key === '1')}>
            <TabPane tab="Login" key="1">
              <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={onFinishLogin}
                layout="vertical"
              >
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    name="email"
                    value={loginForm.email}
                    onChange={handleLoginChange}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                  />
                </Form.Item>

                <Form.Item>
                  <Checkbox name="remember">Remember me</Checkbox>
                </Form.Item>

                {error && (
                  <Form.Item>
                    <p style={{ color: 'red' }}>{error}</p>
                  </Form.Item>
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Log in
                  </Button>
                </Form.Item>

                <Form.Item>
                  <a href="#">Forgot password?</a>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Sign Up" key="2">
              <Form
                name="signup"
                initialValues={{ remember: true }}
                onFinish={onFinishSignup}
                layout="vertical"
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please input your name!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Name"
                    name="name"
                    value={signupForm.name}
                    onChange={handleSignupChange}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please input your email!' }]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="Email"
                    name="email"
                    value={signupForm.email}
                    onChange={handleSignupChange}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                    name="password"
                    value={signupForm.password}
                    onChange={handleSignupChange}
                  />
                </Form.Item>

                {error && (
                  <Form.Item>
                    <p style={{ color: 'red' }}>{error}</p>
                  </Form.Item>
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit" block loading={loading}>
                    Sign Up
                  </Button>
                </Form.Item>
              </Form>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Login;
