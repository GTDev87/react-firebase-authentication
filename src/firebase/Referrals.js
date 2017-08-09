import firebaseApp from './Firebase';
import { objToValues } from '../utils/utils';

export function getAllReferrals(user, callback) {
  console.log("user = %j", user)
  console.log("user = %j", user)
  const referalDB = firebaseApp.database().ref(`referral/${user.uid}`);
  referalDB.on('value', (snapshot) => {
    return callback(objToValues(snapshot.val()))
  });
};

export function referUser(user, referredEmail, hackathonId) {

  return firebaseApp.database().ref(`referral/${user.uid}`).push({
    referrerId: user.uid,
    referredEmail,
    hackathonId
  });
}

