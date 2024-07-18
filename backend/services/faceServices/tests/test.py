import unittest
from unittest.mock import patch, MagicMock
from io import BytesIO
import numpy as np
import imageio
from src.main import app

class FaceGenerationTestCase(unittest.TestCase):
    def setUp(self):
        # Create a test client
        self.app = app.test_client()
        self.app.testing = True

    @patch('src.main.os.getenv')
    @patch('src.main.requests.get')
    def test_generate_face_success(self, mock_get, mock_getenv):
        # Mock environment variables
        mock_getenv.side_effect = lambda key, default=None: 'test_api_key' if key == 'API_KEY' else default
        
        # Create a mock image (100x100 black square)
        mock_image = np.zeros((100, 100, 3), dtype=np.uint8)
        img_byte_arr = BytesIO()
        imageio.imwrite(img_byte_arr, mock_image, format='jpeg')
        img_byte_arr.seek(0)
        
        # Mock successful API response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.content = img_byte_arr.getvalue()
        mock_get.return_value = mock_response

        response = self.app.get('/api/v1/face/byGenderAndAge?age=30&gender=male')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content_type, 'image/jpeg')


    @patch('src.main.os.getenv')
    @patch('src.main.requests.get')
    def test_generate_face_api_failure(self, mock_get, mock_getenv):
        # Mock environment variables
        mock_getenv.side_effect = lambda key, default=None: 'test_api_key' if key == 'API_KEY' else default
        
        # Mock failed API response
        mock_response = MagicMock()
        mock_response.status_code = 500
        mock_response.content = b'Internal Server Error'
        mock_get.return_value = mock_response

        response = self.app.get('/api/v1/face/byGenderAndAge?age=30&gender=male')

        self.assertEqual(response.status_code, 500)
        self.assertIn(b'Failed to retrieve image', response.data)

    @patch('src.main.os.getenv')
    @patch('src.main.requests.get')
    @patch('src.main.imageio.v2.imread')
    def test_generate_face_image_processing_failure(self, mock_imread, mock_get, mock_getenv):
        # Mock environment variables
        mock_getenv.side_effect = lambda key, default=None: 'test_api_key' if key == 'API_KEY' else default
        
        # Mock successful API response
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.content = b'test image content'
        mock_get.return_value = mock_response
        
        # Mock image processing failure
        mock_imread.side_effect = Exception('Image processing error')

        response = self.app.get('/api/v1/face/byGenderAndAge?age=30&gender=male')

        self.assertEqual(response.status_code, 500)
        self.assertIn(b'Failed to process image', response.data)

if __name__ == '__main__':
    unittest.main()