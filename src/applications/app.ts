import express from "express"
import router from "../routes/authRouter"
import { authMiddleware } from "../middlewares/authMiddleware"
import itineraryRouter from "../routes/itineraryRouter"
import itineraryDayRouter from "../routes/itineraryDayRouter"

const app = express()
app.use(express.json())
// app.use(authMiddleware)
app.use(router)
app.use(itineraryRouter)
app.use(itineraryDayRouter)

export default app;