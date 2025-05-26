import { prismaClient } from "../applications/database";
import { CreateItineraryRequest, UpdateItineraryRequest, DeleteItineraryRequest, ReadItineraryResponse } from "../models/Itinerary";
import { ItineraryValidation } from "../validations/itinerary-validation";
import { Validation } from "../validations/validation";

export class itineraryService {

    static async createItinerary(req: CreateItineraryRequest): Promise<string> {

        const jakartaTimeZone = 'Asia/Jakarta';

        const createItineraryReq = Validation.validate(
            ItineraryValidation.CREATE,
            req
        );

        // const jakartaDate = toZonedTime(`${createActivityReq.date}T${createActivityReq.start_time}:00`, jakartaTimeZone);
        // const jakartaEndDate = toZonedTime(`${createActivityReq.date}T${createActivityReq.end_time}:00`, jakartaTimeZone);

        // const startTimeInUtc = new Date(jakartaDate.getTime() - (7 * 60 * 60 * 1000));  
        // const endTimeInUtc = new Date(jakartaEndDate.getTime() - (7 * 60 * 60 * 1000));

        await prismaClient.itinerary.create({
            data: {
                title: createItineraryReq.title,
                start_date: new Date(createItineraryReq.start_date),
                end_date: new Date(createItineraryReq.end_date),
                estimate_start: new Date(createItineraryReq.estimate_start),
                estimate_end: new Date(createItineraryReq.estimate_end),
                total_person: createItineraryReq.total_person,
                country: createItineraryReq.country,
                location: createItineraryReq.location,
                userId: createItineraryReq.userId,
            }
        });


        return "Activity created successfully!"
    }

    static async getAllItineraries(): Promise<ReadItineraryResponse[]> {
        const itineraries = await prismaClient.itinerary.findMany();

        const response = itineraries.map((itinerary) => {
            return {
                title: itinerary.title,
                start_date: itinerary.start_date.toISOString(),
                end_date: itinerary.end_date.toISOString(),
                estimate_start: itinerary.estimate_start.toISOString(),
                estimate_end: itinerary.estimate_end.toISOString(),
                total_person: itinerary.total_person,
                country: itinerary.country,
                location: itinerary.location,
            };
        });

        return response;
    }


    static async updateItinerary(
        req: UpdateItineraryRequest
    ): Promise<string> {

        const updateItineraryReq = Validation.validate(
            ItineraryValidation.UPDATE,
            req
        )

        const itineraryUpdate = await prismaClient.itinerary.update({
            where: {
                id: updateItineraryReq.id,
            },
            data: {
                title: updateItineraryReq.title,
                start_date: updateItineraryReq.start_date,
                end_date: updateItineraryReq.end_date,
                estimate_start: updateItineraryReq.estimate_start,
                estimate_end: updateItineraryReq.estimate_end,
                total_person: updateItineraryReq.total_person,
                country: updateItineraryReq.country,
                location: updateItineraryReq.location,
            },
        })
        return "Activity updated successfully!"
    }

    static async deleteItinerary(req: DeleteItineraryRequest): Promise<string> {

        const deleteItineraryReq = Validation.validate(
            ItineraryValidation.DELETE,
            req
        )

        const itineraryDelete = await prismaClient.itinerary.delete({
            where: {
                id: deleteItineraryReq.id,
            }
        })

        return "Itinerary deleted successfully!"
    }

}