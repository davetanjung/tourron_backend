export interface CreateItineraryRequest {
    title: string;
    start_date: string;
    end_date: string;
    estimate_start: string;
    estimate_end: string;
    total_person: number;
    country: string;
    location: string;
    userId: number;
}

export interface UpdateItineraryRequest {
    id: number;
    title?: string;
    start_date?: string;
    end_date?: string;
    estimate_start?: string;
    estimate_end?: string;
    total_person?: number;
    country?: string;
    location?: string;
    userId?: number;
}

export interface DeleteItineraryRequest {
    id: number;   
}

export interface ReadItineraryResponse {
    id: number;
    title: string;
    start_date: string;
    end_date: string;
    estimate_start: string;
    estimate_end: string;
    total_person: number;
    country: string;
    location: string;    
}





