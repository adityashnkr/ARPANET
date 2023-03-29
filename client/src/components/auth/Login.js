import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export const Login = () => {
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(login(email, password));
	};
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	if (isAuthenticated) {
		return <Navigate to='/dashboard' />;
	}
	return (
		<Fragment>
			<div className='container'>
				<h1 className='large text-primary'>Sign In</h1>
				<p className='lead'>
					<i className='fas fa-user'></i> Sign into Your Account
				</p>
				<form className='form' onSubmit={onSubmit}>
					<div className='form-group'>
						<input
							type='email'
							placeholder='Email Address'
							name='email'
							onChange={onChange}
							required
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							placeholder='Password'
							name='password'
							onChange={onChange}
							minLength='6'
							required
						/>
					</div>
					<input type='submit' className='btn btn-primary' value='Login' />
				</form>
				<br />
				<p className='my-1'>
					Don't have an account? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</Fragment>
	);
};

Login.propTypes = {
	login: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};
