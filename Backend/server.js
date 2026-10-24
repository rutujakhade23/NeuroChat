import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";
import dns from "dns";
import authRoutes from "./routes/auth.js";

dns.setDefaultResultOrder("ipv4first");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.use("/api", chatRoutes);
app.use("/api/auth", authRoutes);

app.get("/hello", (req, res) => {
  res.send("HELLO");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to Database!");
  } catch (err) {
    console.log("Failed to connect with DB ", err);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});