import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Render to Route component
 *
 * @return {Component} Route to Render
 */
const PrivateRoute = () => {
  const authUser = useSelector((state) => state.userReducer.authUser);

  return authUser ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
