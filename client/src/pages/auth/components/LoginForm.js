import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import * as actions from '../../../redux/actions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * Handle Submit
   */
  const onFinish = async (values) => {
    setLoading(true);
    await dispatch(actions.setAuthUserAsync(values));
    setLoading(false);
  };

  /**
   * Render
   */
  return (
    <Form
      className='unc-form login-form'
      onFinish={onFinish}
    >
      <div className='unc-form-name'>Login</div>

      <Form.Item
        name='email'
        rules={ [{ required: true, message: 'Please input your email' }] }
      >
        <Input
          autoFocus={true}
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Insert your email'
        />
      </Form.Item>

      <Form.Item
        name='password'
        rules={ [{ required: true, message: 'Please input your password' }] }
      >
        <Input
          type='password'
          prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Insert your password'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='w-100 mb-2' loading={loading}>
          Login
        </Button>

        <Link to='/register'>Register</Link>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
