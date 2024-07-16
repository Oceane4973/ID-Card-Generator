import os
from flask import Flask, request, send_file
from dotenv import load_dotenv
import requests
import imageio
from io import BytesIO

# Charger les variables d'environnement depuis le fichier .env
load_dotenv()
PORT = int(os.getenv('PORT', 5003))
API_KEY = os.getenv('API_KEY')

app = Flask(__name__)

@app.route('/api/v1/face/byGenderAndAge', methods=['GET'])
def generate_face():
    url = 'https://facestud.io/v1/generate'

    age = request.args.get('age', default=25, type=int)
    gender = request.args.get('gender', default='female', type=str)

    headers = {'Authorization': f'Token {API_KEY}'}
    params = {
        'gender': gender,
        'age': age,
    }

    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        image = imageio.v2.imread(BytesIO(response.content))
        img_byte_arr = BytesIO()
        imageio.imwrite(img_byte_arr, image, format='jpeg')
        img_byte_arr.seek(0)
        return send_file(img_byte_arr, mimetype='image/jpeg')
    else:
        return f"Failed to retrieve image: {response.content}", 500


if __name__ == '__main__':
    app.run(port=PORT)
