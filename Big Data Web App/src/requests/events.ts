import { AnyAction } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';
import { addEvents } from 'src/redux/modules/rootReducer';
import { mockData } from './mockData';
import * as qr from "querystring";
import axios from "axios";

/** Actions */
const REQUEST_EVENTS = "app/events/REQUEST_EVENTS";
export const SUBMIT_EVENT = "app/events/SUBMIT_EVENT";

/** Action Creators */
export const requestEvents = (): AnyAction => ({
    type: REQUEST_EVENTS
});

export const submitEvent = (event: ParkingEvent): AnyAction => ({
    type: SUBMIT_EVENT,
    payload: event
});

/** Saga */
const requestEventSaga = function*() {
    // Connect to API
    // const url = "http://localhost/";

    // yield axios({ 
    //     url,
    //     method: "get" 
    // }).then((response) => {
    //     yield put(addEvents(response.data));
    // });

    yield put(addEvents(mockData));
}

const submitEventSaga = function*(action) {
    // Connect to API
    const url = "http://localhost/";

    axios({
        url,
        method: "post",
        data: qr.stringify(action.payload),
        headers: { "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8" }
    });
}

const watchSagas = function*() {
    yield takeEvery(REQUEST_EVENTS, requestEventSaga);
    yield takeEvery(SUBMIT_EVENT, submitEventSaga);
}

export default watchSagas;

