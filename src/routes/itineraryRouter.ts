import express from "express";
import { itineraryController } from "../controllers/itineraryController";

const itineraryRouter = express.Router();

itineraryRouter.get("/itineraries", itineraryController.getAllItineraries);
itineraryRouter.post("/itineraries", itineraryController.createItinerary);
itineraryRouter.put("/itineraries/:id", itineraryController.updateItinerary);
itineraryRouter.delete("/itineraries/:id", itineraryController.deleteItinerary);

export default itineraryRouter;