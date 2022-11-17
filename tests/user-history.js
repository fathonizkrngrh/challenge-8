// const request = require("supertest");
// const app = require("../app");
// const truncate = require('../helper/truncate');

// const a = require("./auth.spec.js");
// let token = a.token;

// console.log(token);

// const historyTest = {
//   user_id : 1,
// 	points : 90,
// 	match_played : 3,
// 	rank: "silver"
// }

// truncate.user_history();

// /* -- Register -- */
// describe("/history/add endpoint", () => {
//   // case failed
//   test("User doen't exist", async () => {
//     try {
//       const res = await request(app).post('/history/add').set('Authorization', token).send(historyTest);
  
//       expect(res.statusCode).toBe(409);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("User doesn't exist!!");
//     } catch (err) {
//       console.log(err);
//     }
//   });
//   // case failed
//   test("empty history", async () => {
//     try {
//         const res = await request(app).get('/history/show/').set('Authorization', token);
        
//       expect(res.statusCode).toBe(409);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("empty record");
//       expect(res.body.data).toBe(null);
//     } catch (err) {
//         console.log(err);
//     }
//   });
//   // case success
//   test("Success adding new history", async () => {
//     try {
//       const register = await request(app).post('/auth/register').send(authTest)
//       const res = await request(app).post('/history/add').set('Authorization', token).send(historyTest);

//       expect(res.statusCode).toBe(201);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("success adding history");
//       expect(res.body.data).toStrictEqual({
//         user_id: historyTest.user_id,
//           points: historyTest.points,
//           match_played: historyTest.match_played,
//           rank: historyTest.rank,
//       })
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });

// /* -- Show All history -- */

// describe("/history/show endpoint", () => {
//     // case success
//     test("Success showing all history", async () => {
//     try {
//         const res = await request(app).get('/history/show').set('Authorization', token);
        
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
// /* -- Show Rank -- */

// describe("/history/show/rank endpoint", () => {
//     // case success
//     test("Success showing all history", async () => {
//     try {
//         const res = await request(app).get('/history/show/rank').set('Authorization', token);
        
//       expect(res.statusCode).toBe(200);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(true);
//       expect(res.body.message).toBe("record has ranked");
//     } catch (err) {
//         console.log(err);
//     }
//   });
  
// });

// /* -- Show detail bio -- */

// describe("/history/show/:id endpoint", () => {
//     // case success
//     test("Success showing detail history", async () => {
//     try {
//         console.log(token);
//         const res = await request(app).get('/history/show/1').set('Authorization', token);
        
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
//     test("history not found, failed to show", async () => {
//     try {
//         const res = await request(app).get('/history/show/99').set('Authorization', token);
        
//       expect(res.statusCode).toBe(409);
//       expect(res.body).toHaveProperty("status");
//       expect(res.body).toHaveProperty("message");
//       expect(res.body).toHaveProperty("data");
//       expect(res.body.status).toBe(false);
//       expect(res.body.message).toBe("data not found");
//       expect(res.body.data).toBe(null);
//     } catch (err) {
//         console.log(err);
//     }
//   });
  
// });
