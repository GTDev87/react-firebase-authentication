import firebaseApp from './Firebase';

export function getCurrentUser() {
  return firebaseApp.auth().currentUser;
};

