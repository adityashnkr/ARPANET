import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../actions/post';
export const CommentForm = ({ postId }) => {
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	return (
		<div className='post-form'>
			<div className='bg-primary p'>
				<h3>Leave a Comment</h3>
			</div>
			<form
				className='form my-1'
				onSubmit={(e) => {
					e.preventDefault();
					dispatch(addComment(postId, { text }));
					setText('');
				}}>
				<input
					type='text'
					name='text'
					cols='10'
					rows='2'
					placeholder='Comment the post'
					value={text}
					onChange={(e) => setText(e.target.value)}
					required
				/>
				<br />
				<input type='submit' className='btn btn-dark my-1' value='Submit' />
			</form>
			<br />
		</div>
	);
};

CommentForm.propTypes = {};
