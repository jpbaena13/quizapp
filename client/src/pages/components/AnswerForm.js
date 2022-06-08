import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button } from 'antd';
import Popup from 'unc-react-creator/dist/Containers/Popup';

import * as actions from '../../redux/actions';

const AnswerForm = ({ quiz, question }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  /**
   * Handle Submit
   */
  const onFinish = ({ answer }) => {
    setLoading(true);
    const qtemp = { ...question };
    qtemp.modified = 1;
    qtemp.answers.push(answer);

    const temp = { ...quiz, modified: 1 };
    temp.questions = temp.questions.map((q) => (q._id === question._id) ? qtemp : q); // eslint-disable-line
    dispatch(actions.updateQuiz(temp));
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
      <div className='unc-form-name'>Add Answer</div>

      <Form.Item
        name='answer'
        rules={ [{ required: true, message: 'Please input the answer' }] }
      >
        <Input
          autoFocus={true}
          placeholder='Insert the answer'
        />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' className='me-3' loading={loading}>
          Add
        </Button>
        <Button onClick={Popup.close}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AnswerForm;
