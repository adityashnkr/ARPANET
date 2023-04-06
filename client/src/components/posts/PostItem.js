import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

export const PostItem = ({
	post: { _id, text, name, avatar, user, likes, comments, date },
	showActions,
}) => {
	const loading = useSelector((state) => state.auth.loading);
	const AuthUser = useSelector((state) => state.auth.user);
	const dispatch = useDispatch();
	return (
		<>
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
					{showActions && (
						<>
							<button
								onClick={() => dispatch(addLike(_id))}
								type='button'
								className='btn my-1'>
								<i
									className='fa-solid fa-thumbs-up'
									style={{ color: '#ffffff' }}></i>
								<span style={{ color: '#ffffff' }}>
									{likes.length > 0 && <span>{likes.length}</span>}
								</span>
							</button>
							<button
								onClick={() => dispatch(removeLike(_id))}
								type='button'
								className='btn'>
								<i
									className='fas fa-thumbs-down'
									style={{ color: '#ffffff' }}
								/>
							</button>
							<Link to={`/posts/${_id}`} className='btn btn-primary p-1'>
								Discussion{' '}
								{comments.length > 0 && (
									<span className='comment-count'>{comments.length}</span>
								)}
							</Link>
							{!loading && user === AuthUser._id && (
								<button
									onClick={() => dispatch(deletePost(_id))}
									type='button'
									className='btn btn-danger'>
									<i className='fas fa-times' />
								</button>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

PostItem.defaultProps = { showActions: true };

PostItem.propTypes = {
	post: PropTypes.object,
	auth: PropTypes.object,
	addLike: PropTypes.func,
	removeLike: PropTypes.func,
	deletePost: PropTypes.func,
};
