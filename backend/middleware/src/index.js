import app from './app.js';

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Fake ID Generator API is running on port ${PORT}`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/id/simple`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/id/complex`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/name/random`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/name/createWithGender`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/gender/createWithFirstName`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/nationality/createWithFirstName`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/birthplace/createWithCountry`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/age/random`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/age/createWithNameAndOrigin`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/age/range`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/face/createWithGenderAndAge`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/identity/simple`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/identity/createdWithName`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/v1/identity/createdWithNationality`);
});