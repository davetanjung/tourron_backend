import { NextFunction, Request, Response } from "express";
import {
  CreateItineraryDayRequest,
  UpdateItineraryDayRequest,
  DeleteItineraryDayRequest,
  ReadItineraryDayResponse
} from "../models/ItineraryDay";
import { itineraryDayService } from "../services/itineraryDayService";

export class itineraryDayController {

  static async createItineraryDay(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CreateItineraryDayRequest = req.body as CreateItineraryDayRequest;
      const response: string = await itineraryDayService.createItineraryDay(request);

      res.status(201).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllItineraryDays(req: Request, res: Response, next: NextFunction) {
    try {
      const response: ReadItineraryDayResponse[] = await itineraryDayService.getAllItineraryDays();

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateItineraryDay(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UpdateItineraryDayRequest = req.body as UpdateItineraryDayRequest;
      const response: string = await itineraryDayService.updateItineraryDay(request);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItineraryDay(req: Request, res: Response, next: NextFunction) {
    try {
      const request: DeleteItineraryDayRequest = req.body as DeleteItineraryDayRequest;
      const response: string = await itineraryDayService.deleteItineraryDay(request);

      res.status(200).json({
        data: response
      });
    } catch (error) {
      next(error);
    }
  }

}
