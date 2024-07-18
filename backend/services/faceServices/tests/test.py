import unittest
from unittest.mock import patch, MagicMock, Mock
from io import BytesIO
import numpy as np
import imageio
from src.main import app
import imageio

class FlaskAppTests(unittest.TestCase):
    def setUp(self):
        # Create a test client
        self.app = app.test_client()
        self.app.testing = True

    def _generate_valid_image_bytes(self):
        # Create a mock image (100x100 black square)
        mock_image = np.zeros((100, 100, 3), dtype=np.uint8)
        img_byte_arr = BytesIO()
        imageio.imwrite(img_byte_arr, mock_image, format='jpeg')
        img_byte_arr.seek(0)
        return img_byte_arr.getvalue()

    @patch('src.main.requests.get')
    def test_generate_face_valid_default(self, mock_get):
        # Simuler une réponse réussie de l'API externe
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.content = self._generate_valid_image_bytes()
        mock_get.return_value = mock_response

        response = self.app.get('/api/v1/face/byGenderAndAge')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'image/jpeg')

    @patch('src.main.requests.get')
    def test_generate_face_valid_params(self, mock_get):
        # Simuler une réponse réussie de l'API externe
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.content = self._generate_valid_image_bytes()
        mock_get.return_value = mock_response

        response = self.app.get('/api/v1/face/byGenderAndAge?age=30&gender=male')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'image/jpeg')

    def test_generate_face_invalid_gender(self):
        response = self.app.get('/api/v1/face/byGenderAndAge?gender=invalid')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Invalid input: Invalid gender value', response.data)

    def test_generate_face_invalid_age(self):
        response = self.app.get('/api/v1/face/byGenderAndAge?age=5')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Invalid input: Age must be between 18 and 80', response.data)

        response = self.app.get('/api/v1/face/byGenderAndAge?age=81')
        self.assertEqual(response.status_code, 400)
        self.assertIn(b'Invalid input: Age must be between 18 and 80', response.data)

    @patch('src.main.requests.get')
    def test_generate_face_edge_case_age(self, mock_get):
        # Simuler une réponse réussie de l'API externe
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.content = self._generate_valid_image_bytes()
        mock_get.return_value = mock_response

        response = self.app.get('/api/v1/face/byGenderAndAge?age=18')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'image/jpeg')

        response = self.app.get('/api/v1/face/byGenderAndAge?age=80')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'image/jpeg')

    @patch('src.main.requests.get')
    def test_generate_face_external_api_failure(self, mock_get):
        mock_get.return_value.status_code = 500
        mock_get.return_value.content = b'{"detail":"Request was throttled. Expected available in 77780 seconds."}'
        response = self.app.get('/api/v1/face/byGenderAndAge')
        self.assertEqual(response.status_code, 500)
        self.assertIn(b'Failed to retrieve image from external service', response.data)

    @patch('src.main.requests.get')
    def test_generate_face_image_processing_failure(self, mock_get):
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.content = b'invalid_image_data'
        mock_get.return_value = mock_response

        response = self.app.get('/api/v1/face/byGenderAndAge')
        self.assertEqual(response.status_code, 500)
        self.assertIn(b'Internal server error while processing image', response.data)

    @patch('src.main.requests.get')
    def test_generate_face_rate_limit_exceeded(self, mock_get):
        # Configure mock for requests.get to return a 429 status code
        mock_response = MagicMock()
        mock_response.status_code = 429
        mock_response.content = b'API rate limit exceeded. Please try again later'
        mock_get.return_value = mock_response
        # Perform request to the endpoint
        response = self.app.get('/api/v1/face/byGenderAndAge')
        # Verify that the response matches the expected behavior
        self.assertEqual(response.status_code, 429)
        self.assertIn(b'API rate limit exceeded', response.data)

if __name__ == '__main__':
    unittest.main()
