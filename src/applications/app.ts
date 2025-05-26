import express from "express"
import router from "../routes/authRouter"
import { authMiddleware } from "../middlewares/authMiddleware"

const app = express()
app.use(express.json())
// app.use(authMiddleware)
app.use(router)

export default app;

