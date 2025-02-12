import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors()); 
app.use(express.json()); 

// ✅ Simple Route for Analyze Button
app.post("/analyze", (req, res) => {
    res.json({ message: "Analyze button clicked! Backend is working!" });
});


// Start server
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
