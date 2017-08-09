import React, { Component } from 'react';
import { keyBy, uniqBy } from 'lodash';
import { getAllAcceptances, accceptReferral } from '../../firebase/Acceptances';
import { getAllReferrals } from '../../firebase/Referrals';
import { getCurrentUser } from '../../firebase/User';

import hackathonData from '../../utils/HackathonData';
import HackathonEvent from '../HackathonEvent/HackathonEvent';

const handleAcceptancePartial = (user) => (referrerId, hackathonId, referralKey) => {
  accceptReferral(user, referrerId, hackathonId, referralKey)
};

const idIndexedHackathonData = keyBy(hackathonData, 'id')

const Referal = ({hackathonRefer, handleAcceptance, accepted}) => {
  const hackathon = idIndexedHackathonData[hackathonRefer.hackathonId];
  const { referrerId, hackathonId, key: referralKey } = hackathonRefer;
  const canAccept = !accepted && handleAcceptance;
  return (
    <div>
      <HackathonEvent hackathon={hackathon}/>
      {
        canAccept &&
          <button onClick={() => handleAcceptance(referrerId, hackathonId, referralKey)}>I accept</button>
      }
      { accepted && <div>I've Accepted!!!</div> }
    </div>
  );
}

class Referrals extends Component {
  constructor(props) {
    super(props)
    this.user = getCurrentUser();

    this.state = { referrals: [], acceptances: [] };
    // this.handleTextChange = this.handleTextChange.bind(this)
  }
  componentWillMount(){
    console.log("componentWillMount called")
    const _this = this;

    getAllReferrals(_this.user, (referrals) => {
      getAllAcceptances((acceptances) => {
        _this.setState({ acceptances, referrals });
      });
    });
  }
  render() {
    const { referrals, acceptances } = this.state;
    const handleAcceptance = handleAcceptancePartial(this.user);

    const uniqReferrals = uniqBy(referrals, ({hackathonId, referredEmail}) => hackathonId + referredEmail);

    const peopleIveReferred = uniqReferrals.filter(({referrerId}) => this.user.uid);
    const peopleWhoReferredMe = uniqReferrals.filter(({referredEmail}) => this.user.email);

    const acceptedHackathonIds = acceptances.map((hackathon) => hackathon.hackathonId);

    return (
      <div className="Referrals__lists">
        <div>
          <h3>I've referred</h3>
          {peopleIveReferred.map((hackathonRefer) =>
            <Referal
              key={peopleWhoReferredMe.key}
              hackathonRefer={hackathonRefer}
              handleAcceptance={handleAcceptance}
              accepted={acceptedHackathonIds.includes(hackathonRefer.hackathonId)}
            />
            )}
        </div>
        <div>
          <h3>I've been referred to</h3>
          {peopleWhoReferredMe.map((hackathonRefer) =>
            <Referal
              key={peopleWhoReferredMe.key}
              hackathonRefer={hackathonRefer}
              accepted={acceptedHackathonIds.includes(hackathonRefer.hackathonId)}
            />)}
        </div>
      </div>
    );
  }
}

export default Referrals;

