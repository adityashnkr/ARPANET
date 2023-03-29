import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import { ProfileItems } from './ProfileItems';
import { getProfiles } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
export const Profiles = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getProfiles());
	}, [dispatch]);
	const profiles = useSelector((state) => state.profile.profiles);
	const loading = useSelector((state) => state.profile.loading);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<>
					<div className='container'>
						<h1 className='large text-primary'>Developers</h1>
						<p className='lead'>
							<i className='fab fa-connectdevelop'></i> Browse and connect with
							Developers around the world!
						</p>
						<div className='profiles'>
							{profiles.length > 0 ? (
								profiles.map((profile) => (
									<ProfileItems key={profile._id} profile={profile} />
								))
							) : (
								<h4>No Profiles Found</h4>
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
};

Profiles.propTypes = {
	getProfiles: PropTypes.func,
	profile: PropTypes.object,
};
