import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getPosts } from '../../actions/post';
import { PostItem } from './PostItem';
import { PostForm } from './PostForm';
export const Posts = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);
	const posts = useSelector((state) => state.post.posts);
	return (
		<section className='container'>
			<h1 className='large text-primary'>Posts</h1>
			<br />
			<p className='lead'>
				<i className='fas fa-user' /> Welcome to the community
			</p>
			<PostForm />
			<div className='posts'>
				{posts.map((post) => (
					<Fragment key={post._id}>
						<br />
						<PostItem post={post} />
					</Fragment>
				))}
			</div>
		</section>
	);
};

Posts.propTypes = {
	getPosts: PropTypes.func,
	post: PropTypes.object,
};
