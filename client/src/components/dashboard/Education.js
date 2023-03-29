import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { deleteEducation } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';
export const Education = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const educations = useSelector((state) => state.profile.profile.education);
	const displayEducation =
		educations !== undefined && educations.length !== 0
			? educations.map((edu) => (
					<tr key={edu._id}>
						<td>{edu.school}</td>
						<td className='hide-sm'>{edu.degree}</td>
						<td>
							{formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
						</td>
						<td>
							<button
								onClick={() => dispatch(deleteEducation(edu._id, navigate))}
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
			<h2 className='my-2'>Education Credentials</h2>
			{displayEducation !== false ? (
				<>
					<br />
					<table className='table'>
						<thead>
							<tr>
								<th>School</th>
								<th className='hide-sm'>Degree</th>
								<th className='hide-sm'>Years</th>
								<th />
							</tr>
						</thead>
						<tbody>{displayEducation}</tbody>
					</table>
				</>
			) : (
				<>
					<h1>Please add education credentials</h1>
				</>
			)}
		</>
	);
};

Education.propTypes = {
	education: PropTypes.array,
};
