import * as _ from "lodash";
import { AnyAction } from 'redux';
import { SUBMIT_EVENT } from "src/requests/events";

/** Actions for events */
const ADD_EVENTS = "app/root/ADD_EVENTS";
const SET_ACTIVE_EVENT = "app/root/SET_ACTIVE_EVENT";
const SET_ACTIVE_EVENT_AND_ADD_IT = "app/root/SET_ACTIVE_EVENT_AND_ADD_IT";

/** Actions for active event */
const SET_ACTIVE_EVENT_DESCRIPTION = "app/root/SET_ACTIVEEVENT_DESCRIPTION";
const SET_ACTIVE_EVENT_TYPE = "app/root/SET_ACTIVE_EVENT_TYPE";
const SET_ACTIVE_EVENT_PHOTO = "app/root/SET_ACTIVE_EVENT_PHOTO";

const rootReducer = (state: State, action: AnyAction): State => {
    switch(action.type) {
        case ADD_EVENTS:
            return {
                events: _.map(action.payload, (event) => {
                    event.isActive = false;
                    return event;
                })
            }

        case SET_ACTIVE_EVENT:
            return {
                events: _.map(state.events, (event: ParkingEvent) => {
                    if (event.isActive) {
                        event.isActive = false;
                    }
                    if (event.id === action.payload.id) {
                        event.isActive = true;
                    }
    
                    return event;
                })
            };
            
        case SET_ACTIVE_EVENT_AND_ADD_IT:
            return {
                events: _.concat(state.events, action.payload)
            };

        case SET_ACTIVE_EVENT_DESCRIPTION:
            return {
                events: _.map(state.events, (event: ParkingEvent) => {
                    if (event.isActive) {
                        event.description = action.payload;
                    }
    
                    return event;
                })
            };

        case SET_ACTIVE_EVENT_TYPE:
            return {
                events: _.map(state.events, (event: ParkingEvent) => {
                    if (event.isActive) {
                        event.isFree = action.payload;
                    }
    
                    return event;
                })
            };

        case SET_ACTIVE_EVENT_PHOTO:
            return {
                events: _.map(state.events, (event: ParkingEvent) => {
                    if (event.isActive) {
                            const reader = new FileReader();
                            reader.readAsDataURL(action.payload[0]);
    
                            reader.onload = (ev: any) => {
                                event.photo = ev.target.result
                            }
                            
                        }
    
                    return event;
                })
            };

        case SUBMIT_EVENT:
            return {
                events: _.map(state.events, (event: ParkingEvent) => {
                    event.isActive = false;
                    event.isNew = false;
                    return event;
                })
            }

        default:
            return state;
    }
}

/** Action Creators */
export const addEvents = (events: DatabaseParkingEvent[]): AnyAction => ({
    type: ADD_EVENTS,
    payload: events
});

export const setActiveEvent = (event: ParkingEvent): AnyAction => ({
    type: SET_ACTIVE_EVENT,
    payload: event
});

export const setActiveEventAndAddIt = (event: ParkingEvent): AnyAction => ({
    type: SET_ACTIVE_EVENT_AND_ADD_IT,
    payload: event
});

export const setActiveEventDescription = (description: string): AnyAction => ({
    type: SET_ACTIVE_EVENT_DESCRIPTION,
    payload: description
});

export const setActiveEventType = (isFree: boolean): AnyAction => ({
    type: SET_ACTIVE_EVENT_TYPE,
    payload: isFree
});

export const setActiveEventPhoto = (photo: any): AnyAction => ({
    type: SET_ACTIVE_EVENT_PHOTO,
    payload: photo

});

export default rootReducer;