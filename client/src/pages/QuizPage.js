import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Popup from 'unc-react-creator/dist/Containers/Popup';
import { Button, Collapse, Space } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import * as actions from '../redux/actions';
import QuestionForm from './components/QuestionForm';
import AnswerForm from './components/AnswerForm';

const { Panel } = Collapse;

const QuizPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams('id');
  const { quizzes } = useSelector((state) => state.quizReducer);
  const [quiz, setQuiz] = useState();

  const handleClick = () => {
    Popup.open({
      width: 720,
      content: <QuestionForm quiz={quiz} />
    });
  };

  const handleAnswerClick = (quest) => {
    Popup.open({
      width: 720,
      content: <AnswerForm quiz={quiz} question={quest} />
    });
  };

  const handleSave = () => {
    dispatch(actions.updateQuizAsync(quiz));
  };

  const handleChange = (quest, answer) => {
    const temp = { ...quiz, modified: 1 };
    temp.questions[quest].modified = 1;
    temp.questions[quest].correctAnswer = answer;
    dispatch(actions.updateQuiz(temp));
  };

  const handleRemove = (quest) => {
    const temp = { ...quiz };
    temp.questions[quest].removed = true;
    dispatch(actions.updateQuizAsync(temp));
  };

  useEffect(() => {
    if (!quizzes) {
      dispatch(actions.setQuizzesAsync());
    } else {
      setQuiz(quizzes.find((q) => q._id === id)); // eslint-disable-line
    }
  }, [quizzes]);

  return (
    <div className='unc-quiz container'>
      <h1>Quiz: <i>{quiz?.name}</i></h1>

      {!quiz?.modified
        && <>
          <Link to='/quiz'>
            <Button>Back</Button>
          </Link>
          <Button type='primary' className='mx-3' onClick={handleClick}>Add Question</Button>
        </>
      }

      {quiz?.modified && <Button type='primary' onClick={handleSave}>SAVE QUIZ</Button>}

      <h3 className='my-5'>Questions</h3>

      <div className='my-3'>
        {(!quiz && 'Loading..') || (quiz.questions.lenght === 0 && 'No questions')}

        <Collapse>
          {quiz?.questions.map((quest, idx) => (
            <Panel key={idx} header={quest.name}>
              <div className='float-end m-3'>
                <Space size='middle'>
                  <DeleteOutlined onClick={() => handleRemove(idx)} />
                </Space>
              </div>

              <h2>{quest.description}</h2>

              <div className='text-end p-2 my-5 border-bottom'>
                <Button type='primary' onClick={() => handleAnswerClick(quest)}>Add Answers</Button>
              </div>

              {quest.answers.map((answer, aidx) => (
                <div key={aidx} className='answer'>
                  <input
                    type='radio'
                    onChange={() => handleChange(idx, aidx)}
                    checked={quest.correctAnswer === aidx}
                  />
                  {answer}
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default QuizPage;
