// backend/index.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const { uploadFileToIPFS, getFileFromIPFS } = require("./ipfs");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes (placeholder)
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is alive" });
});
// app.post("/upload", async (req, res) => {
//   try {
//     const { file } = req.body; // Assume base64 file input
//     const cid = await uploadFileToIPFS(file);
//     res.status(200).json({ cid });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get("/file/:cid", async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const fileData = await getFileFromIPFS(cid);
//     res.status(200).json({ fileData });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
