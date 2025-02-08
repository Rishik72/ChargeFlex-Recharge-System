import React, { useState } from 'react';
import { Input, Form, Button, message } from 'antd';


import { useNavigate } from 'react-router-dom';
import AuthService from '../AuthService.js';
import './SignUp.css';
import AuthBackgroundImage from '../assets/auth-bckground-img.png';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    console.log(values);
    try {
      const res = await AuthService.register(values);
      console.log(res)
      if (res) {
        message.success('Signup Successful', 5);
        navigate('/login');
      } else {
        message.error('Something went wrong!', 5);
      }
    } catch (error) {
      console.log(error)
      message.error('An error occurred', 5);
    }
    setIsLoading(false);
  };

  return (
    <div className="main" >

      <div className="containerS">
        <div className="left-div">
          <img src={AuthBackgroundImage} alt="Background" className="background-img" />
        </div>

        <div className="right-Div">
          <h1 id="signup-heading">Sign Up</h1>
          <Form className='Form' onFinish={handleSubmit} layout="vertical">
            <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
              <Input placeholder="Enter your name" />
            </Form.Item>

            <Form.Item className='label' label="Phone Number" name="phone" rules={[
              { required: true, message: 'Please enter your phone number' },
              { pattern: /^[0-9]{10}$/, message: 'Enter a valid 10-digit phone number' }
            ]}>
              <Input className='input' placeholder="Enter your phone number" />
            </Form.Item>

            <Form.Item className='label' label="Email" name="email" rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email address' }
            ]}>
              <Input className='input' placeholder="Enter your email" />
            </Form.Item>

            <Form.Item className='label' label="Password" name="password" rules={[
              { required: true, message: 'Please enter a password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}>
              <Input.Password className='input' placeholder="Enter your password" />
            </Form.Item>

            <Form.Item className='label' label="Confirm Password" name="checkPassword" dependencies={['password']}
              rules={[
                { required: true, message: 'Please confirm your password' },
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
              <Input.Password className='input' placeholder="Confirm your password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isLoading} block>
                Register
              </Button>
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                Or <a href="/login">Login now!</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
