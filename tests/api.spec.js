const request = require("supertest");
const app = require("../index.js");
const truncate = require("../helper/truncate");

const authTest = {
  username: "test123",
  email: "test123@gmail.com",
  password: "1234",
};
const authUpdateTest = {
  oldPassword: "1234",
  newPassword: "12345",
  confirmNewPass: "12345",
};
const bioTest = {
  first_name: "fathoni",
  last_name: "zikri",
  telephone_number: "0898612",
  birthdate: "30-10-2002",
};
const bioUpdateTest = {
  oldPhoneNumber: "0898612",
  newPhoneNumber: "0898666",
  confirmPhoneNumber: "0898666",
};
const historyTest = {
  user_id: 1,
  points: 90,
  match_played: 3,
  rank: "silver",
};

var token = "";

truncate.user();
truncate.user_history();
truncate.user_biodata();

/* -- Middleware -- */

describe("test middleware endpoint", () => {
  // case success
  test("jwt malformed ", async () => {
    try {
      const res = await request(app)
        .get("/auth/me")
        .set("Authorization", "token");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("jwt malformed");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
  test("not authorized", async () => {
    try {
      const res = await request(app).get("/auth/me").set("Authorization", "");

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("you're not authorized");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

/* -- Register -- */
describe("/auth/register endpoint", () => {
  // case success
  test("Success registered", async () => {
    try {
      const res = await request(app).post("/auth/register").send(authTest);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Account Created!");
      expect(res.body.data).toStrictEqual({
        email: authTest.email,
        username: authTest.username,
      });
    } catch (err) {
      expect(err).toBe("error");
    }
  });
  // case failed
  test("Using registered email", async () => {
    try {
      const res = await request(app).post("/auth/register").send(authTest);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Email already used!!");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

/* -- Login -- */

describe("/auth/login endpoint", () => {
  // case success
  test("Success logged in", async () => {
    try {
      const res = await request(app).post("/auth/login").send({
        email: authTest.email,
        password: authTest.password,
      });

      token = res.body.data.token;

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("Login Success");
      expect(res.body.data).toStrictEqual({
        email: authTest.email,
        username: authTest.username,
        token: token,
      });
    } catch (err) {
      expect(err).toBe("error");
    }
  });
  // case failed
  test("Wrong Password", async () => {
    try {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: authTest.email,
          password: `${authTest.password}awokawok`,
        });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("email or password doesn't match");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
  // case failed
  test("Wrong Email", async () => {
    try {
      const res = await request(app)
        .post("/auth/login")
        .send({
          email: `awokawok${authTest.email}`,
          password: authTest.password,
        });

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("email or password doesn't match");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

/* -- Who am i -- */

describe("/auth/me endpoint", () => {
  // case success
  test("Succes show my data", async () => {
    try {
      const res = await request(app)
        .get("/auth/me")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("data showed successfull");
    } catch (err) {
      expect(err).toBe("error");
    }
  });
});

/* -- Change Password -- */

describe("/auth/changepassword endpoint", () => {
  // case success
  test("Success changing password", async () => {
    try {
      const res = await request(app)
        .post("/auth/changepassword")
        .set("Authorization", token)
        .send(authUpdateTest);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("change password success");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("new password soen't match", async () => {
    try {
      const res = await request(app)
        .post("/auth/changepassword")
        .set("Authorization", token)
        .send({
          oldPassword: authTest.oldPassword,
          newPassword: authTest.newPassword,
          confirmNewPass: `${authTest.confirmNewPass}awokawok`,
        });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        "New password doesn't match, please confirm your new password!!"
      );
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("Wrong Email", async () => {
    try {
      const res = await request(app)
        .post("/auth/changepassword")
        .set("Authorization", token)
        .send({
          oldPassword: `${authTest.oldPassword}awokawok`,
          newPassword: authTest.newPassword,
          confirmNewPass: authTest.confirmNewPass,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("old password does not match!");
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Show All Data -- */

describe("/auth/show endpoint", () => {
  // case success
  test("Success showing data", async () => {
    try {
      console.log(token);
      const res = await request(app)
        .get("/auth/show")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("data showed successfull");
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = { token };

/*-----------------------------  User Biodata -------------------------*/

/* -- Register -- */
describe("/bio/add endpoint", () => {
  // case success
  test("Success adding new bio", async () => {
    try {
      const res = await request(app)
        .post("/bio/add")
        .set("Authorization", token)
        .send(bioTest);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success adding new bio");
      expect(res.body.data).toStrictEqual({
        firstname: bioTest.first_name,
        lastname: bioTest.last_name,
        telephonenumber: bioTest.telephone_number,
        birthdate: bioTest.birthdate,
      });
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("Using registered phone number", async () => {
    try {
      const res = await request(app)
        .post("/bio/add")
        .set("Authorization", token)
        .send(bioTest);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Bio already registered");
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Change Password -- */

describe("/bio/changephonenumber endpoint", () => {
  // case success
  test("Success changing phonenumber", async () => {
    try {
      const res = await request(app)
        .post("/bio/changephonenumber")
        .set("Authorization", token)
        .send(bioUpdateTest);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success change phone number");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("new phonenumber soen't match", async () => {
    try {
      const res = await request(app)
        .post("/bio/changephonenumber")
        .set("Authorization", token)
        .send({
          oldPhoneNumber: bioTest.oldPhoneNumber,
          newPhoneNumber: bioTest.newPhoneNumber,
          confirmPhoneNumber: `${bioTest.confirmPhoneNumber}awokawok`,
        });

      expect(res.statusCode).toBe(422);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe(
        "New phonenumber doesn't match, please confirm again!!"
      );
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("phone number not found", async () => {
    try {
      const res = await request(app)
        .post("/bio/changephonenumber")
        .set("Authorization", token)
        .send({
          oldPhoneNumber: `123${bioTest.oldPassword}`,
          newPhoneNumber: bioTest.newPhoneNumber,
          confirmPhoneNumber: bioTest.confirmPhoneNumber,
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("phonenumber not found!");
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Show All bio -- */

describe("/bio/show endpoint", () => {
  // case success
  test("Success showing all bio", async () => {
    try {
      const res = await request(app)
        .get("/bio/show")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("data showed successfull");
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Show detail bio -- */

describe("/bio/show/:id endpoint", () => {
  // case success
  test("Success showing detail bio", async () => {
    try {
      console.log(token);
      const res = await request(app)
        .get("/bio/show/1")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("data has found");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("bio not found, failed to show", async () => {
    try {
      console.log(token);
      const res = await request(app)
        .get("/bio/show/99")
        .set("Authorization", token);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("data not found");
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Delete bio-- */

describe("/bio/delete/:id endpoint", () => {
  // case success
  test("Success delete bio", async () => {
    try {
      console.log(token);
      const res = await request(app)
        .delete("/bio/delete/1")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("bio deleted successfull");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("bio Not Found", async () => {
    try {
      const res = await request(app)
        .delete("/bio/delete/99")
        .set("Authorization", token);

      expect(res.statusCode).toBe(404);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("Bio not found!");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("Empty bio", async () => {
    try {
      const res = await request(app)
        .get("/bio/show")
        .set("Authorization", token);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("empty data");
      expect(res.body.data).toBe(null);
    } catch (err) {
      console.log(err);
    }
  });
});

/* --------------------------- History --------------------------------- */

/* -- Add History (Failed) -- */
describe("failed /history/add endpoint", () => {
  // case failed
  test("empty history", async () => {
    try {
      const res = await request(app)
        .get("/history/show")
        .set("Authorization", token);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("empty record");
      expect(res.body.data).toBe(null);
    } catch (err) {
      console.log(err);
    }
  });
  // case success
  test("Success adding new history", async () => {
    try {
      const res = await request(app)
        .post("/history/add")
        .set("Authorization", token)
        .send(historyTest);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("success adding history");
      expect(res.body.data).toStrictEqual({
        user_id: historyTest.user_id,
        points: historyTest.points,
        match_played: historyTest.match_played,
        rank: historyTest.rank,
      });
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Show All history -- */

describe("/history/show endpoint", () => {
  // case success
  test("Success showing all history", async () => {
    try {
      const res = await request(app)
        .get("/history/show")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("data showed successfull");
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Show detail history -- */

describe("/history/show/:id endpoint", () => {
  // case success
  test("Success showing detail history", async () => {
    try {
      const res = await request(app)
        .get(`/history/show/${historyTest.user_id}`)
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("data has found");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("history not found, failed to show", async () => {
    try {
      const res = await request(app)
        .get(`/history/show/${historyTest.user_id + 10}`)
        .set("Authorization", token);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("data not found");
      expect(res.body.data).toBe(null);
    } catch (err) {
      console.log(err);
    }
  });
});

/* -- Show Rank -- */

describe("/history/show/rank endpoint", () => {
  // case success
  test("Success showing all rank", async () => {
    try {
      const res = await request(app)
        .get("/history/show/rank")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("record has ranked");
    } catch (err) {
      console.log(err);
    }
  });
});

/* ------------------------------ Delete user -------------------------- */
/* -- Delete user-- */

describe("/auth/deleteuser/:id endpoint and this effects", () => {
  // case success
  test("Success delete user", async () => {
    try {
      console.log(token);
      const res = await request(app)
        .delete("/auth/deleteuser/1")
        .set("Authorization", token);

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body).toHaveProperty("data");
      expect(res.body.status).toBe(true);
      expect(res.body.message).toBe("user deleted successfull");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("User Not Found", async () => {
    try {
      const res = await request(app)
        .delete("/auth/deleteuser/99")
        .set("Authorization", token);

      expect(res.statusCode).toBe(402);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("User not found!");
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("Empty Data", async () => {
    try {
      const res = await request(app)
        .get("/auth/show")
        .set("Authorization", token);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("empty data");
      expect(res.body.data).toBe(null);
    } catch (err) {
      console.log(err);
    }
  });
  // case failed
  test("User doen't exist", async () => {
    try {
      const res = await request(app)
        .post("/history/add")
        .set("Authorization", token)
        .send(historyTest);

      expect(res.statusCode).toBe(409);
      expect(res.body).toHaveProperty("status");
      expect(res.body).toHaveProperty("message");
      expect(res.body.status).toBe(false);
      expect(res.body.message).toBe("User doesn't exist!!");
    } catch (err) {
      console.log(err);
    }
  });
});
