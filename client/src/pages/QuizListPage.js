import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'unc-react-creator/dist/Containers/Popup';
import {
  Button,
  Table,
  Tag,
  Space
} from 'antd';
import {
  DeleteOutlined,
  AppstoreAddOutlined,
  EditOutlined,
  PlayCircleOutlined

} from '@ant-design/icons';

import * as actions from '../redux/actions';
import QuizForm from './components/QuizForm';

const QuizListPage = () => {
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state) => state.quizReducer);
  const { authUser } = useSelector((state) => state.userReducer);
  const [dataSource, setDataSource] = useState([]);

  const handleClick = (quiz) => {
    Popup.open({
      width: 720,
      content: <QuizForm quiz={quiz} />
    });
  };

  const removeClick = (quiz) => {
    dispatch(actions.deleteQuizAsync(quiz));
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Questions',
      dataIndex: 'questions',
      key: 'questions',
      render: (_, { questions }) => (
        <Tag color={'green'}>
          {questions.length}
        </Tag>
      )
    },
    {
      title: 'Options',
      key: 'options',
      render: (_, quiz) => (
        <Space size='middle'>
          <DeleteOutlined onClick={() => removeClick(quiz)} />
          <EditOutlined onClick={() => handleClick(quiz)} />
          <Link to={`/quiz/${quiz._id}`}> {/* eslint-disable-line */}
            <AppstoreAddOutlined />
          </Link>
          <Link to={`/quiz/${quiz._id}/play`}> {/* eslint-disable-line */}
            <PlayCircleOutlined />
          </Link>

        </Space>
      )
    }
  ];

  useEffect(() => {
    if (!quizzes) {
      dispatch(actions.setQuizzesAsync());
    } else {
      setDataSource(quizzes.map((quiz, idx) => ({
        key: idx,
        _id: quiz._id, // eslint-disable-line
        name: quiz.name,
        questions: quiz.questions
      })));
    }
  }, [quizzes]);

  return (
    <div className='unc-quiz container'>
      <div className='float-end m-3'>
        Hola {authUser.name} &nbsp;
        <Button type='primary' onClick={() => dispatch(actions.setAuthUser(undefined))}>Logout</Button>
      </div>

      <h1>Quiz List</h1>

      <Button type='primary' onClick={() => handleClick()}>Create Quiz</Button>

      <div className='my-3'>
        {(!quizzes && 'loading...') || (!quizzes.length && 'No quizzes')}

        {quizzes?.length > 0 && <Table dataSource={dataSource} columns={columns} />}
      </div>
    </div>
  );
};

export default QuizListPage;
