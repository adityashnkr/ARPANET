import React from 'react';
import { useSelector } from 'react-redux';
export const ProfileAbout = () => {
	const { bio, skills } = useSelector((state) => state.profile.profile);
	const { name } = useSelector((state) => state.profile.profile.user);
	return (
		<div className='profile-about bg-primary p-2'>
			{bio && (
				<>
					<h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
					<p>{bio}</p>
					<div className='line' />
				</>
			)}
			<br />
			<h2 className='text-primary'>Skill Set</h2>
			<div className='skills'>
				{skills.map((skill, index) => (
					<div key={index} className='p-1'>
						<i className='fa-solid fa-circle-check' />
						&nbsp;
						{skill}
						&nbsp;
					</div>
				))}
			</div>
		</div>
	);
};
