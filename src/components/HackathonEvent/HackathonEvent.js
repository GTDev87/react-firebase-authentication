import React, { Component } from 'react';

class HackathonEvent extends Component {
  constructor(...args) {
    super(...args);

    this.state = { referredEmail: '' };
  }

  render() {
    const {
      hackathon: {
        city,
        end_date,
        id,
        img_background,
        img_logo,
        start_date,
        state,
        url,
        name
      },
      handleReferral
    } = this.props;
    const { referredEmail } = this.state;
    return (
      <div className="HackathonEvent">
        <h1>{ name }</h1>
        <img className="HackathonEvent__background" role="presentation" src={ img_background } />
        <div className="HackathonEvent__logoWrapper">
          <img className="HackathonEvent__logo" role="presentation" src={ img_logo } />
        </div>
        <div className="HackathonEvent__description">
          <a href={url}>{ url }</a>
          <div>{ start_date } - { end_date }</div>
          <div>{ state }, { city }</div>
          {
            handleReferral &&
              <div className="HackathonEvent__referAFriend">
                <button onClick={() => handleReferral(referredEmail, id)} >Refer a friend</button>
                <input type="text" value={referredEmail} onChange={(e) => this.setState({ referredEmail: e.target.value})} />
              </div>
          }
          
        </div>
      </div>
    );
  }
}

export default HackathonEvent;
