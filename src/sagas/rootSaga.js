import {all} from 'redux-saga/effects';
// import pinSagas from './pin';
// import privatePolicy from './privacyPolicy';
// import session from './session';
// import sharingPortions from './sharingPortions';
// import user from './user';
// import chats from './chats';

const sagas = [
  // ...pinSagas,
  // ...privatePolicy,
  // ...session,
  // ...sharingPortions,
  // ...user,
  // ...chats,
];

export default function* rootSaga() {
  yield all(sagas);
}
