import React, { useEffect } from 'react';
import { getGithubRepos } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
export const ProfileGithub = ({ username }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getGithubRepos(username));
	}, [username, dispatch]);
	const repos = useSelector((state) => state.profile.repos);
	return (
		<div className='profile-github'>
			<h2 className='text-primary my-1'>Github Repos</h2>
			<br />
			{repos.length !== 0 ? (
				repos.map((repo) => (
					<>
						<br />
						<div key={repo.id} className='repo p-1 my-1'>
							<div>
								<h4>
									<a
										href={repo.html_url}
										target='_blank'
										rel='noopener noreferrer'>
										{repo.name}
									</a>
								</h4>
								<p>{repo.description}</p>
							</div>
							<div>
								<ul>
									<li className='badge badge-primary'>
										Stars: {repo.stargazers_count}
									</li>
									<li className='badge badge-dark'>
										Watchers: {repo.watchers_count}
									</li>
									<li className='badge badge-light'>
										Forks: {repo.forks_count}
									</li>
								</ul>
							</div>
						</div>
					</>
				))
			) : (
				<h4>No Repos</h4>
			)}
		</div>
	);
};
