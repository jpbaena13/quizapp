import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import Popup from 'unc-react-creator/dist/Containers/Popup';

import * as actions from '../../redux/actions';

const QuizForm = ({ quiz }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * Handle Submit
   */
  const onFinish = async (values) => {
    setLoading(true);
    if (quiz) {
      const temp = { ...quiz };
      temp.name = values.name;
      temp.questions = [];
      await dispatch(actions.updateQuizAsync(temp));
    } else {
      await dispatch(actions.createQuizAsync(values));
    }
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
      initialValues={{
        name: quiz?.name
      }}
    >
      <div className='unc-form-name'>
        {!quiz && 'Create Quiz'}
        {quiz && 'Update Quiz'}
      </div>

      <Form.Item
        name='name'
        rules={ [{ required: true, message: 'Please input the quiz name' }] }
      >
        <Input
          autoFocus={true}
          placeholder='Insert the quiz name'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='me-3' loading={loading}>
          {!quiz && 'Create'}
          {quiz && 'Update'}
        </Button>
        <Button onClick={Popup.close}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default QuizForm;
