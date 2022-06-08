import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import img01 from '../assets/img/01.jpg';

const WelcomePage = () => (
  <div className='unc-welcome'>
    <div className='content'>
      <img src={img01} className='my-5 d-block' width={300} />
      <Link to='/login'>
        <Button className='me-3' type='primary'>Login</Button>
      </Link>
      <Link to='/register'>
        <Button className='me-3' type='primary'>Register</Button>
      </Link>
    </div>
  </div>
);

export default WelcomePage;
