import React, { useState } from 'react';
import './App.css';
import IdentityCard from './components/IdentityCard';
import GenerationButton from './components/GenerationButton';

const App = () => {
	const initialIdentityData = {
		firstName: 'John',
		lastName: 'Doe',
		birthDate: '01/01/1990',
		birthPlace: 'New York',
		gender: 'Male',
		UUID: '123456789',
		photoUrl: '/man.jpg',
	};

	const [identityData, setIdentityData] = useState(initialIdentityData);

	const handleGenerateClick = () => {
		const newIdentityData = {
			firstName: 'Alice',
			lastName: 'Smith',
			birthDate: '15/05/1985',
			birthPlace: 'Los Angeles',
			gender: 'Female',
			UUID: '987654321',
			photoUrl: '/woman.jpg',
		};

		setIdentityData(newIdentityData);
	};

	return (
		<div className="App">
			<main className="App-main">
				<IdentityCard {...identityData} />
				<GenerationButton onClick={handleGenerateClick} />
			</main>
		</div>
	);
};

export default App;
