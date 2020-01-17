import { put, takeLatest, take, call, select } from 'redux-saga/effects';
import { seasonService } from '_services';
import { types, selectors } from '.';
import { types as authTypes } from '../auth';

export function* fetchSeasons() {
  try {
    const seasons = yield call(seasonService.getAll);
    yield put({ type: types.FETCH_SUCCESS, payload: seasons });

    // If the current seasonId already exists, and is included within
    // the list of returned seasons, don't set the activeId (it already exists)
    const selectedSeasonId = yield select(selectors.selectActiveSeasonId);
    if (seasons.find((season) => season.id === selectedSeasonId)) {
      return;
    }

    // Either set active season to the current season or if no current season
    // is present, set it to the first season returned
    let activeSeason = seasons.find((season) => season.isCurrentSeason);
    if (!activeSeason) {
      activeSeason = seasons[0];
    }

    yield put({ type: types.SET_ACTIVE, payload: activeSeason.id });
  } catch (err) {
    yield put({ type: types.FETCH_ERROR, payload: err });
  }
}

// Fetch seasons when user logs in/is set in the store, then fetch on every fetch action
function* watchFetchSeasons() {
  yield takeLatest(types.FETCH, fetchSeasons);
}

function* watchFetchSeasonsOnLogin() {
  while (true) {
    // On login or on auth fetch seasons
    yield take([authTypes.SET_USER, authTypes.LOGIN_SUCCESS]);
    yield put({ type: types.FETCH });
  }
}

export default {
  watchFetchSeasons,
  watchFetchSeasonsOnLogin,
};
