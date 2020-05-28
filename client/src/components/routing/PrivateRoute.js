import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';
import Spinner from '../../components/layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [authState] = useAuth();
  const { isAuthenticated, loading } = authState;
  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/login' />
        )
      }
    />
  );
};

export default PrivateRoute;
