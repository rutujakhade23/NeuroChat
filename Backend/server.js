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
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://neuro-chat-six.vercel.app"
    ];

    // Allow no-origin requests (like curl/postman)
    if (!origin) return callback(null, true);

    // Allow your fixed domains + any Vercel preview deployment for this project
    if (
      allowedOrigins.includes(origin) ||
      /^https:\/\/neuro-chat-[a-z0-9]+-rutujakhade23s-projects\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
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