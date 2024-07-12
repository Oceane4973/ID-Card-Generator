import app from './app.js';

const PORT = process.env.PORT || 5008;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Fake ID Generator API is running on port ${PORT}`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/id/simple`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/id/complex`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/name/random`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/name/byGender`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/gender/byName`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/nationality/byName`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/birthplace/byCountry`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/age/random`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/age/byNameAndOrigin`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/age/range`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/face/byGenderAndAge`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/identity/simple`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/identity/byName`);
  console.log(`On localhost, you can click on this link : http://localhost:${PORT}/api/v1/identity/byNationality`);
});