import express from "express";
import { itineraryDayController } from "../controllers/itineraryDayController";

const itineraryDayRouter = express.Router();

itineraryDayRouter.get("/itineraryDays", itineraryDayController.getAllItineraryDays);
itineraryDayRouter.post("/itineraryDays", itineraryDayController.createItineraryDay);
itineraryDayRouter.put("/itineraryDays/:id", itineraryDayController.updateItineraryDay);
itineraryDayRouter.delete("/itineraryDays/:id", itineraryDayController.deleteItineraryDay);

export default itineraryDayRouter;