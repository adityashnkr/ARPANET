import React from 'react';
import PropTypes from 'prop-types';
import { addPost } from '../../actions/post';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
export const PostForm = () => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Say Something...</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(addPost({ text }));
					setText('');
				}}>
				<input
					style={{ height: '100px' }}
					type='text'
					name='text'
					cols='30'
					rows='5'
					placeholder='Create a post'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<br />
				<button className='btn btn-primary'>Submit</button>
			</form>
		</div>
	);
};

PostForm.propTypes = {
	addPost: PropTypes.func,
};
