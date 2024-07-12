import React from 'react';
import html2canvas from 'html2canvas';
import '../styles/Buttons.css';

const DownloadButton = () => {
	const handleDownload = async () => {
		const identityCardRef = document.querySelector('.identity-card');
		if (!identityCardRef) {
			console.error("Element with class 'identity-card' not found.");
			return;
		}

		try {
			const identityCanvas = await html2canvas(identityCardRef);

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			const backgroundImage = new Image();
			backgroundImage.src = '/background.jpg';

			backgroundImage.onload = () => {
				canvas.width = identityCanvas.width;
				canvas.height = identityCanvas.height;

				ctx.drawImage(
					backgroundImage,
					0,
					0,
					identityCanvas.width,
					identityCanvas.height
				);
				ctx.drawImage(identityCanvas, 0, 0);
				const dataUrl = canvas.toDataURL('image/png');
				const link = document.createElement('a');
				link.href = dataUrl;
				link.download = 'identity_card.png';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			};

			backgroundImage.onerror = () => {
				console.error('Failed to load background image.');
			};
		} catch (error) {
			console.error('Error generating canvas:', error);
		}
	};

	return (
		<button className="generation-button" onClick={handleDownload}>
			Download
		</button>
	);
};

export default DownloadButton;
