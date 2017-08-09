import firebaseApp from '../firebase/Firebase';

export default (nextState, replace) => {
  const user = firebaseApp.auth().currentUser;
  if (user) { return; }
  replace({
    pathname: '/login',
    state: { nextPathname: nextState.location.pathname }
  });
};
