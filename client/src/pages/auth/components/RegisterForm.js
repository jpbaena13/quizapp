import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';

import Api from '../../../api';
import * as actions from '../../../redux/actions';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * Handle Submit
   */
  const onFinish = async (values) => {
    setLoading(true);
    const response = await Api.user.create(values);
    dispatch(actions.setAuthUser(response.user));
    setLoading(false);
  };

  /**
   * Render
   */
  return (
    <Form
      form={form}
      className='unc-form register-form'
      onFinish={onFinish}
    >
      <div className='unc-form-name'>Register</div>

      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your name' }]}
      >
        <Input
          autoFocus={true}
          prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='Insert your name'
        />
      </Form.Item>

      <Form.Item
        name='email'
        rules={ [{ required: true, message: 'Please input your email' }] }
      >
        <Input
          prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
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
          Register
        </Button>

        <Link to='/login'>Login</Link>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
