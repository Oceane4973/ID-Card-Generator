import express from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

class FaceRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get('/byGenderAndAge', this.generateFaceByGenderAndAge);
    }

    async generateFaceByGenderAndAge(req, res) {
        const { gender, age } = req.query;

        try {
            const response = await axios.get(
                `http://localhost:5003/api/v1/face/byGenderAndAge`,
                { params: { age, gender }, responseType: 'arraybuffer' }
            );

            if (response.status === 200) {
                const contentType = response.headers['content-type'];
                const extension = contentType.split('/')[1];
                const tempFileName = `temp.${extension}`;

                fs.writeFileSync(tempFileName, response.data);

                // Utilisez un chemin relatif correct pour envoyer le fichier
                res.sendFile(path.resolve(tempFileName), {}, (err) => {
                    if (err) {
                        console.error('Error sending file:', err);
                    }
                    // Nettoyage du fichier temporaire après l'envoi
                    fs.unlinkSync(tempFileName);
                });
            } else {
                res.status(500).send(`Failed to retrieve image: ${response.data}`);
            }
        } catch (error) {
            res.status(500).send(`Error: ${error.message}`);
        }
    }
}

export default new FaceRoutes().router;
