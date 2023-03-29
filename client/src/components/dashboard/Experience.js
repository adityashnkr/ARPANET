import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteExperience } from '../../actions/profile';
export const Experience = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const experiences = useSelector((state) => state.profile.profile.experience);
	const displayExperience =
		experiences !== undefined && experiences.length !== 0
			? experiences.map((exp) => (
					<tr key={exp._id}>
						<td>{exp.company}</td>
						<td className='hide-sm'>{exp.title}</td>
						<td>
							{formatDate(exp.from)} - {exp.to ? formatDate(exp.to) : 'Now'}
						</td>
						<td>
							<button
								onClick={() => dispatch(deleteExperience(exp._id, navigate))}
								className='btn btn-danger'>
								Delete
							</button>
						</td>
					</tr>
			  ))
			: false;
	return (
		<>
			<br />
			<h2 className='my-2'>Experience Credentials</h2>
			{displayExperience !== false ? (
				<>
					<br />
					<table className='table'>
						<thead>
							<tr>
								<th>Company</th>
								<th className='hide-sm'>Title</th>
								<th className='hide-sm'>Years</th>
								<th />
							</tr>
						</thead>
						<tbody>{displayExperience}</tbody>
					</table>
				</>
			) : (
				<>
					<h1>Please add experience credentials</h1>
				</>
			)}
		</>
	);
};

Experience.propTypes = {
	experiences: PropTypes.array,
};
