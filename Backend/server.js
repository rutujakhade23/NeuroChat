import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose, { connect } from "mongoose";
import chatRoutes from "./routes/chat.js";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});

const connectDB = async() => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database!");
  } catch(err) {
      console.log("Failed to connect with DB ", err);
  }
}

// app.post("/test", async (req, res) => {

//   const options = {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",

//       Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
//     },

//     body: JSON.stringify({

//       model: "llama-3.1-8b-instant",

//       messages: [
//         {
//           role: "user",

//           content: req.body.message,
//         },
//       ],
//     }),
//   };

//   try {

//     const response = await fetch(
//       "https://api.groq.com/openai/v1/chat/completions",
//       options
//     );

//     const data = await response.json();

//     console.log(data);

//     res.json(data);

//   } catch (err) {

//     console.log(err);

    
//   }
// });

