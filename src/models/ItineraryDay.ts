export interface CreateItineraryDayRequest {
    day: string;
    start_time: string;
    end_time: string;
    activity_description: string;
    meeting_time: string;
    itineraryId: number;
}

export interface UpdateItineraryDayRequest {
    id: number;
    day?: string;
    start_time?: string;
    end_time?: string;
    activity_description?: string;
    meeting_time?: string;
    itineraryId?: number;
}

export interface DeleteItineraryDayRequest {
    id: number;
}

export interface ReadItineraryDayResponse {
    id: number;
    day: string;
    start_time: string;
    end_time: string;
    activity_description: string;
    meeting_time: string;
    itineraryId: number;
}