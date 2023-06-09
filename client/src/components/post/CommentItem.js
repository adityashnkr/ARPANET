import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteComment } from '../../actions/post';
import formatDate from '../../utils/formatDate';
export const CommentItem = ({
	comment: { _id, text, name, avatar, user, date },
	postId,
}) => {
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	return (
		<div className='post p-1 my-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img className='round-img' src={avatar} alt='' />
					<h4>{name}</h4>
				</Link>
			</div>
			<div>
				<p className='my-1'>{text}</p>
				<p className='post-date'>Posted on {formatDate(date)}</p>
				<br />
				{!auth.loading && user === auth.user._id && (
					<button
						onClick={() => dispatch(deleteComment(postId, _id))}
						type='button'
						className='btn btn-danger'>
						<i className='fas fa-times' />
					</button>
				)}
			</div>
		</div>
	);
};
