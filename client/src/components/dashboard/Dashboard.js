import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import store from '../../store';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import { DashboardActions } from './DashboardActions';
import { Experience } from './Experience';
import { Education } from './Education';

export const Dashboard = () => {
	const loading = useSelector((state) => state.auth.loading);
	const profile = useSelector((state) => state.profile.profile);
	const user = useSelector((state) => state.auth.user);
	useEffect(() => {
		store.dispatch(getCurrentProfile());
	}, []);
	return loading && profile === null ? (
		<Spinner />
	) : (
		<div className='container'>
			<h1 className='x-large'>Dashboard</h1>
			<p className='lead'> Welcome {user && user.name} 👋</p>
			{profile !== null ? (
				<>
					<DashboardActions />
					<Experience />
					<Education />
					<br />
					<button
						className='btn btn-primary'
						onClick={() => store.dispatch(deleteAccount())}>
						Delete my account
					</button>
				</>
			) : (
				<>
					<p>
						A profile-less existence is like a cake without frosting, it's
						missing that extra something special. Time to add the icing! 🎂
					</p>
					<br />
					<br />
					<Link to='/create-profile' className='btn btn-primary'>
						Create Profile
					</Link>
					<br />
				</>
			)}
		</div>
	);
};

Dashboard.propTypes = {
	loading: PropTypes.bool,
	getCurrentProfile: PropTypes.func,
	profile: PropTypes.object,
};
