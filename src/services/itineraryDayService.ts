import { prismaClient } from "../applications/database";
import {
  CreateItineraryDayRequest,
  UpdateItineraryDayRequest,
  DeleteItineraryDayRequest,
  ReadItineraryDayResponse,
} from "../models/ItineraryDay";
import { ItineraryDayValidation } from "../validations/itineraryDay-validation";
import { Validation } from "../validations/validation";

export class itineraryDayService {

  static async createItineraryDay(req: CreateItineraryDayRequest): Promise<string> {

    const createItineraryDayReq = Validation.validate(
      ItineraryDayValidation.CREATE,
      req
    );

    await prismaClient.itineraryDay.create({
      data: {
        day: new Date(createItineraryDayReq.day),
        start_time: new Date(createItineraryDayReq.start_time),
        end_time: new Date(createItineraryDayReq.end_time),
        activity_description: createItineraryDayReq.activity_description,
        meeting_time: new Date(`1970-01-01T${createItineraryDayReq.meeting_time}`),
        itineraryId: createItineraryDayReq.itineraryId,
      }
    });

    return "Itinerary day created successfully!";
  }

  static async getAllItineraryDays(): Promise<ReadItineraryDayResponse[]> {

    const itineraryDays = await prismaClient.itineraryDay.findMany();

    const response = itineraryDays.map((day) => {
      return {
        id: day.id,
        day: day.day.toISOString(),
        start_time: day.start_time.toISOString(),
        end_time: day.end_time.toISOString(),
        activity_description: day.activity_description,
        meeting_time: day.meeting_time.toTimeString().slice(0, 8),
        itineraryId: day.itineraryId,
      };
    });

    return response;
  }

  static async updateItineraryDay(
    req: UpdateItineraryDayRequest
  ): Promise<string> {

    const updateItineraryDayReq = Validation.validate(
      ItineraryDayValidation.UPDATE,
      req
    );

    await prismaClient.itineraryDay.update({
      where: {
        id: updateItineraryDayReq.id,
      },
      data: {
        day: updateItineraryDayReq.day ? new Date(updateItineraryDayReq.day) : undefined,
        start_time: updateItineraryDayReq.start_time ? new Date(updateItineraryDayReq.start_time) : undefined,
        end_time: updateItineraryDayReq.end_time ? new Date(updateItineraryDayReq.end_time) : undefined,
        activity_description: updateItineraryDayReq.activity_description,
        meeting_time: updateItineraryDayReq.meeting_time
          ? new Date(`1970-01-01T${updateItineraryDayReq.meeting_time}`)
          : undefined,
        itineraryId: updateItineraryDayReq.itineraryId,
      },
    });

    return "Itinerary day updated successfully!";
  }

  static async deleteItineraryDay(
    req: DeleteItineraryDayRequest
  ): Promise<string> {

    const deleteItineraryDayReq = Validation.validate(
      ItineraryDayValidation.DELETE,
      req
    );

    await prismaClient.itineraryDay.delete({
      where: {
        id: deleteItineraryDayReq.id,
      },
    });

    return "Itinerary day deleted successfully!";
  }
}
