const { Collection, Item } = require("postman-collection");
const fs = require("fs");

// create collection

const postmanCollection = new Collection({
  info: {
    name: "Membuat dokumentasi",
  },
  item: [],
});

/* ---- Auth User ---- */

const postmanUserRegister = new Item({
  name: "Register New User",
  request: {
    header: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/auth/register",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        username: "fathoni",
        email: "fath123@gmail.com",
        password: "1234",
      }),
    },
    auth: null,
  },
});

const postmanUserLogin = new Item({
  name: "Login User Game",
  request: {
    header: {
      Authorization: "",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/auth/login ",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "fath123@gmail.com",
        password: "1234",
      }),
    },
    auth: null,
  },
});

const postmanShowUser = new Item({
  name: "Show All User Game",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/auth/show/",
    method: "GET",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "fathzkr@gmail.com",
        password: "45678",
      }),
    },
    auth: null,
  },
});

const postmanShowMyInfo = new Item({
  name: "Show My Info",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/auth/me",
    method: "GET",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        email: "fathzkr@gmail.com",
        password: "1234",
      }),
    },
    auth: null,
  },
});
const postmanChangePassword = new Item({
  name: "Change Password",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/auth/changepassword",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        oldPassword: "1234",
        newPassword: "45678",
        confirmNewPass: "45678",
      }),
    },
    auth: null,
  },
});
const postmanDeleteUser = new Item({
  name: "Delete User",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/auth/deleteuser/4",
    method: "DELETE",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id: "value id",
      }),
    },
    auth: null,
  },
});

/* ---- Biodata User ---- */

const postmanAddBio = new Item({
  name: "Add Biodata User",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/bio/addbio",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        first_name: "fathoni",
        last_name: "zikri",
        telephone_number: "0898612111",
        birthdate: "30-10-2002",
      }),
    },
    auth: null,
  },
});

const postmanShowAllBio = new Item({
  name: "Show All Biodata",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/bio/show/",
    method: "GET",
    auth: null,
  },
});

const postmanShowBioById = new Item({
  name: "Show Details Biodata by Id",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/bio/show/4",
    method: "GET",
    auth: null,
  },
});

const postmanChangePhonenumber = new Item({
  name: "Change Phonenumber",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/bio/changephonenumber",
    method: "GET",
    auth: null,
    body: {
      mode: "raw",
      raw: JSON.stringify({
        oldPhoneNumber: "08980001",
        newPhoneNumber: "08981111",
        confirmPhoneNumber: "08981111",
      }),
    },
  },
});

const postmanDeleteBio = new Item({
  name: "Delete Biodata",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/bio/delete/1",
    method: "DELETE",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        id: "value id",
      }),
    },
    auth: null,
  },
});

/* ---- History User ---- */

const postmanAddRecord = new Item({
  name: "Add Record",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/history/add",
    method: "POST",
    body: {
      mode: "raw",
      raw: JSON.stringify({
        user_id: 5,
        points: 40,
        match_played: 2,
        rank: "Bronze",
      }),
    },
    auth: null,
  },
});

const postmanShowHistory = new Item({
  name: "Show All History",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/history/show/",
    method: "GET",
    auth: null,
  },
});

const postmanShowRank = new Item({
  name: "Show All History",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/history/show/rank",
    method: "GET",
    auth: null,
  },
});
const postmanShowHistoryById = new Item({
  name: "Show History by Id",
  request: {
    header: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwibmFtZSI6ImZhdGhvbml6aWtyaSIsImVtYWlsIjoiZmF0aHprckBnbWFpbC5jb20iLCJpYXQiOjE2Njc5MzYwMTF9.3m6BVdaQWlqajC2LTX7dUbpF4Xc1FxgHXxUTGs_NRRY",
      "Content-Type": "application/json",
    },
    url: "http://localhost:3000/history/show/4",
    method: "GET",
    auth: null,
  },
});

// Auth User Game
postmanCollection.items.add(postmanUserRegister);
postmanCollection.items.add(postmanUserLogin);
postmanCollection.items.add(postmanShowUser);
postmanCollection.items.add(postmanShowMyInfo);
postmanCollection.items.add(postmanChangePassword);
postmanCollection.items.add(postmanDeleteUser);

// User Game Biodata
postmanCollection.items.add(postmanAddBio);
postmanCollection.items.add(postmanShowAllBio);
postmanCollection.items.add(postmanShowBioById);
postmanCollection.items.add(postmanChangePhonenumber);
postmanCollection.items.add(postmanDeleteBio);

// User Game History
postmanCollection.items.add(postmanAddRecord);
postmanCollection.items.add(postmanShowHistory);
postmanCollection.items.add(postmanShowRank);
postmanCollection.items.add(postmanShowHistoryById);

// convert to json
const collectionJSON = postmanCollection.toJSON();

// export to file
fs.writeFile("./collection.json", JSON.stringify(collectionJSON), (err) => {
  if (err) console.log(err);
  console.log("file saved!");
});
