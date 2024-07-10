import React from 'react';
import '../styles/IdentityInfo.css';

const IdentityInfo = ({
	firstName,
	lastName,
	birthDate,
	birthPlace,
	gender,
	UUID,
}) => {
	return (
		<div className="identity-info">
			<p>
				<strong>First Name : </strong>{firstName} 
			</p>
			<p>
				<strong>Last Name : </strong>{lastName}
			</p>
			<p>
				<strong>Gender : </strong>{gender}
			</p>
			<p>
				<strong>Birth the </strong>{birthDate}<strong> at </strong>{birthPlace}
			</p>
			<p>
				<strong>ID Card Number : </strong>{UUID}
			</p>
		</div>
	);
};

export default IdentityInfo;
