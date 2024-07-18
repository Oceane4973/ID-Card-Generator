import os
from flask import Flask, request, send_file
from dotenv import load_dotenv
import requests
import imageio
from io import BytesIO
import logging

# Charger les variables d'environnement depuis le fichier .env
def load_env_vars():
    load_dotenv()
    port = int(os.getenv('PORT', 5003))
    api_key = os.getenv('API_KEY')
    if not api_key:
        raise ValueError("API_KEY not found in environment variables")
    return port, api_key

try:
    PORT, API_KEY = load_env_vars()
except Exception as e:
    raise RuntimeError(f"Failed to load environment variables: {str(e)}")

app = Flask(__name__)

@app.route('/api/v1/face/byGenderAndAge', methods=['GET'])
def generate_face():
    try:
        age = request.args.get('age', default=25, type=int)
        gender = request.args.get('gender', default='female', type=str)

        # Validation des entrées
        if gender not in ['male', 'female']:
            raise ValueError("Invalid gender value")
        if not (18 <= age <= 80):
            raise ValueError("Age must be between 18 and 80")

        url = 'https://facestud.io/v1/generate'
        headers = {'Authorization': f'Token {API_KEY}'}
        params = {
            'gender': gender,
            'age': age,
        }

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            try:
                image = imageio.v2.imread(BytesIO(response.content))
                img_byte_arr = BytesIO()
                imageio.imwrite(img_byte_arr, image, format='jpeg')
                img_byte_arr.seek(0)
                return send_file(img_byte_arr, mimetype='image/jpeg')
            except Exception as e:
                app.logger.error(f"Failed to process image: {str(e)}")
                return "Internal server error while processing image", 500
        elif response.status_code == 429:
            app.logger.error(f"API rate limit exceeded. Please try again later {response.content}")
            return f"API rate limit exceeded. Please try again later", 429
        else:
            app.logger.error(f"Failed to retrieve image: {response.content}")
            return f"Failed to retrieve image from external service", 500
    except ValueError as ve:
        app.logger.error(f"Invalid input: {str(ve)}")
        return f"Invalid input: {str(ve)}", 400
    except Exception as e:
        app.logger.error(f"Error in generate_face: {str(e)}")
        return "Internal server error", 500

if __name__ == '__main__':
    try:
        app.run(port=PORT)
    except Exception as e:
        app.logger.error(f"Failed to start Flask app: {str(e)}")
