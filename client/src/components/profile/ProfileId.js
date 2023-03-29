import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layouts/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileTop } from './ProfileTop';
import { ProfileAbout } from './ProfileAbout';
import { ProfileExperience } from './ProfileExperience';
import { ProfileEducation } from './ProfileEducation';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ProfileId = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getProfileById(id));
	}, [getProfileById]);
	const loading = useSelector((state) => state.profile.loading);
	const auth = useSelector((state) => state.auth);
	const profile = useSelector((state) => state.profile.profile);
	return (
		<>
			{profile === null || loading ? (
				<Spinner />
			) : (
				<div className='container'>
					<ProfileTop />
					<br />
					<ProfileAbout />
					<br />
					<div className='profile-exp p-2'>
						<h2 className='text-primary'>Experience</h2>
						{profile.experience.length > 0 ? (
							<>
								{profile.experience.map((experience) => (
									<ProfileExperience
										key={experience._id}
										experience={experience}
									/>
								))}
							</>
						) : (
							<h4>No experience credentials</h4>
						)}
					</div>
					<br />
					<div className='profile-edu p-2'>
						<h2 className='text-primary'>Education</h2>
						{profile.education.length > 0 ? (
							<>
								{profile.education.map((education) => (
									<ProfileEducation key={education._id} education={education} />
								))}
							</>
						) : (
							<h4>No education credentials</h4>
						)}
					</div>
					<br />
					<br />
					<Link to='/profiles' className='btn btn-light'>
						Back To Profiles
					</Link>
					{auth.isAuthenticated &&
						auth.loading === false &&
						auth.user._id === profile.user._id && (
							<Link to='/edit-profile' className='btn btn-dark'>
								Edit Profile
							</Link>
						)}
				</div>
			)}
		</>
	);
};
ProfileId.propTypes = {
	loading: PropTypes.bool,
	profile: PropTypes.object,
	getProfileById: PropTypes.func,
	auth: PropTypes.object,
};