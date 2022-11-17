// const request = require("supertest");
// const app = require("../app");
// const truncate = require('../helper/truncate');

// const a = require("./auth.spec.js");
// let token = a.token;

// console.log(token);

// const bioTest = {
//   first_name : "fathoni",
// 	last_name : "zikri",
// 	telephone_number : "0898612",
// 	birthdate: "30-10-2002"
// }
// const bioUpdateTest = {
//   oldPhoneNumber: "0898612",
//   newPhoneNumber: "0898666",
//   confirmPhoneNumber: "0898666"
// }

// truncate.user_biodata();

// /* -- Register -- */
// describe("/bio/add endpoint", () => {
//   // case success
//   test("Success adding new bio", async () => {
//     try {
//       const res = await request(app).post('/bio/add').set('Authorization', token).send(bioTest);

//       expect(res.statusCode).toBe(201);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("success adding new bio");
//       expect(res.body.data).toStrictEqual({
//         firstname: bioTest.first_name,
//         lastname: bioTest.last_name,
//         telephonenumber: bioTest.telephone_number,
//         birthdate: bioTest.birthdate,
//       })
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   // case failed
//   test("Using registered phone number", async () => {
//     try {
//       const res = await request(app).post('/bio/add').set('Authorization', token).send(bioTest);

//       expect(res.statusCode).toBe(409);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("Bio already registered");
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });

// /* -- Who am i -- */

// describe("/auth/me endpoint", () => {
//   // case success
//   test("Succes show my data", async () => {
//     try {
//       const res = await request(app).get('/auth/me').set('Authorization', token);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("data showed successfull");
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });


// /* -- Change Password -- */

// describe("/bio/changephonenumber endpoint", () => {
//   // case success
//   test("Success changing phonenumber", async () => {
//     try {
//       const res = await request(app).post('/bio/changephonenumber')
//       .set('Authorization', token)
//       .send(bioUpdateTest);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("success change phone number");
      
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   // case failed
//   test("new phonenumber soen't match", async () => {
//     try {
//       const res = await request(app).post('/bio/changephonenumber')
//       .set('Authorization', token)
//       .send({
//         oldPhoneNumber: bioTest.oldPhoneNumber,
//         newPhoneNumber: bioTest.newPhoneNumber,
//         confirmPhoneNumber: `${bioTest.confirmPhoneNumber}awokawok`
//       });

//       expect(res.statusCode).toBe(422);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("New phonenumber doesn't match, please confirm again!!");
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   // case failed
//   test("phone number not found", async () => {
//     try {
//       const res = await request(app).post('/bio/changephonenumber')
//       .set('Authorization', token)
//       .send({
//         oldPhoneNumber: `123${bioTest.oldPassword}`,
//         newPhoneNumber: bioTest.newPhoneNumber,
//         confirmPhoneNumber: bioTest.confirmPhoneNumber
//       });

//       expect(res.statusCode).toBe(400);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("phonenumber not found!");
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });

// /* -- Show All bio -- */

// describe("/bio/show endpoint", () => {
//     // case success
//     test("Success showing all bio", async () => {
//     try {
//         const res = await request(app).get('/bio/show').set('Authorization', token);
        
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("data showed successfull");
//     } catch (err) {
//         console.log(err);
//     }
//   });
  
// });

// /* -- Show detail bio -- */

// describe("/bio/show/:id endpoint", () => {
//     // case success
//     test("Success showing detail bio", async () => {
//     try {
//         console.log(token);
//         const res = await request(app).get('/bio/show/1').set('Authorization', token);
        
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("data has found");
//     } catch (err) {
//         console.log(err);
//     }
//   });
//     // case failed
//     test("bio not found, failed to show", async () => {
//     try {
//         console.log(token);
//         const res = await request(app).get('/bio/show/99').set('Authorization', token);
        
//       expect(res.statusCode).toBe(409);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("data not found");
//     } catch (err) {
//         console.log(err);
//     }
//   });
  
// });

// /* -- Delete bio-- */

// describe("/bio/delete/:id endpoint", () => {
//   // case success
//   test("Success delete bio", async () => {
//     try {
//         console.log(token);
//       const res = await request(app).delete('/bio/delete/1').set('Authorization', token);

//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("user deleted successfull");
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   // case failed
//   test("bio Not Found", async () => {
//     try {
//       const res = await request(app).delete('/bio/delete/99').set('Authorization', token);

//       expect(res.statusCode).toBe(404);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("Bio not found!");
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   // case failed
//   test("Empty bio", async () => {
//     try {
//       const res = await request(app).get('/bio/show').set('Authorization', token);

//       expect(res.statusCode).toBe(409);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("empty data");
//       expect(res.body.data).toBe(null);
//     } catch (err) {
//           console.log(err);
//         }
//       });
// });
