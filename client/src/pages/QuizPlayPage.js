import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import Popup from 'unc-react-creator/dist/Containers/Popup';
import { Button } from 'antd';

import * as actions from '../redux/actions';

const QuizPlayPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams('id');
  const { quizzes } = useSelector((state) => state.quizReducer);
  const [quiz, setQuiz] = useState();

  const handleChange = (quest, answer) => {
    const temp = { ...quiz };
    temp.questions[quest].correct = quiz.questions[quest].correctAnswer === answer;
    setQuiz(temp);
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

      <Link to='/quiz'>
        <Button>Back</Button>
      </Link>

      <h3 className='my-5'>LET'S PLAY</h3>

      <div className='my-3'>
        {(!quiz && 'Loading..') || (quiz.questions.lenght === 0 && 'No questions')}

        {quiz?.questions.filter(
          (q) => q.answers.length > 0 && q.correctAnswer !== undefined
        ).map((quest, idx) => (
          <div key={idx} className={classNames('box', {
            correct: quest.correct,
            wrong: quest.correct === false
          })}>
            <h2>{quest.description}</h2>

            {quest.answers.map((answer, aidx) => (
              <div key={aidx} className='answer'>
                <input
                  type='radio'
                  name={idx}
                  onChange={() => handleChange(idx, aidx)}
                />
                {answer}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPlayPage;
