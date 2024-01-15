// const admin = require("firebase-admin");
// const express = require("express");
// var serviceAccount = require("./serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // const db = admin.firestore();
// // let customerref = db.collection("customer");
// // customerref.get().then((querySnapshot) => {
// //   querySnapshot.forEach((document) => {
// //     console.log(document.data());
// //   });
// // });
// const app = express();
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// server/index.js
const express = require("express");
const authentication = require("./authentication");

const app = express();

// Use the authentication logic here

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
