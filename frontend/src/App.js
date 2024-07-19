import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import IdentityCard from './components/IdentityCard';
import GenerationButton from './components/GenerationButton';
import DownloadButton from './components/DownloadButton';
import { ThreeDots } from 'react-loader-spinner'; // Importing the spinner

const baseURL = 'http://localhost:5008/api/v1';

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
	const [loading, setLoading] = useState(false); // Adding loading state

	const handleGenerateClick = async () => {
		setLoading(true);
		const newIdentityData = await getNewIdentityData();
		setIdentityData(newIdentityData);
		setLoading(false);
	};

	return (
		<div className="App">
			<main className="App-main">
				{loading ? (
					<div className="spinner-container">
						<ThreeDots color="#00BFFF" height={80} width={80} />
					</div>
				) : (
					<IdentityCard {...identityData} />
				)}
				<GenerationButton onClick={handleGenerateClick} />
				<DownloadButton />
			</main>
		</div>
	);
};

async function getNewIdentityData() {
	const id = await generateSimpleId();
	const name = await generateRandomName();
	const gender = await getGender(name);
	const nationality = await getNationality(name);
	const age = await getAge(name, nationality);
	const birthPlace = await getBirthPlace(nationality);
	const birthDate = await getBirthDate(age);
	const photoUrl = await getFace(gender, age);

	const newIdentityData = {
		firstName: name.firstName,
		lastName: name.lastName,
		birthDate: formatDate(birthDate),
		birthPlace: birthPlace,
		gender: gender,
		UUID: id,
		photoUrl: photoUrl,
	};
	return newIdentityData;
}

async function generateSimpleId() {
	try {
		const response = await axios.get(`${baseURL}/id/simple`);
		return response.data.id;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de l'ID simple:",
			error.message
		);
	}
}

async function generateRandomName() {
	try {
		const response = await axios.get(`${baseURL}/name/random`);
		return response.data;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération du nom aléatoire:',
			error.message
		);
	}
}

async function getGender(name) {
	try {
		const response = await axios.get(
			`${baseURL}/gender/byName?name=${name.firstName}`
		);
		return response.data.gender;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération du genre:',
			error.message
		);
	}
}

async function getNationality(name) {
	try {
		const response = await axios.get(
			`${baseURL}/nationality/byName?name=${name.firstName}%20${name.lastName}`
		);
		return response.data;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération de la nationalité:',
			error.message
		);
	}
}

async function getBirthPlace(nationality) {
	try {
		const response = await axios.get(
			`${baseURL}/birthplace/byCountry?country=${nationality.country_id}`
		);
		return `${response.data.birthplace} (${nationality.country_name})`;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération du lieu de naissance aléatoire:',
			error.message
		);
	}
}

async function getAge(name, nationality) {
	try {
		const response = await axios.get(
			`${baseURL}/age/byNameAndOrigin?name=${name.firstName}&country=${nationality.country_id}`
		);
		return response.data.age;
	} catch (error) {
		console.error(
			"Erreur lors de la récupération de l'age:",
			error.message
		);
	}
}

async function getBirthDate(age) {
	try {
		const year = new Date().getFullYear() - age;
		const response = randomDate(year);
		return response;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération de la date de naissance:',
			error.message
		);
	}
}

async function getFace(gender, age) {
	try {
		const response = await axios.get(
			`${baseURL}/face/byGenderAndAge?gender=${gender}&age=${age}`,
			{ responseType: 'arraybuffer' }
		);
		return response.data;
	} catch (error) {
		console.error(
			'Erreur lors de la récupération de la photo aléatoire:',
			error.message
		);
	}
}

function randomDate(year) {
	function isLeapYear(year) {
		return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	}
	let daysInYear = isLeapYear(year) ? 366 : 365;
	let randomDay = Math.floor(Math.random() * daysInYear) + 1;
	let date = new Date(year, 0);
	date.setDate(randomDay);
	return date;
}
function formatDate(date) {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	return `${day}/${month}/${date.getFullYear()}`;
}

export default App;