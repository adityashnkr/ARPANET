import React, { Fragment } from 'react';
import logo from '../../img/logo.ico';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export const Navbar = () => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();
	const authLinks = (
		<ul>
			<li>
				<Link to='/dashboard'>Dashboard</Link>
			</li>
			<li>
				<Link to='/posts'>Posts</Link>
			</li>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li className='log'>
				<a onClick={() => dispatch(logout())} href='/'>
					<i className='fas fa-sign-out-alt'></i> Logout
				</a>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<a href='/profiles'>Developers</a>
			</li>
			<li>
				<a href='/register'>Register</a>
			</li>
			<li className='log'>
				<a href='/login'>Login</a>
			</li>
		</ul>
	);
	return (
		<nav className='navbar'>
			<Link to='/'>
				<img
					className='web-logo'
					src={logo}
					alt='logo'
					width='65'
					height='65'></img>
			</Link>
			{isAuthenticated ? authLinks : guestLinks}
		</nav>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};
