const express = require("express");
const app = express();
const port = 3000; // You can choose any available port

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// trial
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
