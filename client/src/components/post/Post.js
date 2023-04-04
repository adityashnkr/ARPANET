import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layouts/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPost } from '../../actions/post';
import { PostItem } from '../posts/PostItem';
import { Link } from 'react-router-dom';
export const Post = () => {
	const dispatch = useDispatch();
	let { id } = useParams();
	useEffect(() => {
		dispatch(getPost(id));
	}, [dispatch, id]);
	const post = useSelector((state) => state.post.post);
	const loading = useSelector((state) => state.post.loading);

	return loading || post === null ? (
		<Spinner />
	) : (
		<section className='container'>
			<PostItem post={post} showActions={false} />
			{/* <CommentForm postId={post._id} /> */}
			<div className='comments'>
				{post.comments.map((comment) => (
					<h1>HI</h1>
					// <CommentItem key={comment._id} comment={comment} postId={post._id} />
				))}
			</div>
			<Link to='/posts' className='btn'>
				Back To Posts
			</Link>
		</section>
	);
};

Post.propTypes = {};
