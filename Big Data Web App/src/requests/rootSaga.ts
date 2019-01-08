import { all } from 'redux-saga/effects';
import eventSagas from './events';

export default function* rootSaga() {
    yield all([
        eventSagas()
    ]);
}