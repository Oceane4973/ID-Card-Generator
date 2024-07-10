import React from 'react';
import '../styles/IdentityCard.css';
import IdentityPhoto from './IdentityPhoto';
import IdentityInfo from './IdentityInfo';

const IdentityCard = ({
	firstName,
	lastName,
	birthDate,
	birthPlace,
	gender,
	UUID,
}) => {
	return (
		<div className="identity-card">
			<h1>Identity card</h1>
			<IdentityPhoto
			/>
			<IdentityInfo
				firstName={firstName}
				lastName={lastName}
				birthDate={birthDate}
				birthPlace={birthPlace}
				gender={gender}
				UUID={UUID}
			/>
		</div>
	);
};

export default IdentityCard;
