import { NextFunction, Request, Response } from "express";
import { CreateItineraryRequest, UpdateItineraryRequest, DeleteItineraryRequest, ReadItineraryResponse } from "../models/Itinerary";
import { itineraryService } from "../services/ItineraryService";

export class itineraryController {

    static async createItinerary(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateItineraryRequest = req.body as CreateItineraryRequest;
            const response: string = await itineraryService.createItinerary(request);

            res.status(201).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async getAllItineraries(req: Request, res: Response, next: NextFunction) {
        try {
            const response: ReadItineraryResponse[] = await itineraryService.getAllItineraries();

            res.status(200).json({
                data: response
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateItinerary(req: Request, res: Response, next: NextFunction) {
        try {
            const request: UpdateItineraryRequest = req.body as UpdateItineraryRequest;
            const response: string = await itineraryService.updateItinerary(request);

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

    static async deleteItinerary(req: Request, res: Response, next: NextFunction) {
        try {
            const request: DeleteItineraryRequest = req.body as DeleteItineraryRequest;
            const response: string = await itineraryService.deleteItinerary(request);

            res.status(201).json({
                data: response
            })
        } catch (error) {
            next(error);
        }
    }

}