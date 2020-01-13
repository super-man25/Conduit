import { put, call, takeLatest } from 'redux-saga/effects';
import { eventCategoryService } from '_services';
import { types } from '.';

export function* fetchEventCategories() {
  try {
    const eventCategories = yield call(eventCategoryService.getAll);
    yield put({
      type: types.FETCH_EVENT_CATEGORIES_SUCCESS,
      payload: eventCategories,
    });
  } catch (err) {
    yield put({ type: types.FETCH_EVENT_CATEGORIES_ERROR, payload: err });
  }
}

function* watchFetchEventCategories() {
  yield takeLatest(types.FETCH_EVENT_CATEGORIES, fetchEventCategories);
}

export default {
  watchFetchEventCategories,
};
