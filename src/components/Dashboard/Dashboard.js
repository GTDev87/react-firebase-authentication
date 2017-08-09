import React, { Component } from 'react';
import hackathonData from '../../utils/HackathonData';
import { chunkifyArray } from '../../utils/utils';
import HackathonEvent from '../HackathonEvent/HackathonEvent';
import ReactList from 'react-list';
import lunr from 'lunr';

import { getCurrentUser } from '../../firebase/User';
import { referUser } from '../../firebase/Referrals';

const CHUNK_SIZE = 4;

const index = lunr(function () {
  this.ref('id');
  this.field('name');
  this.field('city');
  this.field('state');

  hackathonData.forEach(function (doc) {
    this.add(doc)
  }, this)
});

const searchResults = (searchText, hackathonData) => {
  if(!searchText) { return hackathonData; }
  const ids = index.search(searchText).map((res) => +res.ref);
  return hackathonData.filter((hackathon) => ids.includes(hackathon.id));
}

const handleReferralPartial = (user) => (referredEmail, hackathonId) =>
  referUser(user, referredEmail, hackathonId);

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.user = getCurrentUser();
    this.state = { text:"", searchText: "" };
    // this.handleTextChange = this.handleTextChange.bind(this)
  }
  render() {
    const { searchText } = this.state;
    // user the this.state.user.uid to keep track of firebase information

    const resultData = searchResults(searchText, hackathonData);
    const chunkifiedHackathon = chunkifyArray(resultData, CHUNK_SIZE);

    const handleReferral = handleReferralPartial(this.user);

    const renderHackathonChunk = (index, key) =>
      <div className="Dashboard__hackathonRow" key={key}>
        {
          chunkifiedHackathon[index].map((hackathon) =>
            <HackathonEvent  key={hackathon.id} hackathon={hackathon} handleReferral={handleReferral} />)
        }
      </div>;

    return (
      <div>
        <div>Hello {this.user.displayName}</div>
        <div>Search: <input type="text" value={searchText} onChange={(e) => this.setState({ searchText: e.target.value})} /></div>
        <ReactList length={chunkifiedHackathon.length} type="uniform" itemRenderer={renderHackathonChunk} />
      </div>
    );
  }
}

export default Dashboard;
