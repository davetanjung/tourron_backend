import express from "express"
import router from "../routes/authRouter"
import { authMiddleware } from "../middlewares/authMiddleware"
import itineraryRouter from "../routes/itineraryRouter"

const app = express()
app.use(express.json())
// app.use(authMiddleware)
app.use(router)
app.use(itineraryRouter)

export default app;

