import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getGithubRepos } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
export const ProfileGithub = ({ username }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGithubRepos(username));
	}, [getGithubRepos, dispatch, username]);
	const repos = useSelector((state) => state.profile.repos);
	console.log(repos);
	return <div>ProfileGithub</div>;
};
