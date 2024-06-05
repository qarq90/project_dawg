import React from 'react';

const ErrorCard = ({type}) => {
	return (
		<div style={{
			background: 'var(--comp-bg-a)',
			color: '#ffffff',
			padding: '20px',
			borderRadius: '8px',
			boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
			textAlign: 'center',
			fontFamily: 'Arial, sans-serif',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			height: '20%',
			width: '95%'
		}}>
			<p style={{fontSize: '1.5rem', marginBottom: '10px'}}>No Games Found in {type}</p>
			<p style={{fontSize: '1rem', opacity: '0.7'}}>{type} Games will appear here. You have yet to add Games to
				this category. </p>
		</div>
	);
};

export default ErrorCard;
