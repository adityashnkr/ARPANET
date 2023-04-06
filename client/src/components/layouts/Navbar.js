import React, { useRef, useState } from 'react';
import logo from '../../img/logo.ico';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

export const Navbar = () => {
	const [navbar, setNavbar] = useState(false);
	const navRef = useRef();
	const showNavbar = () => {
		navRef.current.classList.toggle('responsive_nav');
	};
	const changeNavbar = () => {
		if (window.scrollY >= 80) setNavbar(true);
		else setNavbar(false);
	};
	window.addEventListener('scroll', changeNavbar);
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	const dispatch = useDispatch();

	const authLinks = (
		<ul>
			<li>
				<Link to='/dashboard' onClick={showNavbar}>
					Dashboard
				</Link>
			</li>
			<li>
				<Link to='/posts' onClick={showNavbar}>
					Posts
				</Link>
			</li>
			<li>
				<Link to='/profiles' onClick={showNavbar}>
					Developers
				</Link>
			</li>
			<li className='log'>
				<a
					onClick={() => {
						dispatch(logout());
						showNavbar();
					}}
					href='/'>
					<i className='fas fa-sign-out-alt'></i> Logout
				</a>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<a href='/profiles' onClick={showNavbar}>
					Developers
				</a>
			</li>
			<li>
				<a href='/register' onClick={showNavbar}>
					Register
				</a>
			</li>
			<li className='log'>
				<a href='/login' onClick={showNavbar}>
					<i className='fa-solid fa-right-to-bracket' /> Login
				</a>
			</li>
		</ul>
	);
	return (
		<>
			<nav className={navbar ? 'navbar active' : 'navbar'} ref={navRef}>
				<Link to='/' onClick={showNavbar}>
					<img
						className='web-logo'
						src={logo}
						alt='logo'
						width='58'
						height='58'></img>
				</Link>
				{isAuthenticated ? authLinks : guestLinks}
			</nav>
			<i className='btn btn-nav fa-solid fa-bars' onClick={showNavbar}></i>
		</>
	);
};

Navbar.propTypes = {
	logout: PropTypes.func,
	isAuthenticated: PropTypes.bool,
};
