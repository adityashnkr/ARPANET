import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
export const PrivateRoute = (props) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const loading = useSelector((state) => state.auth.loading);
	return isAuthenticated && !loading ? <Outlet /> : <Navigate to='/login' />;
};

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool,
	loading: PropTypes.bool,
};
