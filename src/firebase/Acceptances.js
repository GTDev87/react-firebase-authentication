import firebaseApp from './Firebase';
import { objToValues } from '../utils/utils';

export function getAllAcceptances(callback) {
  const acceptanceDB = firebaseApp.database().ref('acceptance');
  console.log("about to get acceptance data")
  acceptanceDB.on('value', (snapshot) => {
    console.log("snapshot = %j", snapshot)
    return callback(objToValues(snapshot.val()))
  });
};

export function accceptReferral(user, referrerId, hackathonId, referralKey) {
  firebaseApp.database().ref(`acceptance`).push({
    referrerId,
    referredEmail: user.email,
    hackathonId,
    referralKey
  });
};