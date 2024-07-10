import React from 'react';
import '../styles/GenerationButton.css';

const GenerationButton = ({ onClick }) => {
	return (
		<button className="generation-button" onClick={onClick}>
			Generate
		</button>
	);
};

export default GenerationButton;
