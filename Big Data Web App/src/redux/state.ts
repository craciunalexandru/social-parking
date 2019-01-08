interface State {
    events: ParkingEvent[];
}

interface ParkingEvent {
    id: number | string;
    lat: number;
    long: number;
    reportedAt: string;
    description: string;
    photo: any;
    isFree: boolean;
    isNew?: boolean;
    isActive: boolean;
}

interface DatabaseParkingEvent {
    id: number | string;
    lat: number;
    long: number;
    reportedAt: string;
    description: string;
    photo: any;
    isFree: boolean;
}