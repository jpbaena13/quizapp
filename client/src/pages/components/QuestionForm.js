import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import Popup from 'unc-react-creator/dist/Containers/Popup';

import * as actions from '../../redux/actions';

const QuestionForm = ({ quiz }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * Handle Submit
   */
  const onFinish = async (values) => {
    setLoading(true);
    await dispatch(actions.addQuestionAsync({ question: values, quiz }));
    setLoading(false);
    Popup.close();
  };

  /**
   * Render
   */
  return (
    <Form
      className='unc-form'
      onFinish={onFinish}
    >
      <div className='unc-form-name'>Add Question</div>

      <Form.Item
        name='name'
        rules={ [{ required: true, message: 'Please input the question name' }] }
      >
        <Input
          autoFocus={true}
          placeholder='Insert the question name'
        />
      </Form.Item>

      <Form.Item
        name='description'
        rules={ [{ required: true, message: 'Please input the question description' }] }
      >
        <Input
          placeholder='Insert the question description'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='me-3' loading={loading}>
          Create
        </Button>
        <Button onClick={Popup.close}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuestionForm;
