import { generateRandomAge, generateAgeByNameOrigin } from '../routes/age';
import generateBirthplaceByCountry from '../routes/birthplace';
import generateFaceByGenderAndAge from '../routes/face';
import { determineGenderByFirstname, determineGenderByNameAndOrigin } from '../routes/gender';
import generateSimpleId from '../routes/id';
import { generateRandomName, generateNameByGender } from '../routes/name';
import nationalityByFirstname from '../routes/nationality';

class Identity {
    constructor() {
        this.id = null;
        this.firstName = null;
        this.lastName = null;
        this.gender = null;
        this.nationality = null;
        this.birthplace = null;
        this.age = null;
        this.faceImage = null;
    }

    async generateFullProfile() {
        try {
            const idResult = await generateSimpleId();
            if (!idResult || !idResult.id) throw new Error('Failed to generate ID');
            this.id = idResult.id;

            const nameResult = await generateRandomName();
            if (!nameResult || !nameResult.firstName || !nameResult.lastName) throw new Error('Failed to generate name');
            this.firstName = nameResult.firstName;
            this.lastName = nameResult.lastName;

            const ageResult = await generateRandomAge();
            if (!ageResult || typeof ageResult.age !== 'number') throw new Error('Failed to generate age');
            this.age = ageResult.age;

            const genderResult = await determineGenderByFirstname({ query: { name: this.firstName } });
            if (!genderResult || !genderResult.gender) throw new Error('Failed to determine gender');
            this.gender = genderResult.gender;

            const nationalityResult = await nationalityByFirstname({ query: { name: this.firstName } });
            if (!nationalityResult || !nationalityResult.nationality) throw new Error('Failed to determine nationality');
            this.nationality = nationalityResult.nationality;

            const birthplaceResult = await generateBirthplaceByCountry({ query: { country: this.nationality } });
            if (!birthplaceResult || !birthplaceResult.birthplace) throw new Error('Failed to determine birthplace');
            this.birthplace = birthplaceResult.birthplace;

            const faceImageResult = await generateFaceByGenderAndAge({ query: { age: this.age, gender: this.gender } });
            if (!faceImageResult) throw new Error('Failed to generate face image');
            this.faceImage = faceImageResult;
        } catch (error) {
            console.error('Error generating full profile:', error.message);
            throw error;
        }
    }

    async generateFullProfileByName(firstName) {
        try {
            const idResult = await generateSimpleId();
            if (!idResult || !idResult.id) throw new Error('Failed to generate ID');
            this.id = idResult.id;

            const nameResult = await generateRandomName();
            if (!nameResult || !nameResult.lastName) throw new Error('Failed to generate name');
            this.firstName = firstName;
            this.lastName = nameResult.lastName;

            const ageResult = await generateAgeByNameOrigin({ query: { name: this.firstName, country: this.nationality } });
            if (!ageResult || typeof ageResult.age !== 'number') throw new Error('Failed to generate age');
            this.age = ageResult.age;

            const genderResult = await determineGenderByFirstname({ query: { name: this.firstName } });
            if (!genderResult || !genderResult.gender) throw new Error('Failed to determine gender');
            this.gender = genderResult.gender;

            const nationalityResult = await nationalityByFirstname({ query: { name: this.firstName } });
            if (!nationalityResult || !nationalityResult.nationality) throw new Error('Failed to determine nationality');
            this.nationality = nationalityResult.nationality;

            const birthplaceResult = await generateBirthplaceByCountry({ query: { country: this.nationality } });
            if (!birthplaceResult || !birthplaceResult.birthplace) throw new Error('Failed to determine birthplace');
            this.birthplace = birthplaceResult.birthplace;

            const faceImageResult = await generateFaceByGenderAndAge({ query: { age: this.age, gender: this.gender } });
            if (!faceImageResult) throw new Error('Failed to generate face image');
            this.faceImage = faceImageResult;
        } catch (error) {
            console.error('Error generating profile by name:', error.message);
            throw error;
        }
    }

    async generateFullProfileByNationality(nationality) {
        try {
            const idResult = await generateSimpleId();
            if (!idResult || !idResult.id) throw new Error('Failed to generate ID');
            this.id = idResult.id;

            this.nationality = nationality;

            const nameResult = await generateRandomName();
            if (!nameResult || !nameResult.firstName || !nameResult.lastName) throw new Error('Failed to generate name');
            this.firstName = nameResult.firstName;
            this.lastName = nameResult.lastName;

            const ageResult = await generateRandomAge();
            if (!ageResult || typeof ageResult.age !== 'number') throw new Error('Failed to generate age');
            this.age = ageResult.age;

            const genderResult = await determineGenderByNameAndOrigin({ query: { name: this.firstName, country: this.nationality } });
            if (!genderResult || !genderResult.gender) throw new Error('Failed to determine gender');
            this.gender = genderResult.gender;

            const birthplaceResult = await generateBirthplaceByCountry({ query: { country: this.nationality } });
            if (!birthplaceResult || !birthplaceResult.birthplace) throw new Error('Failed to determine birthplace');
            this.birthplace = birthplaceResult.birthplace;

            const faceImageResult = await generateFaceByGenderAndAge({ query: { age: this.age, gender: this.gender } });
            if (!faceImageResult) throw new Error('Failed to generate face image');
            this.faceImage = faceImageResult;
        } catch (error) {
            console.error('Error generating profile by nationality:', error.message);
            throw error;
        }
    }
}

export default Identity;
