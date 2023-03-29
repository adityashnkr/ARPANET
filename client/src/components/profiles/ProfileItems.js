import React from 'react';
import PropTypes from 'prop-types';

export const ProfileItems = ({
	profile: {
		user: { _id, name, avatar },
		status,
		company,
		location,
		skills,
	},
}) => {
	return (
		<div className='profile'>
			<img src={avatar} alt='' className='round-img' />
			<div>
				<h2>{name}</h2>
				<p>
					{status} {company && <span> at {company}</span>}
				</p>
				<p className='my-1'>{location && <span>{location}</span>}</p>
				<br />
				<a href={`/profile/${_id}`} className='btn btn-primary'>
					View Profile
				</a>
			</div>
			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li key={index} className='text-primary'>
						<i className='fas fa-check' /> {skill}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItems.propTypes = {
	profile: PropTypes.object,
};
