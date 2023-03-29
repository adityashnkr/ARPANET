import React from 'react';
import giphy from '../../img/loading.gif';
function Spinner() {
	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<img
				src={giphy}
				style={{ width: '60px', display: 'block', margin: 'auto' }}
				alt='Loading...'></img>
		</div>
	);
}

export default Spinner;
