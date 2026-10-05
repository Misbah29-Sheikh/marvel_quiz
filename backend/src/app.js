import express from "express"
import cors from "cors"

const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") || "http://localhost:5173",
  credentials:true, 
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}))

app.use(express.json({limit : "16kb"}))
app.use(express.urlencoded({extended: true, limit : "16kb"}))
app.use(express.static("public"))

//routes
import healthCheckRouter from "./routes/healthcheck.routes.js"
import scoreRouter from "./routes/score.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/score", scoreRouter)

app.use(errorHandler)

app.get("/",(req,res) => {
  res.send("Welcome to Marvel guess game backend")
})

export default app;

